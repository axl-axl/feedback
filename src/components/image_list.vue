<template>
	<div class="img_list">
		<img :src="item" v-on:click="show_img" v-for="(item,index) in imageLists">
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
	export default{
		data(){
			return {
				embed_url:""
			}
		},
		methods:{
			show_img:function(event){
				let src = event.target.currentSrc;
				let show_box = document.querySelector(".show_box");
				let big_img = document.querySelector('#big_img');
				let embed = document.querySelector('#embed');
				big_img.setAttribute('src',src);
				big_img.setAttribute('class','active')
				embed.setAttribute('class','')
				show_box.setAttribute('class','active show_box')
			},
			show_movie:function(event){
				let src = event.target.currentSrc;
				let show_box = document.querySelector(".show_box");
				let big_img = document.querySelector('#big_img');
				let embed = document.querySelector('#embed');
				Vue.set(this,'embed_url',src)
				embed.setAttribute('class','active')
				big_img.setAttribute('class','')
				this.sewise();
				show_box.setAttribute('class','active show_box')
			},
			sewise:function(){
				let embed = document.querySelector('#embed');
				embed.textContent="";
				let that =this;
				var config={
				    elid:"embed",
				    autostart:true,
				    type:["rtmp","http","flv","mp4","m3u8"],
				    skinType:"tangerine",//必须设置此属性
				    url:that.embed_url,
				    skin:"vodMobileTransparent"
				};  
				var player;//播放器
				player=new Sewise.SewisePlayer(config);
				player.startup();
			}
		},
		props:['imageLists']
	}
</script>
<style lang="less">
@import '../lib/dist/css/sewiseplayer.css';
	.img_list{
		width:100%;
		margin:0.5rem;
		img{
			height:200px;
			width:auto;
			margin-right:0.2rem;
			cursor:pointer;
		}
	}
</style>