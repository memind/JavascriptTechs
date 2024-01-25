import express from "express";
import morgan from 'morgan';

const app = express();
const port = 3000;

function myLogger(req, res, next) {
    console.log(`Request URL: ${req.url}      //////      Response Code: ${res.statusCode}`);
    next();
};

app.use(morgan("tiny"));
app.use(myLogger);

app.get("/about", (req, res) => {
    res.send("ABOUT");
});

app.get("/", (req, res) => {
    res.send("GET");
});

app.post("/post", (req, res) => {
    console.log("post");
    res.sendStatus(201);
});

app.put("/put", (req, res) => {
    res.sendStatus(200);
});

app.patch("/patch", (req, res) => {
    res.sendStatus(200);
});

app.delete("/delete", (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server running on Middle Earth ${port}. Brace Yourself!!!`);
});

