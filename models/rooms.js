const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomsSchema = new Schema({
    name: {type: String},
    bundles: [{
        type: Schema.Types.ObjectId,
        ref: 'Bundle'
    }],
    reward: {type: String},
    image: {type: String},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Room', roomsSchema);