const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    bundles: [{
        type: Schema.Types.ObjectId,
        ref: 'Bundle'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Tracker', trackerSchema)