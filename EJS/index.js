import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 2033;

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    const date = new Date();
    const data = (date.getDay() <= 5 & date.getDay() > 0) ? { dayType: "Weekday", advice: "Sleep harder" } : { dayType: "Weekend", advice: "Sleep" };

    res.render("index.ejs", {
        data: data
    });
});

app.get("/tags", (req, res) => {
    const data = {
        title: "EJS Tags",
        seconds: new Date().getSeconds(),
        items: ["Brother", "will", "kill", "brother", "spilling", "blood", "across", "the", "land"],
        htmlContent: "<h1>MEGADETH</h1>"
    } 
    res.render("tags.ejs", data);
});

app.get("/post", (req, res) => {
    res.render("post.ejs");
});

app.post("/submit", (req, res) => {
    const numLetters = req.body["fName"].length + req.body["lName"].length
    res.render("post.ejs", {num: numLetters});
});

app.listen(port, () => { console.log(`Metro ${port}`); });