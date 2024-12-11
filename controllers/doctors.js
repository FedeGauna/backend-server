const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {

    const doctors = await Doctor.find()
                                .populate('hospital', 'name')
                                .populate('user', 'name');

    res.json({
        ok: true,
       doctors
    });
}

const addDoctor = async (req, res = response) => {

    const id = req.id;      
    const doctor = new Doctor({
        user: id,
        ...req.body
    });

    try {

        const doctorDB = await doctor.save();
        
        res.json({
            ok: true,
            doctor: doctorDB 
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Contact an administrator.'
        });
        
    }
}

const updateDoctor = (req, res = response) => {

    res.json({
        ok: true,
        message: 'updateDoctor works!'
    });
}

const deleteDoctor = (req, res = response) => {

    res.json({
        ok: true,
        message: 'deleteDoctor works!'
    });
}


module.exports = {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
}