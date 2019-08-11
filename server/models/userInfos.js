var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    "userId" : {type:String},
	"userName" : {type:String},
    "userPwd" : {type:String},
    "userImg":{type:String},
	"intro" : {type:String},
	"problemList" : [{
        "mylist":[{
            "ulid":{type:String},
            "pname":{type:String},
            "visited":{type:Number},
            "num":{type:Number},
            "items":{type:Array}
        }],
        "practiceList":{
            "ulist":[{
                "ulid":{type:String},
                "pname":{type:String},
                "finished":{type:Boolean},
                "visited":{type:Number},
                "num":{type:Number},
                "items":{type:Array}
            }],
            "plist":[{
                "plid":{type:String},
                "pname":{type:String},
                "finished":{type:Boolean},
                "visited":{type:Number},
                "num":{type:Number},
                "items":{type:Array}
            }]
        }
    }],
    "postList":[{
        "collectList" :[{
            "postid":{type:String},
            "postitle":{type:String},
            "visitNum":{type:Number},
            "commentNum":{type:Number}
        }],
	    "publishedList" : [{
            "postid":{type:String},
            "postitle":{type:String},
            "visitNum":{type:Number},
            "commentNum":{type:Number}
        }]
    }]
});

module.exports = mongoose.model('Userinfo',userSchema);