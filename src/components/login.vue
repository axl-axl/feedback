<template>
	<div id="login">
		<form method="" action="post">
			<h3>登录</h3>
			<input type="text" name="user" placeholder="用户名" v-model='user'>
			<input type="password" name="password" placeholder="密码" v-model='password'>
			<div id="submit" v-on:click="login()">提交</div>
		</form>
	</div>
</template>
<script type="text/javascript">
import {mapMutations } from 'vuex'
	export default{
		data(){
			return {
				user:'',
				password:''
			}
		},
		methods:{
			...mapMutations(['setUserInfo']),
			login(){
				this.$http.post('http://www.dangbei.com/feedbackapi/login.php',{user:this.user,password:this.password},{
					headers: {
			            'Content-Type': 'application/x-www-form-urlencoded'
			          }
				}).then(function(res){
					res.bodyText.promise.then((msg)=>{
						msg = JSON.parse(msg);
						if(msg.status=='success'){
							this.setUserInfo(this.user);
							this.$router.push('/index/0')
						}
						if(msg.status=='error'){
							alert(msg.info)
						}
					})
				})
			}
		}
	}
</script>
<style lang="less">
	#login{
		width:400px;
		padding:2rem 1rem;
		background:#fff;
		box-sizing:border-box;
		border-radius:5px;
		margin:10vh auto;
		box-shadow:0 0 10px rgba(115,115,115,0.3);
		form{
			width:100%;
			h3{
				text-align:center;
			}
			input{
				padding:0.5rem;
				width:80%;
				display:block;
				margin:10px auto;
			}
			#submit{
				padding:0.5rem;
				width:80%;
				text-align: center;
				margin:1.5rem auto;
				background:#26c47f;
				color:#fff;
				cursor:pointer;
			}
		}
	}
</style>