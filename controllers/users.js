const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');

const getUsers = async (request, response) => {

    const from = Number( request.query.from ) || 0;
    
    const [ users, total ] = await Promise.all([
        /* Define pagination 
           skip: start from record number (from)
           limit: records per page 
        */ 
        User.find({}, 'name email role google img')
            .skip( from )
            .limit( 5 ),
        /* 
           Count total records in db users.
           NOTE: count() is deprecated, just valid to chain with find(). Use countDocuments() instead. 
           Ref: https://www.mongodb.com/docs/manual/reference/method/db.collection.count/
        */ 
        User.countDocuments()
    ]);

    response.json({
        ok: true,
        users,
        total
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

        //Generate a token - JWT.
        const token = await generateToken( user.id );
    
        res.json({
            ok: true,
            user,
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

const updateUser = async (req, res = response) => {

    const id = req.params.id;

    try {

        const userDB = await User.findById(id);

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'There is no user for the given id.'
            });
        }

        const { password, google, email, ...fields } = req.body;

        if( userDB.email !== email ) {

            const existEmail = await User.findOne({ email });

            if(existEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'The email is already registered in the database.'
                });
            }
        }

        fields.email = email;
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

const deleteUser = async(req, res = response) => {

    const id = req.params.id;

    try {

        const userDB = await User.findById(id);

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                message: 'There is no user for the given id.'
            });
        }

        await User.findByIdAndDelete( id );

        res.json({
            ok: true,
            message: 'User successfully deleted.'
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
    updateUser,
    deleteUser
}