const express = require('express');

const app = express();

const errorMiddleware = require('./middleware/error');

const catchAsyncErrors = require('./middleware/catchAsyncErrors');

app.use(express.json());
// Routes for products
const productRoute = require('./routes/productRoute');

app.use('/api/v1', productRoute);

app.get('/ping', (req, res) => {
    return res.send('Pong');
});

// Middleware to handle errors
app.use(errorMiddleware)
app.use(catchAsyncErrors);

// Middleware to handle async errors

module.exports = app;