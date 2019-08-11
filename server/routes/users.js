var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserInfos = require('../models/userInfos')

mongoose.connect("mongodb://zh:zhtesture@39.108.129.163:27017/music");


router.get('/', function(req, res, next) {res.send('this is user!');})

router.get('/info', function(req, res, next) {
  let userid = req.param('userid');
  let params = {
    'userId':userid
  };
  console.log(params);
  let userModel = UserInfos.find(params);
  userModel.exec(function(err,docs){
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

router.get('/space', function(req, res, next) {
  res.send('this is user space');
})


// 用户登录

router.get('/login',function (req, res, next) { 
  // res.send('this is user login!');
  let params = {
    'userName':req.param('userName'),
    'userPwd':req.param('userPwd')
  };
  UserInfos.findOne(params,function (err,docs) { 
    if(err){
      res.json({
        status:1,
        msg:err.message
      })
    }else{
      if(docs){
        // 向响应中写入cookie

        res.cookie('userId',docs.userId,{
          path:'/',//将cookie存入域名中
          maxAge:1000*60*60//cookie的生命周期
        });
        res.cookie('userName',docs.userName,{path:'/',maxAge:1000*60*60})
        // req.session.user = doc;//将用户信息存入到会话中

        res.json({
          status:0,
          msg:'',
          result:{
            userName:docs.userName
          }
        })
      }else{
        res.json({
          status:1,
          msg:'username or password wrong'
        })
      }
    }
   })
 })

//  用户登出
 router.get('/logOut',function (req, res, next) { 

  // 清除cookie使用户登出
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.cookie('userName',"",{path:'/',maxAge:1000*60*60})
  res.json({
    status:0,
    msg:'',
    result:''
  })

 })

// 用户注册
router.get('/regist',function (req, res, next) {
  // let userEmail = req.param('userName');
  let userName = req.param('userName');
  let userPwd = req.param('userPwd');
  let params = {
    'userName':userName
  };
  UserInfos.findOne(params,function (err,userDoc) { 
    if(err){
      res.json({
        status:1,
        msg:err.message,
        result:''
      })
    }else{
      console.warn(userDoc);
      if(userDoc){
        res.json({
          status:1,
          msg:'',
          result:'user has exist'
        })
      }else{
        let user = new UserInfos({
          userId:'000',
          userName:userName,
          userPwd:userPwd,
          intro:'this a good person!',
          problemList:[],
          postList:[]
        });
        user.save(function(err,result){
          if(err){
            res.json({
              status:1,
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:0,
              msg:'regist success',
              result:result
            })
          }
        });
        
      }
    }
   })
})

module.exports = router;
