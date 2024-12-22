const { response } = require('express');
const  User  = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    try {

        const { email, name, picture } = await googleVerify( req.body.token );       
        
        const userDB = await User.findOne({ email });
        let user;

        if( !userDB ) {
            user = new User({
                name,
                email,
                password: '@@@', //To pass the required validation. 
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        await user.save();

        //Generate a token - JWT.
        const token = await generateToken( user.id );
    
        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        });

    } catch (error) {

        console.log(error);        
        res.status(400).json({
            ok: false,
            message: 'Something went wrong while trying to verify the token.'
        })        
    }
}

module. exports = {
    login,
    googleSignIn
}