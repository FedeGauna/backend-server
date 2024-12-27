const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async ( req, res = response) => {

    const hospitals = await Hospital.find()
                                    .populate('user', 'name');

    res.json({
        ok: true,
        hospitals
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

const updateHospital = async ( req, res = response) => {

    const id = req.params.id;      
    const userId = req.id;      

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                message: 'Hospital not found.'
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: userId
        };

        const updatedHospital = await Hospital.findByIdAndUpdate( id, hospitalChanges, { new: true } ); 
        
        res.json({
            ok: true,
            hospital: updatedHospital 
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contact an administrator.'
        });
        
    }
}

const deleteHospital = async ( req, res = response) => {

    const id = req.params.id;        

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                message: 'Hospital not found.'
            });
        }

        await Hospital.findByIdAndDelete( id ); 
        
        res.json({
            ok: true,
            message: 'Hospital deleted successfully.'  
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contact an administrator.'
        });
        
    }
}

module.exports = {
    getHospitals,
    addHospital,
    updateHospital,
    deleteHospital
}