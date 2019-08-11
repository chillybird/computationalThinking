<template>
    <div>
        <navHeader v-bind:headInfo="headInfo"></navHeader>
    
        <div class="main">
            <ul class="loginops">
                <li class="op"><label for="username">用户:</label><input type="text" name="username" id="userName" placeholder="请输入用户名" value="" ref="username"></li>
                <li class="op"><label for="userpwd">密码:</label><input type="password" name="userpwd" id="userPwd" placeholder="请输入密码" value="" ref="userpwd"></li>
                <li class="op" id="logBtn" v-on:click="login"><input type="button" value="登录"></li>
            </ul>
        </div>

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
                    navIndex:3,
                    logInfo:'未登录',
                    logFlag:true
                },
                logFlag:'true',
                logUserName:''
            }
        },
        mounted() {
            this.checkLogin();
        },
        components:{
            navHeader,
            navFooter
        },
        methods: {
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
            checkLogin:function(){
                let logName = this.getCookie('userName');
                if( logName != ""){
                    this.headInfo.logInfo = logName;
                }
            },
            login:function(){
                console.log(`userName:${this.$refs.username.value},userPwd:${this.$refs.userpwd.value}`);

                let params = {
                    userName:this.$refs.username.value,
                    userPwd:this.$refs.userpwd.value,
                }
                axios.get('/api/users/login',{
                    params:params,
                    headers:{
                        // token:'zhang'   
                    }
                }).then(res=>{
                    let data = res.data;

                    console.log(data);
                    // 判断是否登录成功
                    
                    if(data.status == 0){
                        this.logFlag = false;
                        this.logUserName = data.result.userName;
                        this.headInfo.logInfo = this.logUserName;
                        alert(`${this.headInfo.logInfo},登录成功!`);
                    }else{
                        alert('登录失败,请检查用户名或密码是否错误!');
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