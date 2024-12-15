const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

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

        res.json({
            ok: true,
            message: 'File uploaded successfully.',
            fileName
        });
    });
}

module.exports = {
    fileUpload
}