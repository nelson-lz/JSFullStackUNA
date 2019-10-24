const {Router} = require('express');
const router = Router();

const {getCompras,getCompra,createCompras} = require('../controllers/compras.controller');

router.get('/',getCompras);
router.get('/:id',getCompra);
router.post('/',createCompras);

module.exports = router;