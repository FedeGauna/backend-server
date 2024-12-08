const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    //Read token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            message: 'There is no token in the current request.'
        });
    }

    try {
        
        const { id } = jwt.verify( token, process.env.JWT_SECRET );
        req.id = id;
        next();  

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid token.'
        });
    }

} 

module.exports = {
    validateJWT
}