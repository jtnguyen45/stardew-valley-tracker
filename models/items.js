const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {type: String},
    where: {type: [String]},
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter', 'Any'],
        default: 'Any',
    },
    image: {
        type: String,
        default: 'mysteryItem.png'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);