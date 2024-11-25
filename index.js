const { dbConnection } = require('./database/config');

const express = require('express');
const cors = require('cors');

require('dotenv').config();

// Initialize variables
var app = express();

// Configure cors
app.use(cors());

// Json read and parse. 
app.use( express.json() ); 

dbConnection();

// Routes
app.use('/api/users', require('./routes/users'))

// Listen requests
app.listen(process.env.PORT, () => {
    console.log('Server running at port:' + process.env.PORT );
});