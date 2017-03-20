import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import appQuestion from"@/components/appQuestion"
import appList from "@/components/appList"
import Account from "@/components/account"
import dbQuestion from"@/components/dbQuestion"
import dbInfo from "@/components/dbInfo"
import appInfo from "@/components/appInfo"
import Login from "@/components/login"
import Regist from "@/components/regist"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/regist',
      name:'regist',
      component:Regist
    },
    {
      path: '/index/:status',
      name: 'index',
      component: Hello
    },
    {
    	path:'/appList',
    	name:'appList',
    	component:appList
    },
    {
    	path:'/appquestion/:status',
    	name:'appQuestion',
    	component:appQuestion
    },
    {
    	path:'/account',
    	name:'account',
    	component:Account
    },
    {
    	path:'/dbinfo/:id',
    	name:'dbinfo',
    	component:dbInfo
    },
    {
    	path:'/appinfo/:id',
    	name:'appinfo',
    	component:appInfo
    }
  ]
})
