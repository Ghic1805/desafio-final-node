exports.index = (req, res) => {
    let obj = {
        pageTitle: 'Titulo de teste',
        userInfo: req.userInfo 
    };

    res.render('home', obj);
}; 