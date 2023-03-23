const express = require ("express");

const app = express();

const path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




var mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;mongoose.connect("mongodb://127.0.0.1:27017/contactdance");


const port = 80;


// define mongoose schema

var contactSchema = new mongoose.Schema({
  name: String,
  Address: String,
  Number: String,
  email: String
 });

 var contact = mongoose.model("contact", contactSchema);

 

 
 app.use('/static', express.static('static') ); //for serving static file//
app.set('view engine' , 'pug'); // set the temlate engine as pug
app.set('views', path.join(__dirname, 'views')); // set views directoryviews //



//pug demo endpoint//
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there! this is use of pug ' })
  })



//Endpoints//


app.get('/' , (req,res) =>{

  let para = { }

res.status(200).render('home.pug', para);
})

app.get('/contact', (req,res) =>{
  let para = { }
  res.status(200).render('contact.pug', para);
  })


 

  app.post("/contact", (req, res) => {
    var myData = new contact(req.body);
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });
     
   



app.listen(port , ()=>{

    console.log(`this port is on port ${port}`)
});

