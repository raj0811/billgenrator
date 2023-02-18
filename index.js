const express=require('express');       
const cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');   
const port = 8004;
var option = {formt:'A4'}
const pdfkit = require('pdfkit')

const puppeteer= require('puppeteer')

var pdf = require('express-pdf');

var fs = require('fs')
var bodyParser = require('body-parser')


const db=require('./config/mongoose');
const session = require('express-session');


// const MongoDBStore = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo');
// const MongoStore = require('connect-mongo')(session);



const flash = require('connect-flash');
// const customMware = require('./config/middleware');


const app= express();
app.use(express.static('assets'));


app.use(pdf)

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// app.use(expressLayouts);

// setup view engin
app.set('view engine', 'ejs');
app.set('views', './views');









app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})