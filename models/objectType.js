var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ObjectTypeSchema = new Schema({
    code: String,
    name: String
});

module.exports = mongoose.model("ObjectType", ObjectTypeSchema);