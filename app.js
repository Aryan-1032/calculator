const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/miniproject');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.get('/',(req,res)=>{
    res.render('products/index');
})

app.get('/products',async(req,res)=>{
    const products = await Product.find({});
    res.render('products/products',{products});
})

app.get('/about',async(req,res)=>{
    res.render('products/about');
})

app.get('/cart',async(req,res)=>{
    res.render('products/cart');
})

app.get('/contact',async(req,res)=>{
    res.render('products/contact');
})

app.get('/checkout',async(req,res)=>{
    res.render('products/checkout');
})

app.get('/confirmation',async(req,res)=>{
    res.render('products/confirmation');
})

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})