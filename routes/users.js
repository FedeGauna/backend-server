const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();
/*

Route: '/api/users'

*/


router.get('/', getUsers );

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], 
    addUser 
);

module.exports = router;