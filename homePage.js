const axios = require('axios');
const express = require('express');
const app = express(); //instance from express
const API_KEY = "9be22c80-ab65-4681-8e68-7cb4b76ad632"; //Cat API key
const URL = 'https://api.thecatapi.com/v1/images/search'; //Api URL
let PORT = 3000;

app.listen(PORT, () => {
    console.log(`Port ${PORT}`)
});

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //The default engine extension to use when omitted

let RandomCats = [];
let formCat=[]
function Cats(id, url) {
    this.id = id;
    this.url = url;
   
    //console.log(this);
    RandomCats.push(this);
}
function CatForm(name, breed, age, color){
    this.age = age || null;
    this.name = name || '';
    this.breed = breed || '';
    this.color = color || '';
    
    formCat.push(this);
    console.log("const",formCat);
}

app.get('/', (req, res) => {
    //resposne
    axios.get(URL, { params: { limit: 12 } }).then(response => {

        response.data.forEach(element => {
            new Cats(element.id, element.url);
        });
        res.render('index', {mycat:RandomCats}); //pass images to html

    })
});
app.get("/cat", (req, res) => {

    res.render("cat");
});


app.post("/cat", (req, res) => {
    console.log(req);
    new CatForm(req.body.name, req.body.breed, req.body.age,req.body.color)
    res.render("cat",{mycats:formCat });
});


app.get("/about", (req, res) => {

    res.render("About");
});