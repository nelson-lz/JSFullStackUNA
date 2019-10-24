const ProductoModel = require('../models/producto');


module.exports = {
    async getProducto(req, res){
        try {
            const producto = await ProductoModel.findById(req.params.id);
            res.json(producto);
        } catch (error) {
            res.json({
                success:false,
                message: 'No se pudo obtener el producto'
            });
        }
    },
    async getproductos(req, res){
        try {
            const productos = await ProductoModel.find();
            res.json(productos);
        } catch (error) {
            res.json({
                success: false,
                message:'No se pudo obtener los productos'
            })
        }
    },
    async createProducto(req, res){
        const {nombre, precio, stock} = req.body;
        if(!nombre){
            return res.json({success:false, message:'El nombre no puede ser vacio'});
        }
        if(!precio){
            return res.json({success:false, message:'El precio no puede ser vacio'});
        }
        if(!stock){
            return res.json({success:false, message:'El stock no puede ser vacio'});
        }
        try {
            const newProducto = new ProductoModel({
                nombre,
                precio,
                stock
            });
            await newProducto.save();
            res.json({
                success:true,
                message:'Producto guardado con exito'
            });
        } catch (error) {
            res.json({
                success:false,
                message:'No se pudo crear el producto'
            });
        }
    },
    async updateProducto(req, res){
        try {
          await ProductoModel.findByIdAndUpdate({_id:req.params.id}, req.body);
          res.json({
              success:true,
              message:'Producto actualizado'
          });
        } catch (error) {
            res.json({
                success:false,
                message:'Fallo la actualizacion del producto'
            });
        }
    },
    async deleteProducto(req, res){
        try {
            await ProductoModel.findByIdAndDelete(req.params.id);
            res.json({
                success:true,
                message:'Producto eliminado'
            })
            res.json({
                success:false,
                message:'Fallo al eliminar el producto'
            });
        } catch (error) {
            
        }
    }
};