const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


HospitalSchema.method('toJSON', function() {
    const { __V, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );