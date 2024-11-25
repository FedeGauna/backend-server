const { Router } = require('express');
const { getUsers, addUser } = require('../controllers/users');

const router = Router();
/*

Route: '/api/users'

*/


router.get('/', getUsers );

router.post('/', addUser );

module.exports = router;