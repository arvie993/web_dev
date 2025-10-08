import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Configure EJS (assuming views folder is in the same directory structure)
app.set("view engine", "ejs");

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (CSS, images, client JS)
app.use(express.static("public"));

app.get("/", (req, res) => {
  // Initial render without a result yet
  res.render("index.ejs", { totalLetters: null, error: null });
});

app.post("/submit", (req, res) => {
  // Match the form field names: fName and lName
  const firstName = req.body.fName?.trim();
  const lastName = req.body.lName?.trim();

  if (!firstName || !lastName) {
    return res.render("index.ejs", {
      totalLetters: null,
      error: "Please enter both first and last names."
    });
  }

  const totalLetters = firstName.length + lastName.length;
  res.render("index.ejs", { totalLetters, error: null });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
