const { response } = require('express');

const User = require('../models/user');

const getAll = async (req, res = response) => {

    const searchTerm = req.params.term || '';  
    const caseInsensitive = RegExp( searchTerm, 'i' );

    const users =await User.find({ name: caseInsensitive });


    res.json({
        ok: true,
        users
    });
}


module.exports = {
    getAll
}