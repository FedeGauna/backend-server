const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { updateImage } = require('../helpers/update-image');

const fileUpload = async (req, res = response) => {

    const entity = req.params.entity;
    const id = req.params.id;

    const validEntities = ['hospitals', 'doctors', 'users'];
    if( !validEntities.includes(entity)) {
        return res.status(400).json({
            ok: false,
            message: 'Entity not found. Try hospitals, doctors or users. '
        });
    }

    if ( !req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No files were uploaded.'
        });
    }

    const file = req.files.image;
    const splittedFileName = file.name.split('.');
    const fileExtension = splittedFileName[ splittedFileName.length - 1 ].toLowerCase();

    const supportedExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if( !supportedExtensions.includes( fileExtension ) ) {
        return res.status(400).json({
            ok: false,
            message: 'Unsupported file extension.'
        });
    }

    const fileName = `${ uuidv4() }.${ fileExtension }`;

    const path = `./uploads/${ entity }/${ fileName }`;

    file.mv( path, (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: 'There was an error when moving the image'
            });            
        }

        updateImage( entity, id, fileName );

        res.json({
            ok: true,
            message: 'File uploaded successfully.',
            fileName
        });
    });
}

const getImage = ( req, res = response) => {

    const entity = req.params.entity;
    const image = req.params.image;

    const pathImage = path.join( __dirname, `../uploads/${ entity }/${  image }`);
    //NOTE: It is needed to add a picture in /uploads/extra 
    //      with the image to be displayed by default
    //      when the searched image is not found.
    //       
    const pathDefaultImage = path.join( __dirname, `../uploads/extra/no image.jpg`);

    if ( fs.existsSync( pathImage ) ) {        
        res.sendFile( pathImage );
    } else {        
        res.sendFile( pathDefaultImage );
    }
}

module.exports = {
    fileUpload,
    getImage
}