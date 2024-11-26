const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (request, response) => {

    const users = await User.find({}, 'name email role google');

    response.json({
        ok: true,
        users
    });
}

const addUser = async (request, res = response) => {

    const { email, password } = request.body;

    try {

        const emailRegistered = await User.findOne({ email });    

        if(emailRegistered) {
            return res.status(400).json({
                ok: false,
                message: 'Email already registered.'
            });
        }

        const user = new User( request.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Save user info into database.
        await user.save();
    
        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Unexpected error'
        })
    }     
}

const updateUser = async (req, res = response) => {

    const id = req.params.id;

    try {

        const existUser = await User.findById(id);

        if(!existUser) {
            return res.status(404).json({
                ok: false,
                message: 'There is no user for the given id.'
            });
        }

        const fields = req.body;

        if( existUser.email === req.body.email ) {
            delete fields.email
        } else {
            const existEmail = await User.findOne({ email: req.body.email });

            if(existEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'The email is already registered in the database.'
                });
            }
        }

        delete fields.password;
        delete fields.google;

        const updatedUser = await User.findByIdAndUpdate( id, fields, { new: true } );

        res.json({
            ok: true,
            user: updatedUser 
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Unexpected error'
        })
    }
}


module.exports = {
    getUsers,
    addUser,
    updateUser
}