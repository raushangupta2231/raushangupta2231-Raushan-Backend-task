require('./db/db');
const express = require("express");
const app = express();
const bodyparser = require('body-parser');
const path = require("path");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const Register = require('./models/model')
const { createRequire } = require('module');


app.use(bodyparser.urlencoded({
    extended: true
}));
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(bodyparser.json());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (re, res) => {
    res.render("index")
})

app.post('/fill', async (req, res) => {
    try {
        const email = req.body.email;
        const name = req.body.name;

        const registerStudent = new Register({
            email: req.body.email,
            name: req.body.name
        })
        const registered = await registerStudent.save();
        res.render("search")
    }
    catch (e) {
        res.send(e);
    }
})

app.post("/find",(req,res)=>{
    const name = req.body.name;
    Register.findOne({name : name}).then((data)=>{
        const Getemail = data.email;
        res.render("show",{
            emailStudent : Getemail
        })
    })
})



app.listen(port, () => {
    console.log("Listening to 3000 port......")
});