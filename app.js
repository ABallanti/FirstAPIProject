import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Christmas"];
const params = [
    "blacklistFlags=nsfw,religious,racist,sexist,explicit",
    "idRange=0-100"
];

app.get("/",async (req,res) =>{
    const result = await axios.get (`${baseURL}/joke/${categories.join(",")}?${params.join("&")}`)
    res.render("index.ejs", { question: result.data.setup, answer: result.data.delivery})
})

app.listen(port,() =>{
    console.log(`The server is working in port http://localhost:${port}`)
})