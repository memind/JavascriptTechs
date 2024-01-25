import express from 'express';
import mongodb, { ObjectId } from 'mongodb';
import bodyParser from "body-parser";

const mongoClient = mongodb.MongoClient;

const client = await mongoClient.connect("");
var db = client.db('BlogDB');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/createCollection", (req, res) => {
    const collectionName = req.body["collectionName"];
    db.createCollection(collectionName);
    res.render("index.ejs");
});

app.post("/getCollection", (req, res) => {
    const collectionName = req.body["collectionName"];
    var collection = db.collection(collectionName);
    console.log(collection);
    res.render("index.ejs");
});

app.post("/dropCollection", (req, res) => {
    const collectionName = req.body["collectionName"];
    db.dropCollection(collectionName);
    res.render("index.ejs");
});

app.post("/createBook", (req, res) => {
    let book = {
        id: mongodb.ObjectId,
        bookName: req.body["bookName"],
        authorName: req.body["bookAuthorName"],
        pageCount: req.body["bookPageCount"],
    };

    db.collection("Book").insertOne(book);
    res.render("index.ejs");
});

app.post("/findBookById", (req, res) => {
    db.collection("Book").findOne({ _id: new ObjectId(req.body["findBookId"]) }).then((response) => {
        console.log(response);
        res.render("index.ejs", { book: response });
    });
});

app.post("/getAllBooks", async (req, res) => {
    let allBooks = await db.collection("Book").find().toArray();
    res.render("index.ejs", { allBooks: allBooks });
});

app.post("/deleteBook", async (req, res) => {
    db.collection("Book").deleteOne({ _id: new ObjectId(req.body["deleteBookId"]) });
});

app.post("/updateBook", async (req, res) => {
    db.collection("Book").updateOne({_id: new ObjectId(req.body["updateBookId"])}, {$set: {
        bookName: req.body["updateBookName"],
        authorName: req.body["updateBookAuthorName"],
        pageCount: req.body["updateBookPageCount"],
    }});
});


app.listen(port, () => {
    console.log(`Let's go to Mongo via ${port}!!!`);
});