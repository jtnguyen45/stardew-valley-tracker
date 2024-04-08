const Item = require('../models/items');

module.exports = {
    index,
    new: newItem,
    create,
    show,
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