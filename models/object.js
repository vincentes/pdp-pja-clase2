var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
    orderNumber: Number,
    type: {type: Schema.Types.ObjectId, ref: 'ObjectType'},
    state: ['excelente', 'bueno', 'aceptable', 'malo', 'hecho percha'],
    description: String,
    basePrice: Number
});

module.exports = mongoose.model("Object", ObjectSchema);