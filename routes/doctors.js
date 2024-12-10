/*
    Doctors
    Route: '/api/doctors'
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
    addDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctors");

const router = Router();

router.get('/', getDoctors);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('hospital', 'Invalid hospital Id').isMongoId(),
    validateFields
], addDoctor);

router.put('/:id', [], updateDoctor);

router.delete('/:id', deleteDoctor);

module.exports = router;