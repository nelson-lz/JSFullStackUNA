const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        uppercase: true
    },
    precio:{
        type: Number,
        required:true,

    },
    stock:{
        type:Number,
        required:true
    }
}, {
    timestamps:false
});

module.exports = model('Producto', ProductoSchema);