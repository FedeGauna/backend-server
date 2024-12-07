const { response } = require('express');
const  User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        //Check email.
        if(!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'Email not found'
            });
        }

        //Check password.
        const validPassword = bcrypt.compareSync( password, userDB.password );
                   
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid password'
            });
        }
        
        //Generate a token - JWT.
        const token = await generateToken( userDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Unexpected error'
        })
    }
}

module. exports = {
    login
}