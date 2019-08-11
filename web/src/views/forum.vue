<template>
    <div>
        <navHeader v-bind:headInfo="headInfo"></navHeader>

        <div class="main">
            <h3>论坛</h3>
        </div>
        <navFooter></navFooter>
    </div>
</template>

<script>

    import './../assets/css/forum.css'
    import navHeader from '@/components/header'
    import navFooter from '@/components/footer'
    import axios from 'axios'

    export default {
        data() {
            return {
                headInfo:{
                    navIndex:2,
                    logInfo:'未登录',
                    logFlag:false
                },

            }
        },
        mounted() {
            
        },
        components:{
            navHeader,
            navFooter
        },
        methods: {
            get_userInfo:function(){
                
            }
        }
    }
</script>

<style scoped>
    h3{
        color: pink;
        text-align: center;
    }
</style>