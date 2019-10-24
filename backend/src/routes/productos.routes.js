const {Router} = require('express');
const router = Router();

const {getProducto,getproductos,
       createProducto,updateProducto,
       deleteProducto} = require('../controllers/productos.controller');

router.get('/', getproductos);
router.get('/:id',getProducto);
router.post('/',createProducto);
router.put('/:id',updateProducto);
router.delete('/:id',deleteProducto);

module.exports = router;