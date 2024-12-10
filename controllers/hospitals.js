const { response } = require('express');

const Hospital = require('../models/hospital');
const user = require('../models/user');

const getHospitals = ( req, res = response) => {

    res.json({
        ok: true,
        message: 'getHospitals works!'
    })
}

const addHospital = async ( req, res = response) => {

    const id = req.id;      
    const hospital = new Hospital({
        user: id,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB 
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contact an administrator.'
        });
        
    }
}

const updateHospital = ( req, res = response) => {

    res.json({
        ok: true,
        message: 'updateHospital works!'
    })
}

const deleteHospital = ( req, res = response) => {

    res.json({
        ok: true,
        message: 'deleteHospital works!'
    })
}

module.exports = {
    getHospitals,
    addHospital,
    updateHospital,
    deleteHospital
}