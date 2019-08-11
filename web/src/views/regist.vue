<template>
        <div>
            <navHeader v-bind:headInfo="headInfo"></navHeader>
        
            <div class="main">
                <ul class="loginops">
                    <li class="op"><label for="username">用户:</label><input type="text" name="username" id="userName" placeholder="请输入用户名" value="" ref="username"></li>
                    <li class="op"><label for="userpwd">密码:</label><input type="password" name="userpwd" id="userPwd" placeholder="请输入密码" value="" ref="userpwd"></li>
                    <li class="op" id="logBtn" v-on:click="regist"><input type="button" value="注册"></li>
                </ul>
            </div>
            
            <p v-show="registFlag">{{registInfo.userName}}</p>
            <navFooter></navFooter>
        </div>
    </template>
    
    <script>
        import './../assets/css/login.css'
        import navHeader from '@/components/header'
        import navFooter from '@/components/footer'
        import axios from 'axios'
    
    
        export default {
            data() {
                return {
                    headInfo:{
                        navIndex:4,
                        logInfo:'未登录',
                        logFlag:false
                    },
                    registInfo:{
                        userName:''
                    },
                    registFlag:false
                }
            },
            mounted() {
            },
            components:{
                navHeader,
                navFooter
            },
            methods: {

                regist:function(){
                    console.log(`userName:${this.$refs.username.value},userPwd:${this.$refs.userpwd.value}`);
    
                    let params = {
                        userName:this.$refs.username.value,
                        userPwd:this.$refs.userpwd.value,
                    }
                    axios.get('/api/users/regist',{
                        params:params
                    }).then(res=>{
                        let data = res.data;                        
                        if(data.status == 0){
                            this.registFlag = true;
                            this.registInfo.userName = data.result.userName;
                            alert('注册成功!');
                        }else{
                            alert('注册失败,用户名已存在!');
                        }
    
                    }).catch((error)=>{
                        console.log(`错误信息:${error}`);
                    })
                }
            },
            
        }
    </script>
    
    
    <style scoped>
        h3{
            text-align: center;
            color: lightcyan;
        }
    </style>