const mongoose = require('mongoose');
const slug = require('slug');
const Post = mongoose.model('Post');


exports.view = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});
    res.render('view', {post});
};

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
    req.body.author = req.user._id;
    const post = new Post(req.body);

    try{
        await post.save();
    } catch (error) {
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/add');     
    }
    

    req.flash('success', 'Post salvo com sucesso!');

    res.redirect('/');
};

exports.edit = async (req, res) => {
    //1- Pegar informações do post em questão.
    const post = await Post.findOne({slug:req.params.slug});
    
    //2- Carregar o formulário de edição.
    res.render('postEdit', {post});
};

exports.editAction = async (req, res) => {
    //atualizar o slug da url
    req.body.slug = slug(req.body.title, {lower:true});
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());

    try{
    //procurar item enviado e pegar dados e atualizar
    const post = await Post.findOneAndUpdate(
        {slug:req.params.slug}, 
         req.body,
         {
             new: true, //retornar o NOVO item atualizado
             runValidators: true //serve para não editar e retornar um titulo vazio
         }
        );
    } catch(error) {
        req.flash('error', 'Erro: '+error.message);
        return res.redirect('/post/'+req.params.slug+'/edit');
    };
    //mostrar mensagem de sucesso
    req.flash('success', 'Post atualizado com sucesso!');
    //redirecionar para a home
    res.redirect('/');
};