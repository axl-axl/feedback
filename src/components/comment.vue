<template>
	<div class="comment_list">
		<form method='post' action="" id="myform" class="clearfix" enctype="multipart/form-data">
			<textarea name="comment"></textarea>
			<div id="pick">添加图片</div>
			<div class="progress_box">
				<div class="progress">{{uploadProgress}}</div>
			</div>
			<div id="img_list"></div>
			<div id="file_list_img"></div>
			<div id="file_list_video"></div>
			<div class="btn btn_bg pull-right" v-on:click="add_comment">提交</div>
		</form>
		<div class="comment clearfix" v-for="(comment,index) in commentLists">
			<img src="" class="comment_head">
			<div class="comment_info">
				<div class="comment_name">
					{{comment.user}}
					<span class="time">
						{{comment.mtime}}
					</span>
				</div>
				<p>{{comment.msg}}</p>
				<img :src="img" v-for="img in comment.img" v-on:click="show_img">
			</div>
			
			<div class="del_btn"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
import $ from 'jquery';
import webUploader from 'webUploader';
import Vue from 'vue'
export default{
	data(){
		return {
			commentLists:[],
			uploadProgress:'',
		}
	},
	mounted:function(){
		this.uploader('#pick',this)
	},
	props:['mId'],
	methods:{
		uploader:function(demo,vm){
			var file_upload = webUploader.create({
			    server: 'http://www.dangbei.com/feedback/include/webuploader/server/fileupload.php',
			    pick: demo,
			    resize: false,
			    auto:true
			});
			file_upload.on('uploadSuccess',function(file,request) {
				let Da = new Date();
				if(Da.getMonth()+1 < 10){
					var Mo = '0'+(Da.getMonth()+1);
				}else{
					var Mo = Da.getMonth()+1;
				}
				let tFile = '/'+Da.getFullYear()+"-"+Mo+'-'+Da.getDate()+'/';
				if(file.type.match(/video.*/)){
					var input = document.createElement('input');
					input.setAttribute('value',tFile+request.result);
					input.setAttribute('hidden','true');
					document.querySelector("#file_list_video").append(input);
				}
				if(file.type.match(/image.*/)){
					var reader = new FileReader();
					reader.onload=function(e){
						var img = document.createElement('img');
						var input = document.createElement('input');
						input.setAttribute('value',tFile+request.result);
						input.setAttribute('hidden','true');
						document.querySelector("#file_list_img").append(input);
						document.querySelector("#img_list").append(img);
						img.setAttribute('src',e.target.result);
					}
					reader.readAsDataURL(file.source.source)
				}
			})
			file_upload.on('uploadProgress',function(file,percentage){
				var progress = document.querySelector('.progress_box .progress');
				progress.style.width=Math.floor(percentage*100)+'%';
				Vue.set(vm,'uploadProgress',Math.floor(percentage*100)+'%');
			})
		},
		get_comment(){
			this.$http.post('http://www.dangbei.com/feedbackapi/table_logs.php?status=get&pid=1',{status:"get",pid:this.$route.params.id},{
				headers:{
					"Content-Type":"application/x-www-form-urlencoded"
				}
			}).then((request)=>{
				request.bodyText.promise.then((res)=>{
					res = JSON.parse(res);
					Vue.set(this,'commentLists',res)
				})
			})
		},
		add_comment(){
			var msg = document.querySelector('#myform textarea').value;
			var pid = this.$route.params.id;
			var file_img = document.querySelectorAll('#file_list_img input');
			var img =new Array();
			var file_video = document.querySelectorAll('#file_list_video input');
			var video =new Array();
			for(let [index,item] of file_img.entries() ){
				img[index] = item.value
			}
			for(let [index,item] of file_video.entries() ){
				video[index] = item.value
			}
			img = img.join(',');
			video = video.join(',');
			var status = "add";
			this.$http.post('http://www.dangbei.com/feedbackapi/table_logs.php',{
				msg: msg,
				pid:pid,
				img:img,
				video:video,
				status:status,
				user:this.$store.state.userInfo.name
			},{
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then((request)=>{
				if(request.status == 200){
					this.get_comment()
				}
			})
		},
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
		}
	},
	created(){
		this.get_comment()
	}
}
</script>
<style lang="less">
@import "../css/webUploader.css";
	.comment_list{
		width:100%;
		.comment{
			width:100%;
			display:block;
			margin-top:1rem;
			border-bottom:1px solid #dedede;
		}
		.comment_head{
			float:left;
			width:60px;
			height:60px;
			display:inline-block;
			border-radius:50%;
			margin-top:0.5rem;
		}
		.comment_info{
			width:e('calc(100% - 70px)');
			float:right;
			.comment_name{
				color:#222;
				.time{
					margin-left:0.5rem;
					color:#aaa;
				}
			}
			p{
				width:100%;
				padding:0.5rem;
				box-sizing:border-box;
				margin:1rem 0;
			}
			img{
				max-width:5rem;
			}
		}
	}
	#myform{
		width:100%;
		margin:1rem 0;
		textarea{
			width:100%;
			resize:none;
			padding:0.5rem;
			min-height:4rem;
			box-sizing:border-box;
			margin:1rem 0;
		}
		.btn{
			width:100px;
			padding:0.5rem 1rem;
			text-align:center;
		}
		.progress_box{
			display:inline-block;
			width:200px;
			height:1rem;
			margin-top:0.8rem;
			margin-left:0.5rem;
			vertical-align:top;
			.progress{
				width:0;
				height:100%;
				color:#fff;
				background:#00a2d4;
				border-radius:10px;	
				text-align: center;
			}
		}
	}
	#pick{
		display:inline-block
	}
	#img_list{
		width:100%;
		img{
			max-width:100px;
		}
	}
</style>