import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));

const baseURL = "https://v2.jokeapi.dev";
const categories = ["Programming", "Christmas"];
const params = [
    "blacklistFlags=nsfw,religious,racist,sexist,explicit",
    "idRange=0-318"
];

const type="twopart";

app.get("/",async (req,res) =>{
    const url = `${baseURL}/joke/${categories.join(",")}?${params.join("&")}&type=${type}`
    const result = await axios.get (url)
    console.log(url)

    try{
    res.render("index.ejs", { question: result.data.setup, answer: result.data.delivery})
    console.log(result.data)
    }

    catch(error){
    res.render("index.ejs", { question: error.message , answer: error.causedBy})
    }

})

app.listen(port,() =>{
    console.log(`The server is working in port http://localhost:${port}`)
})