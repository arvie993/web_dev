import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function formatDate(dateVal) {
  try {
    const d = new Date(dateVal);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  } catch (e) {
    return "";
  }
}

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    items = result.rows.map(r => ({
      ...r,
      createdDate: r.created_date ? formatDate(r.created_date) : "",
    }));

    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }

});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({title: item});
  try {
    await db.query("INSERT INTO items (title, created_date) VALUES ($1, CURRENT_DATE)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;

  try {
    await db.query("DELETE FROM items WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// --- Weekly list setup and routes ---
// Ensure weekly_items table exists (id, title, day_of_week 1-7)
async function ensureWeeklyTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS weekly_items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 1 AND 7)
      );
    `);
  } catch (err) {
    console.error("Failed ensuring weekly_items table:", err);
  }
}
ensureWeeklyTable();

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

app.get("/weekly", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, title, day_of_week, created_date FROM weekly_items ORDER BY day_of_week ASC, id ASC"
    );

    // Build days array: [{ day:1, name:'Monday', items:[{id,title}] }, ...]
    const days = DAY_NAMES.map((name, idx) => ({
      day: idx + 1,
      name,
      items: [],
    }));

    for (const row of result.rows) {
      const d = days[row.day_of_week - 1];
      if (d) d.items.push({ id: row.id, title: row.title, createdDate: row.created_date ? formatDate(row.created_date) : "" });
    }

    res.render("weekly.ejs", { weekTitle: "This Week", days });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/weekly/add", async (req, res) => {
  const title = req.body.newItem;
  const day = parseInt(req.body.day, 10);
  if (!title || !day || day < 1 || day > 7) return res.redirect("/weekly");

  try {
    await db.query(
      "INSERT INTO weekly_items (title, day_of_week, created_date) VALUES ($1, $2, CURRENT_DATE)",
      [title, day]
    );
    res.redirect("/weekly");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/weekly/edit", async (req, res) => {
  const title = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  try {
    await db.query("UPDATE weekly_items SET title = $1 WHERE id = $2", [
      title,
      id,
    ]);
    res.redirect("/weekly");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/weekly/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM weekly_items WHERE id = $1", [id]);
    res.redirect("/weekly");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
