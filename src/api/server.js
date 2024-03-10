import Xpress from "express";
import bodyParser from "body-parser";
import cors from "cors";
import TransModel from "./Transaction.js";
import mongoose from "mongoose";

const app = Xpress();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://kevinraj21:21022004@cluster0.9degt7r.mongodb.net/");

app.get("/api/test", (req,res)=>{
    res.json("API server is running ok.");
});

app.get("/api/transactions", async(req,res)=>{
    const transactions = await TransModel.find({});
    res.json(transactions);
});

app.post("/api/transaction", async(req,res)=>{
    const {name, description, price, datetime} = req.body;
    const result = await TransModel.create({name, description, datetime, price});
    res.json(result);
});

app.listen(port, ()=>{
    console.log(`API is running at http://localhost:${port}`);
});

// Authentication for mongodb atlas
// kevinraj21
// 21022004