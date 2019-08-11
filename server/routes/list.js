var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var publicProblemInfos = require('../models/publicProbleminfos');
var userProblemInfos = require('../models/userProbleminfos');


// 连接mongodb数据库
mongoose.connect("mongodb://zh:zhtesture@39.108.129.163:27017/music");

// 监听服务器状态
mongoose.connection.on("connected",function(){
    console.log('mongodb connected success!');
});

mongoose.connection.on("error",function(){
    console.log('mongodb connected error!');
});

mongoose.connection.on("disconnected",function(){
    console.log('mongodb has diconnected!');
});

// 获取题库数据
router.get('/plist',function(req,res,next){
    // 获取mongodb文档
    // 获取传递的参数
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pagesize'));
    let sort = req.param('sort');
    let skip = (page - 1)*pageSize;
    let params = {};//mongodb的查询条件
    console.warn(publicProblemInfos);
    let problemsModel = publicProblemInfos.find(params).skip(skip).limit(pageSize);//从多少条记录开始，获取多少条数据
    problemsModel.sort({'visited':sort});
    // 当mongoose不需要条件参数时，可以使用exec代替find
    problemsModel.exec(function (err, docs) {
    // MusicInfos.find({}, function (err, docs) {
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }else{
            res.json({//返回一个接口
                status:0,
                msg:'success',
                result:{
                    count:docs.length,
                    list:docs
                }
            })
        }
    })
});

router.get('/ulist',function(req,res,next){
    // 获取mongodb文档
    // 获取传递的参数
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pagesize'));
    let sort = req.param('sort');
    let skip = (page - 1)*pageSize;
    let params = {};//mongodb的查询条件
    console.warn(userProblemInfos);
    let problemsModel = userProblemInfos.find(params).skip(skip).limit(pageSize);//从多少条记录开始，获取多少条数据
    problemsModel.sort({'visited':sort});
    // 当mongoose不需要条件参数时，可以使用exec代替find
    problemsModel.exec(function (err, docs) {
    // MusicInfos.find({}, function (err, docs) {
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }else{
            res.json({//返回一个接口
                status:0,
                msg:'success',
                result:{
                    count:docs.length,
                    list:docs
                }
            })
        }
    })
});


module.exports = router;