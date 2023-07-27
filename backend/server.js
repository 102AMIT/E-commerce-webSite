const app = require('./app');
const dotenv = require('dotenv');


dotenv.config({path: './backend/config/.env'});

app.listen(process.env.PORT,(err)=>{
    if(err) {
        console.log("Error when server start");
    }
    console.log("Server is running on port: ",process.env.PORT);
})