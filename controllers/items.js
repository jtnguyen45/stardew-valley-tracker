const Item = require('../models/items');

module.exports = {
    index,
    new: newItem,
    create,
    show,
    delete: deleteItem,
}

async function index(req, res){
    const items = await Item.find({});
    res.render('items/index', {title: 'All Items', items});
}

function newItem(req, res) {
    res.render('items/new', { title: 'Add Item', errorMsg: '' });
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    console.log("Before trim: ", req.body.where)
    req.body.where = req.body.where.trim();
    console.log("After trim: ", req.body.where);
    if (req.body.where) req.body.where = req.body.where.split(/\s*,\s*/);
    console.log("After split (should be array): ", req.body.where);

    try {
        const item = await Item.create(req.body);
        res.redirect(`/items/${item.id}`);
    } catch (err) {
        console.log(err);
    res.render('items/new', { errorMsg: err.message });
    }
}

async function show(req, res) {
    const item = await Item.findById(req.params.id);
    res.render('items/show', {title: 'Item Detail', item});
}

async function deleteItem(req, res) {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/items');
    } catch (error) {
        console.error(err);
        res.redirect(`/items/${req.params.id}`);
    }
}