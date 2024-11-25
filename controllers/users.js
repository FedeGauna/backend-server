const { response } = require('express');

const User = require('../models/user');

const getUsers = async (request, response) => {

    const users = await User.find({}, 'name email role google');

    response.json({
        ok: true,
        users
    });
}

const addUser = async (request, response = response) => {

    const { email, password, name } = request.body;

    try {

        const emailRegistered = await User.findOne({ email });    

        if(emailRegistered) {
            return response.status(400).json({
                ok: false,
                message: 'Email already registered.'
            });
        }

        const user = new User( request.body );

        //Save user info into database.
        await user.save();
    
        response.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            message: 'Unexpected error'
        })
    }     
}


module.exports = {
    getUsers,
    addUser
}