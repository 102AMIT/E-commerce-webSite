const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: './backend/config/.env'});
const db = require('./config/mongoose');

app.listen(process.env.PORT,(err)=>{
    if(err) {
        console.log("Error when server start");
    }
    console.log("Server is running on port: ",process.env.PORT);
})