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

// ---------------- defining req body Parsers
app.use(express.json())
app.use(cors())

//---------------- definiing Api routes from server
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
app.listen(8080, () => console.log('server is running!'))