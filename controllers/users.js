const User = require('../models/user');

const getUsers = async (request, response) => {

    const users = await User.find({}, 'name email role google');

    response.json({
        ok: true,
        users
    });
}

const addUser = async (request, response) => {

    const { email, password, name } = request.body;
    
    const user = new User( request.body );

    //Save user info into database.
    await user.save();

    response.json({
        ok: true,
        user
    });
}


module.exports = {
    getUsers,
    addUser
}