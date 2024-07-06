const express = require('express');
const port = 3001;
const cors = require('cors');
const app =express();
const todoModel = require('./model/model.js');
app.use(cors({
    origin:["http://localhost:5173","https://todo-app-pied-sigma.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
app.get('/get',(req,res)=>{
    todoModel.find()
    .then(result =>res.json(result))
    .catch(err => res.status(500).json(err));
})
app.post('/add',(req,res)=>{
    const task =req.body.task;
    todoModel.create({
        task: task
    })
    .then(result => res.json(result))
    .catch(err =>res.status(500).json(err))
})
app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    todoModel.findByIdAndDelete({_id:id})
    .then(result =>res.json(result))
    .catch(err=>res.status(500).json(err))
})
app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    todoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result =>res.json(result))
    .catch(err=>res.status(500).json(err))
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
