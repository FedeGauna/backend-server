const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

/*
    Path: 'api/login'
*/


const router = Router();

router.post('/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
);



module.exports = router;