const {Schema, model} = require('mongoose');

const CompraSchema = new Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        autopopulate: true
        //autopopulate: {select: 'nombre'}
    },
    cantidad: {
        type: Number,
        required: true
    },
    monto: {
        type: Number,
        required:true
    },
    fecha: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

CompraSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Compra', CompraSchema);