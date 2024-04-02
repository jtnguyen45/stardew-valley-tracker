const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String},
    desc: {type: String},
    where: {type: [String]},
    image: {type: String},
});

module.exports = mongoose.model('Item', itemSchema);