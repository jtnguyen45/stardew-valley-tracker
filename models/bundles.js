const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bundlesSchema = new Schema({
    name: {type: String},
    bundleRoom: {type: String},
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    numReq: {type: Number},
    reward: {type: String},
    complete: {type: Boolean},
    image: {type: String},
});

const bundleRoomSchema = new Schema({
    name: {type: String},
    bundles: [bundlesSchema],
    reward: {type: String},
    complete: {type: Boolean},
    image: {type: String},
});

module.exports = mongoose.model('Bundle', bundlesSchema);