const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


const all_students = require('./students/get_all_students');
const all_teacher = require('./teacher/all_teacher');
const add_students = require('./students/add_students');
const add_teacher = require('./teacher/add_teacher')


const port = 3000;

// Middleware for parsing application/json
app.use(bodyParser.json());

// Enable CORS for all routes and origins
app.use(cors());

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getStudents', async(req,res) =>{
    try{
        let data = await all_students();
        res.status(data.statusCode).json(data.body);
    }catch(e){
        res.status(500).json(e.message);
    }
    
})

app.get('/getTeachers', async(req,res) =>{
    try{
        console.log("Huii");
        let data = await all_teacher();
        res.status(data.statusCode).json(data.body);
    }catch(e){
        res.status(500).json(e.message);
    }
    
})


app.post('/addStudents', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let meshData = await add_students(req.body);
        res.status(meshData.statusCode).json(meshData.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})


app.post('/addTeachers', async(req,res) =>{
    try{
        console.log("Request Body : ",req.body);
        let meshData = await add_teacher(req.body);
        res.status(meshData.statusCode).json(meshData.body);

    }catch(e){
        res.status(500).json(e.message);
    }

})


console.log("Port : ",port);

app.listen(port, () => {
    console.log(`Server is running onn port ${port}`);
})

