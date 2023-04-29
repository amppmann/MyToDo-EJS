const express = require('express');
const bodyParser = require('body-parser');

// THIS IS THE MODULE THAT HAS BEEN EXPORTED AND REQUIRED IN THIS FILE ..

// THIS MODULE CONTAINS A FUNCTION THAT RETURNS OUT A 'DAY' AND TO PERFORM A FUNCTION CALL,
// MENTION THE VARIABLE NAME WHICH IS IN THIS CASE IS 'date()' FOLLOWED BY A PARENTHESIS...**

const date = require(__dirname + "/date.js")


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get('/', (req, res) => {

    let day = date.getDay();

    res.render("index", { listTitle: day, newListItem: items })


});


app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


});


app.get("/work", (req, res) => {

    res.render("index", { listTitle: "Work List", newListItem: workItems })

});

app.post("/work", (req, res) => {
    let item = req.body.newItem;

    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
    console.log(`Your port is running on localhost:${port}`);
});