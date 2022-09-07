const { Schema, model } = require('mongoose');

const sourceSchema = new Schema({
    uri: { type: String, default: null },
    alias: { type: String, default: null },
    product: { type: String, default: null }
});

module.exports = model('Source', sourceSchema);