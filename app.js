const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let items = [];
let workItems = [];



app.get('/', (req, res) => {

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItem: items })
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

res.render("list",{listTitle:"Work List",newListItem:workItems})

});

app.post("/work",(req,res)=>{
    let item = req.body.newItem;

    workItems.push(item);
    res.redirect("/work");
});


app.get("/about",(req,res)=>{
    res.render("about");
});




app.listen(port, () => {
    console.log(`Your port is running on localhost:${port}`);
});