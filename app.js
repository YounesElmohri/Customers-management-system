const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Customer = require("./models/customerSchema")
var moment = require('moment')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

const port =  3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))


mongoose.connect("mongodb+srv://youneselmohri1909:25gtADu8n5d7tmYR@cluster0.zddbdbw.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });


//Get Request 
app.get('/', (req, res) => {
    Customer.find()
    .then((result) =>{
        console.log(result)

        res.render('index', {arr: result, moment: moment})
        
    })  
    .catch((err) => {console.log(err)})
});

app.get('/user/add.html', (req, res) => {
    res.render('user/add')
});


app.get('/user/edit/:id', (req, res) => {
    Customer.findById(req.params.id)
    .then((result) => {
        res.render('user/edit', {obj: result})
    })
    .catch((err) => {console.log(err)})
})

app.get("/user/:id", (req,res) => {
    console.log(req.params.id)
    Customer.findById(req.params.id)
    .then((result) => {
        res.render('user/view', {obj: result, moment: moment} )
    })
    .catch((err) => {console.log(err)})

})

//Post Request
app.post('/user/add.html', (req, res) => {
    console.log(req.body)

    Customer.create(req.body)
    .then(() =>{res.redirect("/")})
    .catch((err) => {console.log(err)})
});

app.post('/user/search.html', (req, res) => {
    console.log(req.body)
    Customer.find({firstName: req.body.searchText})
    .then((result) => {
        res.render('user/search', {arr: result, moment: moment})
    })  
    .catch((err) => {console.log(err)})
}) 


//put request
app.put('/user/edit/:id', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {res.redirect("/")})
    .catch((err) => {console.log(err)})
})

//delete request
app.delete('/user/delete/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(() => {res.redirect("/")})
    .catch((err) => {console.log(err)})
})
