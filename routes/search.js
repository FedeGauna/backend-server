const { Router } = require('express');

const { getAll, getAllByEntity } = require('../controllers/search');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

/* 
    Path: api/search/:term
*/

router.get('/:term', validateJWT, getAll );
router.get('/documents/:entity/:term', validateJWT, getAllByEntity );

module.exports = router;