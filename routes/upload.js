const { Router } = require('express');

const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload } = require('../controllers/upload');

const router = Router();

router.use( expressFileUpload() );

/* 
    Path: api/upload/
*/

router.put('/:entity/:id', validateJWT, fileUpload );

module.exports = router;