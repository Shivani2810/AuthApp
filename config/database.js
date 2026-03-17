const mongoose = require ("mongoose"); 
require("dotenv").config();
exports.connect = ()=>{

    mongoose.connect(process.env.DATABASEURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB CONNECTED")
    })
    .catch((error)=>{
        console.log("Database Connection issues");
        console.error(err);
        process.exit(1);
    })
}