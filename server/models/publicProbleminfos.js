var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    "plid":{type:String},
    "pname":{type:String},
    "pintro":{type:String},
    "visited":{type:Number},
    "num":{type:Number},
    "items":[{
        "tid":{type:String},
        "title":{type:String},
        "content":{type:String},
    }]
})

module.exports = mongoose.model('Publicprobleminfo',problemSchema);