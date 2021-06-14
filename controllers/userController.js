const User = require('../models/User');
const user = require('../models/User')

exports.login = (req, res) => {
    res.render('login');
};

exports.register = (req, res) => {
    res.render('register');
};

exports.registerAction = (req, res) => {
    const newUser = new User(req.body);
    user.register(newUser, req.body.password, (error)=>{
        if(error) {
            console.log('Error ao registrar: ', error);
            res.redirect('/');
            return;
        }

        res.redirect('/');
    });
};