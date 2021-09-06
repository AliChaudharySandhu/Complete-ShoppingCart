// Setting Up Server

const express = require('express');
const app = express()
const shortid = require('shortid');
const mongoose = require('mongoose');
const cors = require('cors');


// --------------- Mongo Connection Establish`ed
mongoose.connect("mongodb+srv://AliChaudahry:Bf489419@chaudhary.bks6h.mongodb.net/Products?retryWrites=true&w=majority", () => console.log("database connected"))

// -------------------- Defining Model 
const Product = mongoose.model("Products", new mongoose.Schema({
    _id : { 
        type : String,
        default: shortid.generate()
    },   
    image :{
        type: String,
        required : true
    },
    title: {
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    availableSizes:{
        type: [String]
    },
    price:{
        type: Number,
        required : true
    }
}))

const Order = mongoose.model("Orders", new mongoose.Schema({
    _id :{
        type: String,
        default : shortid.generate()
    },
    email : String,
    name: String,
    address: String,
    total: Number,
    cart: [
        {
            _id: String,
            title: String,
            price: Number,
            count: Number
        },
    ],
}, {
    timestamps : true
}
))

// ---------------- defining req body Parsers
app.use(express.json())
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//-------------------------------- Server Apis ---------------

//----------- Orders

app.post("/api/orders", async (req, res) => {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.address ||
      !req.body.total ||
      !req.body.cart
    ) {
      return res.send({ message: "Data is required." });
    }
    const order = await new Order(req.body).save();
    res.send(order);
  });



//---------------- Products
// app.get("/api/products/", async (req, res) =>{
//     const products = await Product.find({})
//     res.send(products)
// })
app.get("/api/products/", (req, res) =>{
    Product.find({})
    .then(data => res.json(data))
    .catch(error => res.error(error))
})
// app.post("/api/products/", async (req,res) =>{
//     const newProduct = new Product(req.body)
//     const savedProduct = await newProduct.save()
//     res.send(savedProduct)
// })

app.post("/api/products/", (req,res) =>{
    const newProduct = new Product(req.body)
    newProduct.save()
    .then(data => {
        res.json(data)
    }).catch(error => console.log(error))
})

// app.delete("/api/products/:id", async (req, res) =>{
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id)
//     .catch(error => console.log(error))
//     res.send(deletedProduct)
// })
app.delete("/api/products/:id", (req, res) =>{
    Product.findByIdAndDelete(req.params.id)
    .then((data) => res.send(data))
    .catch(error => console.log(error))
})
app.put("/api/products/:id" , (req, res) =>{
    Product.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.send(data))
    .catch(error => console.log(error))
})
app.listen(8080, () => console.log('server is running, You are ready to Go!'))