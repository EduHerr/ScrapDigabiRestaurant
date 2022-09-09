const { Schema, model } = require('mongoose');

const dishSchema = new Schema({
    nombre: { type: String, default: null },
    seccion: { type: String, default: null },
    precio: { type: String, default: null },
    descripcion: { type: String, default: null },
    Source: { type: Schema.Types.ObjectId, ref:'Source' },
    created_at: { type: Date, default: new Date() },
});

module.exports = model('Dish', dishSchema);