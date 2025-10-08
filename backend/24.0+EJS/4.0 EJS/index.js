import express from "express";
const app = express();
const port = 3000;

app.get("/", (req,res)=>{
  const wknd = [0,6].includes(new Date().getDay());
  res.render("index.ejs", { 
    dayType: wknd ? "the weekend" : "a weekday", 
    advice: wknd ? "it's time to have some fun" : "it's time to work hard" 
  });
});

app.listen(port, ()=>console.log(`Server running on port ${port}.`));