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
app.use('/api/upload', require('./routes/upload'));
app.use('/api/search', require('./routes/search'));
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/login', require('./routes/auth'));

// Listen requests
app.listen(process.env.PORT, () => {
    console.log('Server running at port:' + process.env.PORT );
});