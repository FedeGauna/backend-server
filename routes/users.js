const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser, updateUser, deleteUSer } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();
/*

Route: '/api/users'

*/


router.get('/', validateJWT, getUsers );

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], 
    addUser 
);

router.put('/:id',   
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], 
    updateUser
);

router.delete('/:id',   
    validateJWT,
    deleteUSer
);


module.exports = router;