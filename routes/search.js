const { Router } = require('express');

const { getAll } = require('../controllers/search');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

/* 
    Path: api/search/:term
*/

router.get('/:term', validateJWT, getAll );

module.exports = router;