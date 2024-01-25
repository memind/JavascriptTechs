import express from "express";
import bodyParser from 'body-parser';
import pg from "pg"

let createBookQuery = "";
let createNoteQuery = "";
let updateNoteQuery = "";
let deleteNoteQuery = "";

const app = express();
const port = 3000;
let allNotes = [];

const db = new pg.Client({
    user: "postgres",
    host: "127.0.0.1",
    database: "BookDB",
    password: "123456",
    port: 5432
});

await db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, response) => {
    await db.query("SELECT b.id as BookId, b.bookname, b.author, b.pagecount, n.id as NoteId, n.notecontent, n.bookId as RefKey FROM books as b JOIN notes as n on n.BookId = b.Id;", (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows
        }
    });
    response.render("index.ejs", { notes: allNotes });
})

app.post("/findByBook", async (req, response) => {
    await db.query(`SELECT b.id as BookId, b.bookname, b.author, b.pagecount, n.id as NoteId, n.notecontent, n.bookId as RefKey FROM books as b JOIN notes as n on n.BookId = b.Id WHERE b.bookname = '${req.body["bookName"]}';`, (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows;
            response.render("index.ejs", { notes: allNotes });
        }
    });
});

app.post("/createBook", async (req, response) => {
    await db.query(`INSERT INTO books (bookname, author, pagecount) VALUES ('${req.body["bookName"]}', '${req.body["author"]}', ${req.body["pageCount"]});`, (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows
        }
    });
    response.render("index.ejs", { notes: allNotes });
});

app.post("/createNote", async (req, response) => {
    await db.query(`INSERT INTO notes (bookid, notecontent) VALUES (${req.body["bookId"]}, '${req.body["content"]}');`, (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows
        }
    });
    response.render("index.ejs", { notes: allNotes });
});

app.post("/updateNote", async (req, response) => {
    await db.query(`UPDATE notes SET notecontent='${req.body["updatedContent"]}' WHERE id = ${req.body["noteId"]}`, (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows
        }
    });
    response.render("index.ejs", { notes: allNotes });
});

app.post("/deleteNote", async (req, response) => {
    await db.query(`DELETE FROM notes WHERE id = ${req.body["noteId"]}`, (err, res) => {
        if (err)
            console.error(err.stack);
        else {
            allNotes = res.rows
        }
    });
    response.render("index.ejs", { notes: allNotes });
});

app.listen(port, () => {
    console.log(`Let's read yo, ${port}???`);
});