
const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
    let obj = {
        'nome': 'Gui',
        'idade': 22,
        mostrar: true,
        ingredientes: [
            {nome: 'Arroz', qt: '20kg'},
            {nome: 'Sorvete', qt: '200g'}
        ]
    };

    res.render('home', obj);
});

module.exports = router;