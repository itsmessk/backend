const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(routes);
module.exports = app;