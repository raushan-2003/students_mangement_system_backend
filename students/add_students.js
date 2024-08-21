require('dotenv').config();
const connectToDb = require('../config/mongoConnection');


const database = process.env.DATABASE;
const collectionName = process.env.STUDENTTABLE;

async function add_students(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        let data = req;

        if(!data.admission_no || !data.name || !data.father_name || !data.mother_name || !data.standard || !data.gender){
            return {
                statusCode : 400,
                body : "Invalid Request : Missing Required Fields" 
            }
        }

        let params = {
            "admission_no": data.admission_no,
            "name": data.name,
            "father_name": data.father_name,
            "mother_name": data.mother_name,
            "standard": data.standard,
            "gender" : data.gender
        };

        await collection.insertOne(params);

        return {
            statusCode : 200,
            body : "Student Added Successfully"
        }

    } catch (error) {
        console.error('Error:', error.message);
        // throw error;
        return{
            statusCode : 500,
            body : error.message
        }

    } finally {
        if (client) {
            console.log("Monogo Connection closing");
            await client.close();
            console.log("Monogo Collection close");
        }

    }
}

module.exports = add_students;