
const fs = require('fs');

const User = require('../models/user'); 
const Hospital = require('../models/hospital'); 
const Doctor = require('../models/doctor'); 

const removeImage = ( path ) => {

    if (fs.existsSync(path)) {
        // Remove previous image.
        fs.unlinkSync(path);
    }
}


const updateImage = async (entity, id, fileName) => {
    
    switch ( entity ) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if( !doctor ) {
                console.log('Doctor not found.');
                return false;
            }        
            
            const oldPathDoctor = `./uploads/doctors/${doctor.img}`;
            removeImage( oldPathDoctor );

            doctor.img = fileName;
            await doctor.save();
            return true;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if( !hospital ) {
                console.log('Hospital not found.');
                return false;
            }        
            
            const oldPathHospital = `./uploads/hospitals/${hospital.img}`;
            removeImage( oldPathHospital );

            hospital.img = fileName;
            await hospital.save();
            return true;

        case 'users':
            const user = await User.findById(id);
            if( !user ) {
                console.log('User not found.');
                return false;
            }        
            
            const oldPathUser = `./uploads/users/${user.img}`;
            removeImage( oldPathUser );

            user.img = fileName;
            await user.save();
            return true;

        default:
            break;
    }
    
}

module.exports = {
    updateImage
}

