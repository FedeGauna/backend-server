const { Router } = require('express');

const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImage } = require('../controllers/upload');

const router = Router();

router.use( expressFileUpload() );

/* 
    Path: api/upload/
*/

router.put('/:entity/:id', validateJWT, fileUpload );

router.get('/:entity/:image', validateJWT, getImage );

module.exports = router;