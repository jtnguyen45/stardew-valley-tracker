const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bundleRoomsSchema = new Schema({
    name: {type: String},
    bundles: [{
        type: Schema.Types.ObjectId,
        ref: 'Bundle'
    }],
    reward: {type: String},
    image: {type: String},
});

module.exports = mongoose.model('BundleRoom', bundleRoomsSchema);