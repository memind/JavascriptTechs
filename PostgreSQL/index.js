import express from "express";
import bodyParser from 'body-parser';
import pg from "pg"

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "JavascriptLibsDB",
    password: "123456",
    port: 5432
});

let totalCorrect = 0;
let currentQuestion = {};
let quiz = [];
let countryWheat = [];



await db.connect();
await db.query("SELECT * FROM capitals", (err, res) => {
    if (err)
        console.error(err.stack);
    else
        quiz = res.rows
});
await db.query("SELECT country, wheat FROM world_food WHERE wheat > 100", (err, res) => {
    if (err)
        console.error(err);
    else {
        countryWheat = res.rows;
        console.log(countryWheat);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    totalCorrect = 0;
    await nextQuestion();
    console.log(currentQuestion);
    res.render("index.ejs", { question: currentQuestion });
});

app.post("/submit", (req, res) => {
    let answer = req.body.answer.trim();
    let isCorrect = false;

    if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
        totalCorrect++;
        console.log(totalCorrect);

        isCorrect = true;
    };

    nextQuestion();
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect
    });

    db.query("INSERT INTO world_food (country, rice, wheat) VALUES ($1,$2,$3)", ["Turkey", 1.46, 7.3], (err, res) => {
        if (err)
            console.error(err);
        else {
            console.log(res);
        }
    });
})

async function nextQuestion() {
    const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
    currentQuestion = randomCountry;
}

app.listen(port, () => {
    console.log(`Someone's watching us... ${port}`);
})