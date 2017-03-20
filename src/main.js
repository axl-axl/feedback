// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import store from "./vuex/index"
require('./lib/dist/js/jquery.min.js')
require('./lib/dist/sewise.player.min.js')
Vue.use(resource);
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true;
//判断是否登录
router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user_name');
  if(!user && to.fullPath != '/' && to.fullPath !="/regist"){
  		next({ path:'/'})
  }else{
  	next()
  }
})
// Vue.http.options.emulateHTTP = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
