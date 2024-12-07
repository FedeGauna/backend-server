const jwt = require('jsonwebtoken');

const generateToken = ( id ) => {

    return new Promise((resolve, reject) => {
        const payload = {
            id
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if( err ) {
                console.log(err);      
                reject( 'Could not generate JWT.' )      
            } else {
                resolve( token );
            }    
        });
    });

}

module.exports = {
    generateToken
}
