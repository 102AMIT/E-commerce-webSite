const express = require('express');

const app = express();

const errorMiddleware = require('./middleware/error');

const catchAsyncErrors = require('./middleware/catchAsyncErrors');

app.use(express.json());


app.use('/', require('./routes/index'));

app.get('/ping', (req, res) => {
    return res.send('Pong');
});

// Middleware to handle errors
app.use(errorMiddleware)

// Middleware to handle async errors
app.use(catchAsyncErrors);


module.exports = app;