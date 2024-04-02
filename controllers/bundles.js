const Bundle = require('../models/bundles');

module.exports = {
    index,
}

async function index(req, res){
    const bundles = await Bundle.find({});
    res.render('bundles/index', {title: 'All Bundles', bundles});
}