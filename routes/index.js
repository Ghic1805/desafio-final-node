
const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
let obj = {
    'nome': 'Gui',
    'idade': 22
}

    res.render('home', obj);
});

module.exports = router;