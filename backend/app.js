const express = require('express');

const app = express();

app.use(express.json());
// Routes for products
const productRoute = require('./routes/productRoute');

app.use('/api/v1', productRoute);

app.get('/ping', (req, res) => {
    return res.send('Pong');
});

module.exports = app;