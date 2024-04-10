const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

module.exports = mongoose.model('Favorite', favoriteSchema)