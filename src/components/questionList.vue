<template>
	<section class="questionList">
		<ul class="status">
			<router-link :to="{path:'./'+status.path}" v-for="(status,index) in statusList">
				<li v-if="currents == index" class="active">{{status.name}}</li>
				<li v-else v-on:click="change_status" :data-index="index">{{status.name}}</li>
			</router-link>
		</ul>
		<div class="search_btn" v-on:click="getDatas({mark:$route.params.status,key:search_text})">搜索</div>
		<input type="text" name="search" class="search_box" v-model="search_text">
		<div class="add" v-on:click="showMask">新增</div>
		<add-question></add-question>
		<div class="table">
			<div class="table_head clearfix">
				<div class="tb_fkTime pull-left">反馈时间</div>	
				<div class="tb_status pull-left">状态</div>
				<div class="tb_version pull-left">版本号</div>
				<div class="tb_describe pull-left">问题描述</div>
				<div class="tb_type pull-left">设备型号</div>
				<div class="tb_brand pull-left">设备品牌</div>
				<div class="tb_phone pull-left">联系电话</div>
				<div class="tb_qq pull-left">QQ</div>
				<div class="tb_info pull-left">详情</div>
				<div class="tb_del pull-left">删除</div>
			</div>
			<ul class="tb_ul">
				<li class="clearfix" v-for="(list,index) in tableList">
					<div class="tb_fkTime pull-left">{{list.mtime}}</div>	
					<div class="tb_status pull-left">{{list.mark}}</div>
					<div class="tb_version pull-left">{{list.banben}}</div>
					<div class="tb_describe pull-left">{{list.content}}</div>
					<div class="tb_type pull-left">{{list.model}}</div>
					<div class="tb_brand pull-left">{{list.brand}}</div>
					<div class="tb_phone pull-left">{{list.mobile}}</div>
					<div class="tb_qq pull-left">{{list.qq}}</div>
					<route-link class="tb_info pull-left" to="/info" tag="div" v-on:click="go_info" :data-id='list.id'>查看</route-link>
					<div class="tb_del pull-left" v-on:click="delList(list.id)">删除</div>
				</li>
			</ul>
		</div>
		<div class="pageBox">
			第<input v-model='currentPage' v-on:change="change_page(currentPage)">页/共<span class="pageAll">{{pageAll}}</span>页
		</div>
	</section>
</template>
<script type="text/javascript">
import Vue from 'vue';
import addQuestion from './addQuestion';
	export default{
		name:'questionList',
		data(){
			return{
				currents:this.current,
				tableList:{},
				search_text:'',
				pagelist:'',
				pageAll:'',
				currentPage:1
			}
		},
		components:{
			addQuestion:addQuestion
		},
		props: ['statusList','current'],
		methods:{
			change_status(event){
				Vue.set(this,'currents',event.target.dataset.index)
			},
			showMask(){
				let addHtml = document.querySelector('.addHtml');
				addHtml.setAttribute('class','addHtml active')
			},
			go_info(event){
				if(this.$route.name.toLowerCase() == 'index'){
					var infoUrl='/dbInfo'
				}
				if(this.$route.name.toLowerCase() == 'appquestion'){
					var infoUrl='/appInfo'
				}
				this.$router.push({path:infoUrl+'/'+event.target.dataset.id})
			},
			change_page(page){
				this.getDatas({mark:this.$route.params.status,page:page});
			},
			getDatas(data){
				this.$http.post('http://www.dangbei.com/feedbackapi/tables.php',data,{
					headers: {
			            'Content-Type': 'application/x-www-form-urlencoded'
			        }
				}).then((resquest)=>{
					resquest.bodyText.promise.then((res)=>{
			            res = JSON.parse(res);
			            for(let index in res.list){
			            	if(res.list[index].mark == 1){
			            		res.list[index].mark = "未联系"
			            	}else if(res.list[index].mark == 2){
			            		res.list[index].mark = "解决中"
			            	}else if(res.list[index].mark == 3){
			            		res.list[index].mark = "已解决"
			            	}else if(res.list[index].mark == 4){
			            		res.list[index].mark = "无法解决"
			            	}else if(res.list[index].mark == 5){
			            		res.list[index].mark = "无法联系"
			            	}else{
			            		res.list[index].mark = res.list[index].remark
			            	}
			            }
			            Vue.set(this,'tableList',res.list);
			            Vue.set(this,'pageAll',res.allpage);
			        })
				})
			},
			delList(id){
				this.$http.post("http://www.dangbei.com/feedbackapi/tables.php",{status:'del',id:id},{
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
				}).then((resquest)=>{
					resquest.bodyText.promise.then((res)=>{
			            res = JSON.parse(res);
			            this.getDatas({mark:this.$route.params.status});
			        })
				})
			}
		},
		watch:{
			'$route':function(){
				this.getDatas({mark:this.$route.params.status});
			}
		},
		created(){
			this.getDatas({mark:this.$route.params.status});
		}
	}
</script>
<style lang='less'>
@import '../css/main.less';
	.questionList{
		width:100%;
		text-align:left;
		.status{
			text-align:left;
			max-width:60%;
			margin:10px 0;
			display:inline-block;
			li{
				display:inline-block;
				margin-right:2rem;
				position:relative;
				cursor:pointer;
				&.active{
					font-weight:bold;
					color:#222;
					&:after{
						content:'';
						position:absolute;
						width:100%;
						height:2px;
						background:#222;
						left:0;
						bottom:-10px;
					}
				}
			}
		}
		.search_btn,.search_box,.add{
			float:right;
			display:inline-block;
			padding:10px 20px;
		}
		.search_btn,.add{
			.btn_bg;
		}
		.search_box{
			outline:none;
			border-right:0;
			border:1px solid #999;
			font-size:1rem;
		}
		.search_btn{
			margin-left:-1px;
			border-radius:0 5px 5px 0;	
		}
		.add{
			margin-right:20px;
		}
		.table{
			width:100%;
			.table_head{
				background:#aaa;
				width:100%;
				margin-top:20px;
			}
			.tb_ul{
				width:100%;
				li{
					width:100%;
					border-bottom:1px solid #eee;
				}
			}
			.table_head{
				background:#f2f2f2;
			}
			.tb_fkTime,.tb_status,.tb_version,.tb_describe,.tb_type,.tb_brand,.tb_phone,.tb_qq,.tb_info,.tb_del{
				text-overflow: ellipsis;
				overflow:hidden;
				white-space: nowrap;
				padding:0.5rem 0.2rem;
				box-sizing:border-box;
			}
			.tb_fkTime{
				width:12%;
			}
			.tb_status{
				width:10%;
			}
			.tb_version{
				width:5%;
			}
			.tb_describe{
				width:23%;
			}
			.tb_type{
				width:8%;
			}
			.tb_brand{
				width:8%;
			}
			.tb_phone{
				width:10%;
			}
			.tb_qq{
				width:10%;
			}
			.tb_info{
				width:7%;
				cursor:pointer;
			}
			.tb_del{
				width:7%;
				cursor:pointer;
			}
		}
		.pageBox{
			line-height:2rem;
			margin:1rem 0;
			float:right;
			span{
				font-size:1.5rem;
				vertical-align: middle;
			}
			input{
				width:3rem;
				height:2rem;
				border:1px solid #999;
				border-radius:5px;
				outline:none;
				text-align:center;
			}
		}
	}
</style>