const Tracker = require('../models/trackers');
const Bundle = require('../models/bundles');
const Item = require('../models/items');

module.exports = {
    index,
    new: newTracker,
    create,
    show,
    edit,
    updateTracked,
}

async function index(req, res){
    const trackers = await Tracker.find({}).populate('bundles');
    res.render('trackers/index', {title: 'All Trackers', trackers});
}

async function newTracker(req, res) {
    try {
        const bundles = await Bundle.find({});
        res.render('trackers/new', { title: 'Add Tracker', errorMsg: '', bundles: bundles });
    } catch (err) {
        console.log(err);
        res.render('trackers/new', { errorMsg: err.message });
    }
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }

    try {
        const bundleIds = req.body['bundles[]'] || [];
        const bundles = await Promise.all(bundleIds.map(bundleId => Bundle.findById(bundleId)));
        const bundleObjectIds = bundles.map(bundle => bundle._id);
        req.body.user = req.user._id;

        const trackerData = {
            name: req.body.name,
            bundles: bundleObjectIds,
            user: req.body.user,
        }

        const tracker = await Tracker.create(trackerData);
        res.redirect(`/trackers/${tracker.id}`);
    } catch (err) {
        console.log(err);
        res.render('trackers/new', { errorMsg: err.message });
    }
}

async function show(req, res) {
    const tracker = await Tracker.findById(req.params.id)
        .populate({
            path: 'bundles',
            populate: {path: 'items'}
        });
    res.render('trackers/show', {title: 'Tracker Detail', tracker});
}

async function edit(req, res) {
    const trackerId = req.params.trackerId;
    const bundleId = req.params.bundleId;
    try {
        const tracker = await Tracker.findById(trackerId)
        .populate({
            path: 'bundles',
            populate: {path: 'items'}
        });
        const bundle = tracker.bundles.find(bundle => bundle._id == bundleId);
        res.render('trackers/edit', {title: 'Edit Tracked Items', tracker, bundle})
    } catch (error) {
        console.error(error);
        res.redirect('/trackers');
    }
}

async function updateTracked(req, res) {
    const trackerId = req.params.trackerId;
    const bundleId = req.params.bundleId;
    const selectedItems = req.body['existingItems[]'] || [];
    
    try {
        const tracker = await Tracker.findById(trackerId);
        const bundle = tracker.bundles.find(bundle => bundle._id.equals(bundleId));
        bundle.trackedItems = selectedItems;
        console.log('bundle.trackedItems:', bundle.trackedItems)
        await tracker.save();

        console.log('Updated trackedItems:', bundle.trackedItems);

        res.redirect(`/trackers/${tracker._id}`);
    } catch (error) {
        console.error(error);
        res.redirect(`/trackers/${req.params.trackerId}`);
    }
}