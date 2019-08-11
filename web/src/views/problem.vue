<template>
    <div id="index">
        <navHeader v-bind:headInfo="headInfo"></navHeader>

        <div class="main">
            <p style="text-align:right"><span style="color: lightgreen;cursor: pointer" v-on:click="sortList">{{sortMess}}</span></p>   
            <ul class="list">
                <li v-for="(item, index) in resList" :key="index" class="itemIn">
                    <a href="#">                        
                        <div class="info">
                            <p>习题名称:{{item.pname}}</p>
                            <p>习题介绍:{{item.pintro}}</p>
                            <p>有{{item.visited}}进行了关注</p>
                            <p>本题集有{{item.num}}道问题</p>
                        </div>
                    </a>
                </li>
            </ul>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <p style="color: lightgreen;text-align: center" v-show="loadFlag">正在加载....</p>
            </div>
        </div>
        

        <!-- 模态框测试 -->

        <div @click="openMask">打开弹窗</div>
        <modalbar v-model="sendVal" type="danger" title="我是标题" content="我是内容" v-on:cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm()" dangerText="Delete"></modalbar>
        <navFooter></navFooter>
    </div>
</template>

<script>
    import './../assets/css/problem.css'
    import modalbar from '@/components/modal'
    import navHeader from '@/components/header'
    import navFooter from '@/components/footer'
    import axios from 'axios'

    export default {
        name: 'problem',
        data () {
            return {
                headInfo:{
                    navIndex:1,
                    logInfo:'未登录',
                    logFlag:false
                },
                sendVal: false,
                resList:[],
                sortMess:'降序',
                page:1,
                pagesize:4,
                sortFlag:true,
                busy:true,
                loadFlag:true
            }
        },
        components:{
            navHeader,
            navFooter,
            modalbar
        },
        mounted() {
            this.getList(false);
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

            //主页方法
            getList:function(flag){//获取列表

                let params = {
                    page:this.page,
                    pagesize:this.pagesize,
                    sort:this.sortFlag?1:-1
                }
                axios.get('/api/list/plist',{
                    params:params,
                    headers:{
                        // token:'zhang'   
                    }
                }).then(res=>{
                    var data = res.data;

                    if(flag){
                        this.resList = this.resList.concat(data.result.list);
                        if(data.result.count<4){
                                this.busy = true;
                                this.loadFlag = false;
                        }else{
                            this.busy = false;
                            this.loadFlag = true;
                        }
                    }else{
                            this.resList = data.result.list;
                            this.busy = false;
                            this.loadFlag = true;
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            sortList:function(){//对列表进行排序

                this.sortFlag = ! this.sortFlag;
                this.page = 1;
                this.busy = true;
                this.loadFlag = true;
                this.sortMess=this.sortFlag?'降序':'升序';
                this.getList(false);
            },
            loadMore: function() {//分页加载
                this.busy = true;
                
                setTimeout(() => {
                    this.page++;
                    this.getList(true);
                }, 1000);
            }
                
        },
    }
</script>