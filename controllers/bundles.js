const Bundle = require('../models/bundles');
const Item = require('../models/items')

module.exports = {
    index,
    new: newBundle,
    create,
    show,
    delete: deleteBundle,
}

async function index(req, res){
    const bundles = await Bundle.find({});
    res.render('bundles/index', {title: 'All Bundles', bundles});
}

async function newBundle(req, res) {
    try {
        const items = await Item.find({});
        res.render('bundles/new', { title: 'Add Bundle', errorMsg: '', items: items });
    } catch (error) {
        console.log(error);
        res.render('bundles/new', { errorMsg: error.message });
    }
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    try {
        const itemIds = req.body['items[]'] || [];
        const items = await Promise.all(itemIds.map(itemId => Item.findById(itemId)));
        const itemObjectIds = items.map(item => item._id);

        const bundleData = {
            name: req.body.name,
            bundleRoom: req.body.bundleRoom,
            items: itemObjectIds,
            numReq: req.body.numReq,
            reward: req.body.reward,
            image: req.body.image
        }

        const bundle = await Bundle.create(bundleData);
        res.redirect(`/bundles/${bundle.id}`);
    } catch (error) {
        console.log(error);
        res.render('bundles/new', { errorMsg: error.message });
    }
}

async function show(req, res) {
    const bundle = await Bundle.findById(req.params.id).populate('items');
    res.render('bundles/show', {title: 'Bundle Detail', bundle});
}

async function deleteBundle(req, res) {
    try {
        await Bundle.findByIdAndDelete(req.params.id);
        res.redirect('/bundles');
    } catch (error) {
        console.error(error);
        res.redirect(`/bundles/${req.params.id}`);
    }
}