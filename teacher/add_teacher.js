require('dotenv').config();
const connectToDb = require('../config/mongoConnection');


const database = process.env.DATABASE;
const collectionName = process.env.TEACHERTABLE;

async function add_students(req) {
    let client;
    try {
        client = await connectToDb();
        const db = client.db(database);
        const collection = db.collection(collectionName);

        let data = req;

        if(!data.staff_id || !data.name || !data.qualification || !data.phone || !data.subject || !data.gender){
            return {
                statusCode : 400,
                body : "Invalid Request : Missing Required Fields" 
            }
        }

        let params = {
            "staff_id": data.staff_id,
            "name": data.name,
            "qualification": data.qualification,
            "phone": data.phone,
            "subject": data.subject,
            "gender" : data.gender
        };

        await collection.insertOne(params);

        return {
            statusCode : 200,
            body : "Teacher Added Successfully"
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