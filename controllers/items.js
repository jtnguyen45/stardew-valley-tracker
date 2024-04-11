const Item = require('../models/items');

module.exports = {
    index,
    new: newItem,
    create,
    show,
    delete: deleteItem,
    edit,
    update,
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

    req.body.user = req.user._id;
    req.body.where = req.body.where.trim();
    if (req.body.where) req.body.where = req.body.where.split(/\s*,\s*/);

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

async function edit(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        res.render('items/edit', {title: 'Edit Item', item});
    } catch (error) {
        console.error(error);
        res.redirect('/items');
    }
}

async function update(req, res) {
    try {
        const itemId = req.params.id;
        const updatedItemData = {
            name: req.body.name,
            desc: req.body.desc,
        };

        const updatedItem = await Item.findByIdAndUpdate(itemId, updatedItemData, { new: true });
        res.redirect(`/items/${updatedItem._id}`);
    } catch (error) {
        console.error(error);
        res.redirect(`/items/${req.params.id}`);
    }
}