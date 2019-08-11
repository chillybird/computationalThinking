<template>
<div>
    <div class="header">
        <div class="head_item">
            <router-link to="/" class="headLink">首页</router-link>
        </div>
        <div class="head_item">
            <router-link to="/problem" class="headLink">题库</router-link>
        </div>
        <div class="head_item">
            <router-link to="/forum" class="headLink">论坛</router-link>
        </div>
        <div class="head_item">
            <router-link to="/login" class="headLink">登录</router-link>
        </div>
        <div class="head_item">
            <router-link to="/regist" class="headLink">注册</router-link>
        </div>
        <div class="head_item">
            <router-link to="/user" class="headLink">用户中心</router-link>
        </div>
        <div class="head_item">
            <div><span id="logMsg">{{changeLoginfo}}|</span><a href="javascript:void(0)" v-on:click="logOut">退出</a></div>     
        </div>
    </div>

</div>
</template>

<script>
    import './../assets/css/header.css'
    import axios from 'axios'
    export default {
        props:['headInfo'],
        data () {
            return {
                index:this.headInfo.navIndex,
                logFlag:false
            }
        },
        computed: {
            changeLoginfo:function(){
                // 在computed中函数不能自动更新，只会加载一次
                if(this.logFlag){//解决本页退出后，值不改变的问题
                    return '未登录';
                }else if(this.headInfo.logFlag){//解决在login登录、退出时值不改变的问题
                    return this.headInfo.logInfo == undefined?'未登录':this.headInfo.logInfo;
                }else{//根据cookie判断用户是否登录
                    let logName = this.getCookie('userName');
                    if(logName != ""){
                        return logName;
                    }else{
                        return '未登录';
                    }
                }
                
                //return this.headInfo.logInfo || this.lo == undefined?'未登录':this.headInfo.logInfo;
            }
        },
        mounted() {
            this.changeIndex();
        },
        methods: {
            // 获取cookie,判断是否登录
            getCookie:function(cname){
                let cvalue = cname+'=';
				let clist = document.cookie.split(';');
				for(let i = 0;i < clist.length;i++){
					if(clist[i].trim().indexOf(cvalue)==0){
						//返回找到对应的cookie值
						let c = clist[i];
						return c.substring(cvalue.length+1,c.length);//substring截取开始index到结束index之间的字符串
					}
                }
                return "";
            },
            changeIndex:function(){
                let headItems = document.getElementsByClassName("head_item");
                // headItems[this.index].style.color = 'pink';
                headItems[this.index].classList.add("active");
                // console.log(`index:${this.index}`);
            },
            logOut:function(){

                if(!this.getCookie("userName")){
                    alert("请先登录后再访问!");
                    return;
                }
                axios.get('/api/users/logOut').then((res)=>{
                    let result = res.data;
                    if(result.status == 0){
                        this.logFlag = true;
                        alert("退出成功!");
                    }
                })
            }
        },
    }


    // devTools图片big
    // console.log("%c ", "padding:30px 42px;background:url('http://music.sobeats.com/img/009.jpg') no-repeat center;background-size:cover;padding-left:100%;padding-bottom:55%;overflow:hidden;border-radius:5px;margin:5px 0");

    // devTools图片small
    console.log("%c ", "padding:30px 42px;background:url('http://music.sobeats.com/img/009.jpg') no-repeat;background-size: cover;border-radius: 5px;");
</script>

<style>
    .t{
        display: inline-block;
        width: 100%;
        
    }
</style>