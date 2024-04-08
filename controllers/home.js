module.exports = {
    index,
}

function index(req, res){
    res.render('home', {title: 'Home'});
}