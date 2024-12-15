const { response } = require('express');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getAll = async (req, res = response) => {

    const searchTerm = req.params.term || '';  
    const caseInsensitive = RegExp( searchTerm, 'i' );

    const [users, doctors, hospitals ] = await Promise.all([
        User.find({ name: caseInsensitive }),
        Doctor.find({ name: caseInsensitive }),
        Hospital.find({ name: caseInsensitive })
    ]);

    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });
}

const getAllByEntity = async (req, res = response) => {

    const searchTerm = req.params.term || '';  
    const entity = req.params.entity || 'users';  
    const caseInsensitive = RegExp( searchTerm, 'i' );

    let data = [];

    switch (entity) {
        case 'users':
            data = await User.find({ name: caseInsensitive });
            break;
        case 'doctors':
            data = await Doctor.find({ name: caseInsensitive })
                               .populate('user', 'name img')    
                               .populate('hospital', 'name img')    
            break;
        case 'hospitals':
            data = await Hospital.find({ name: caseInsensitive })
                                 .populate('user', 'name img');    

            break;    
        default:
            return res.status(400).json({
                ok: false,
                message: 'Entity not found. Try users, doctors or hospitals. '
            });
    }

    res.json({
        ok: true,
        result: data
    });
}

module.exports = {
    getAll,
    getAllByEntity
}