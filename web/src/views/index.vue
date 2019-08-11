<template>
    <div>
        <navHeader v-bind:headInfo="headInfo"></navHeader>

        <div class="main">
            <h3>首页</h3>

            <!-- 模态框测试 -->
            <div @click="openMask">打开弹窗</div>
            <modalbar v-model="sendVal" type="danger" title="我是标题" content="我是内容" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></modalbar>


        </div>
        <navFooter></navFooter>
    </div>
</template>
    
<script>

    import './../assets/css/index.css'
    import modalbar from '@/components/modal'
    import navHeader from '@/components/header'
    import navFooter from '@/components/footer'
    import axios from 'axios'

    export default {
        data() {
            return {
                headInfo:{
                    navIndex:0,
                    logInfo:'未登录',
                    logFlag:false
                },
                sendVal: false,

            }
        },
        mounted() {
            
        },
        components:{
            navHeader,
            navFooter,
            modalbar
        },
        methods: {
                // 模态框

                openMask(index){
                this.sendVal = true;
            },
            clickCancel(){
                console.log('点击了取消');
            },
            clickDanger(){
                console.log('这里是danger回调')
            },
            clickConfirm(){
                console.log('点击了confirm');
            },
        }
    }
</script>

<style scoped>
    h3{
        color: lightgreen;
        text-align: center;
    }
</style>