const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bundlesSchema = new Schema({
    name: {type: String},
    bundleRoom: {
        type: String,
        enum: [
            'Craft Room',
            'Pantry',
            'Bulletin Board',
            'Fish Tank',
            'Boiler Room',
            'Vault',
            'None'
        ],
        default: 'None'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    trackedItems :[{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    numReq: {
        type: Number,
        min: 1,
        max: 8
    },
    reward: {type: String},
    image: {
        type: String,
        default: 'mysteryBundle.png'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Bundle', bundlesSchema);