const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: './backend/config/.env'});
const db = require('./config/mongoose');

const server = app.listen(process.env.PORT,(err)=>{
    if(err) {
        console.log("Error when server start");
    }
    console.log("Server is running on port: ",process.env.PORT);
})

// Unhandled Promise Rejection if any error in database connection

process.on('unhandledRejection',err=>{

    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(()=>{
        process.exit(1);
    })
});