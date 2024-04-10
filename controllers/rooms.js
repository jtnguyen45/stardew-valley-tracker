const Room = require('../models/rooms');
const Bundle = require('../models/bundles');

module.exports = {
    home,
    new: newRoom,
    create,
    show,
    delete: deleteRoom,
}

async function home(req, res) {
    const rooms = await Room.find({});
    res.render('rooms', {title: 'Bundle Rooms', rooms});
}

async function newRoom(req, res) {
    try {
        const bundles = await Bundle.find({});
        res.render('rooms/new', { title: 'Add Room', errorMsg: '', bundles: bundles });
    } catch (err) {
        console.log(err);
        res.render('rooms/new', { errorMsg: err.message });
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

        const roomData = {
            name: req.body.name,
            bundles: bundleObjectIds,
            reward: req.body.reward,
            image: req.body.image
        }

        const room = await Room.create(roomData);
        res.redirect(`/rooms/${room.id}`);
    } catch (err) {
        console.log(err);
        res.render('rooms/new', { errorMsg: err.message });
    }
}

async function show(req, res) {
    const room = await Room.findById(req.params.id);
    res.render('rooms/show', {title: 'Room Detail', room});
}

async function deleteRoom(req, res) {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.redirect('/rooms');
    } catch (error) {
        console.error(err);
        res.redirect(`/rooms/${req.params.id}`);
    }
}