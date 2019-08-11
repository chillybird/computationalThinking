import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Forum from '@/views/forum'
import About from '@/views/about'
import User from '@/views/user'
import Login from '@/views/login'
import Problem from '@/views/problem'
import Regist from '@/views/regist'



Vue.use(Router)

export default new Router({
  // 路由加载模式 history模式 与 hash模式（带有#号）
  mode:'history',
  routes: [
    {//配置嵌套路由
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/user',
      name: 'user',
      component: User
    },{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/problem',
      name: 'problem',
      component: Problem
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
