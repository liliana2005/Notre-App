//#MongoDb Data base connection

const mongoose = require('mongoose');


//function to connect to the dataBase
const connectDb = async ()=>{
    try{
     const connect =    await mongoose.connect(process.env.CONNECTION_STRING);
     console.log("Database connected at: ",connect.connection.host,connect.connection.name);
     //host: the MongoDb server address, name: is the database name
    }catch(err){
        console.log(err);
        process.exit(1);

    }
} 
module.exports = connectDb;