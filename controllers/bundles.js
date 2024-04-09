const Bundle = require('../models/bundles');
const Item = require('../models/items')

module.exports = {
    index,
    new: newBundle,
    create,
    show,
    home,
}

async function index(req, res){
    const bundles = await Bundle.find({});
    res.render('bundles/index', {title: 'All Bundles', bundles});
}

async function newBundle(req, res) {
    try {
        const items = await Item.find({});
        res.render('bundles/new', { title: 'Add Bundle', errorMsg: '', items: items });
    } catch (err) {
        console.log(err);
        res.render('bundles/new', { errorMsg: err.message });
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
    } catch (err) {
        console.log(err);
        res.render('bundles/new', { errorMsg: err.message });
    }
}

async function show(req, res) {
    const bundle = await Bundle.findById(req.params.id).populate('items');
    res.render('bundles/show', {title: 'Bundle Detail', bundle});
}

async function home(req, res) {
    const bundles = await Bundle.find({});
    res.render('bundles/home', {title: 'Bundle Rooms', bundles});
}