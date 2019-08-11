var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    "ulid":{type:String},
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

module.exports = mongoose.model('Userprobleminfo',topicSchema);