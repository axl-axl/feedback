import Resource from 'vue-resource';
import Vue from 'vue';
Vue.use(Resource);
function data_post(vm,url,data){
	vm.$http.post(url,data,{
		headers:{
			"Content-Type":"application/x-www-form-urlencoded"
		}
	}).then((request)=>{
		request.bodyText.promise.then((res)=>{
			res = JSON.parse(res);
			var re_data = res;
		})
	})
	return re_data;
}

export default{data_post}