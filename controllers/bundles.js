const Bundle = require('../models/bundles');
const Item = require('../models/items');

module.exports = {
    index,
    new: newBundle,
    create,
    show,
    delete: deleteBundle,
    edit,
    update,
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
        req.body.user = req.user._id;

        const bundleData = {
            name: req.body.name,
            bundleRoom: req.body.bundleRoom,
            items: itemObjectIds,
            numReq: req.body.numReq,
            reward: req.body.reward,
            image: req.body.image,
            user: req.body.user,
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

async function edit(req, res) {
    try {
        const bundle = await Bundle.findById(req.params.id);
        res.render('bundles/edit', {title: 'Edit Bundle', bundle});
    } catch (error) {
        console.error(error);
        res.redirect('/bundles');
    }
}

async function update(req, res) {
    try {
        const bundleId = req.params.id;
        const updatedBundleData = {
            name: req.body.name,
            items: req.body.items
        };

        const updatedBundle = await Bundle.findByIdAndUpdate(bundleId, updatedBundleData, { new: true });
        res.redirect(`/bundles/${updatedBundle._id}`);
    } catch (error) {
        console.error(error);
        res.redirect(`/bundles/${req.params.id}`);
    }
}