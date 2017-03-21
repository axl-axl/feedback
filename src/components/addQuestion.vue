<template>
	<div class="addHtml">
		<div class="mask" v-on:click="hide"></div>
		<div class="btn_close" v-on:click="hide">+</div>
		<div class="iframe_box">
			<div class="iframe_mask"></div>
			<iframe src="http://www.dangbei.com/feedback/index.html?x" scrolling='auto' marginheight="0px" class="iframe"></iframe>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		methods:{
			hide(){
				let addHtml = document.querySelector('.addHtml');
				addHtml.setAttribute('class','addHtml')
			}
		}
	}
</script>
<style lang="less">
	.addHtml{
		display:none;
		width:100%;
		height:100vh;
		position:fixed;
		top:0;
		left:0;
		&.active{
			display:block;
		}
		.iframe_box{
			width:40%;
			overflow:hidden;
			width:40%;
			background:#fff;
			position:absolute;
			top:5%;
			height:90%;
			z-index:1;
			padding:15px;
			box-sizing:border-box;
			left:30%;
			.iframe_mask{
				width:3%;
				height:100%;
				background:#fff;
				position:absolute;
				right:0;
				top:0;
			}
		}
		.mask{
			width:100%;
			height:100%;
			background-color:rgba(0,0,0,0.5);
		}
		.btn_close{
			width:30px;
			height:30px;
			border-radius:50%;
			background:#fff;
			text-align:center;
			font-size:30px;
			line-height:30px;
			transform:rotate(45deg);
			position:absolute;
			top:4%;
			left:69%;
			cursor:pointer;
			z-index:2
		}
		iframe{
			width:103%;
			height:100%;
			border:0;
		}
		.iframe::-webkit-scrollbar{
			width: 8px;
			height: 8px;
		}

		/* 设置滚动条的滑轨 */
		.iframe::-webkit-scrollbar-track {
		  	background-color: #ddd;
		}

		/* 滑块 */
		.iframe::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 4px;
		}

		 /* 滑轨两头的监听按钮 */
		.iframe::-webkit-scrollbar-button {
			background-color: #888;
			display: none;
		}
	}
</style>