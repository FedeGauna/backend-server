const { dbConnection } = require('./database/config');

const express = require('express');
const cors = require('cors');

require('dotenv').config();


// Initialize variables
var app = express();

// Configure cors
app.use(cors());

dbConnection();

// Paths
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'Request done successfully'
    });
});


// Listen requests
app.listen(process.env.PORT, () => {
    console.log('Server running at port:' + process.env.PORT );
});