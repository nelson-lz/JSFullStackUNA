const CompraModel = require('../models/compra');
const moment = require('moment');
const ProductoModel = require('../models/producto');
moment.locale('es');

module.exports={
    async getCompras(req, res){
        try {
            const compras =await CompraModel.find();
            //const compra = 
            res.json(compras);
        } catch (error) {
            res.json({
                success:false,
                message:'No se pudo obtener las compras'
            });
        }
    },
    async getCompra(req, res){
        try {
            const compra = await CompraModel.findOne({_id:req.params.id});
            res.json({
                producto:compra.producto.nombre,
                cantidad:compra.cantidad,
                monto:compra.monto,
                precioProducto:compra.producto.precio
            });
        } catch (error) {
            res.json({
                success:false,
                message:'no se ha podido obtener la compra'
            });
        }
    },
    async createCompras(req, res){
        const {producto, cantidad} = req.body;
        if(!producto){
            res.json({
                success:false,
                message:'debe agregar un producto'
            });
        }
        if(!cantidad){
            res.json({
                success:false,
                message:'debe agregar la cantidad'
            });
        }
        try {
            const productoF = await ProductoModel.findOne({_id:producto});
            if(productoF.stock >= cantidad){
                const monto = cantidad * productoF.precio;
                const fecha = moment().format('L');
                const newCompra = new CompraModel({
                    producto,
                    cantidad,
                    monto,
                    fecha
                });
                await newCompra.save();
                productoF.stock = productoF.stock -cantidad;
                await productoF.save();
                res.json({
                    success:true,
                    message:'Compra guardada con exito'
                });
            }else{
                res.json({
                    success:false,
                    message:'La cantidad sobrepasa al stock'
                });
            }
        } catch (error) {
            res.json({
                success:false,
                message:'No se ha podido guardar la compra'
            });
        }
    }
};