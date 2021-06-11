exports.index = (req, res) => {
    let obj = {
        pageTitle: 'Titulo de teste'
    };

    res.render('home', obj);
}; 