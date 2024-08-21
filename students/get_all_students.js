require('dotenv').config();
const connectToDB = require('../config/mongoConnection');

const database = process.env.DATABASE;
const collectionName = process.env.STUDENTTABLE;

async function getLodge(){
    let client;
    try{
        client = await connectToDB();
        let db = client.db(database);
        let collection = db.collection(collectionName);

        let data = await collection.find({}).toArray();
        
        if(data){
            return {
                statusCode: 200,
                body: data
            };
        }else{
            return {
                statusCode: 400,
                body: "NO Data Avilable"
            };
        }
                                        
    }catch(e){
        console.log("Error Fetching User : ", e.message);
        return {
            statusCode: 500,
            body: e.message
        };
    }
}


module.exports = getLodge;