import Vue from 'vue';
import Vuex from 'vuex';
import resource from 'vue-resource';
Vue.use(Vuex);
Vue.use(resource);

const store = new Vuex.Store({
	state: {
		userInfo:{}
	},
	mutations: {
		check_login() {
			let user = sessionStorage.getItem('user');
			if (!user) {
				window.location.href = '/'
			}
		},
		exit_login(state) {
			sessionStorage.clear();
			Vue.set(state.userInfo,'name','')
		},
		setUserInfo(state,userInfo){
			sessionStorage.setItem('user_name',userInfo);
			Vue.set(state.userInfo,'name',userInfo)
		}
	},
	actions:{
		exit_login (context) {
	      context.commit('exit_login')
	    }
	}
})
export default store