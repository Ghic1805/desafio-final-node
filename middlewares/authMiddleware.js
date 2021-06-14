exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Ops! Você não tem permissão para acessar esta página.');
        res.redirect('/users/login');
        return;
    }

    next();
};

exports.changePassword = (req, res) => {
    //1- Confirmar se as senhas batem
    if(req.body.password != req.body['password-confirm']) {
        req.flash('error', 'Senhanão batem')
        res.redirect('/profile');
        return;
    }
    //2- Procurar o usuario e trocar a senha dele
    req.user.setPassword(req.body.password, async ()=> {
        await req.user.save();

        req.flash('success', 'Senha alterada com sucesso!')
        res.redirect('/');
    });
    //3- Redirecionar para a HOME
};