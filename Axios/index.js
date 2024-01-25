import express, { response } from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        res.render("index.ejs", { data: result });
    } catch {
        console.error("Failed to make request: ", error.message);
        res.render("index.ejs", { error: error.message });
    }
});

app.post("/", async (req, res) => {
    console.log(req.body);

    const data = {participant: req.body["participants"], type: req.body["type"]}
    axios.post(`https://bored-api.appbrewery.com/filter?type=${data.type}&participants=${data.participant}`)
    .then(() => {
        const result = response.data;
        res.render("index.ejs"), {
            data: result,
        };
    }).catch((error) => {
        res.render("index.ejs", {error: error});
    }).finally(() => {
        console.log("Response: " + response);
    });
});

app.listen(port, () => {
    console.log(`Let's listen the port ${port}. Cuz' why not?`);
});