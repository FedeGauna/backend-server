
/*
    Route: '/api/hospitals'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {
  addHospital,
  updateHospital,
  deleteHospital,
  getHospitals,
} = require("../controllers/hospitals");


const router = Router();

router.get('/', getHospitals );

router.post('/', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ], 
    addHospital
);

router.put('/:id',   
    [
    ], 
    updateHospital
);

router.delete('/:id',   
    deleteHospital
);


module.exports = router;