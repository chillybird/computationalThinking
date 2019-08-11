var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    "postid":{type:String},
    "postitle":{type:String},
    "author":{type:String},
    "userImg":{type:String},
    "publishTime":{type:Date},
    "postContent":{type:String},
    "visitNum":{type:Number},
    "commentNum":{type:Number},
    "comments":[{
        "userName":{type:String},
        "userImg":{type:String},
        "content":{type:String}
    }]
})

module.exports = mongoose.model('Topicinfo',topicSchema);