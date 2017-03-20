<template>
	<div class="visit_list pull-left">
		<div class="visit_head">
			访问记录
		</div>
		<ul>
			<li v-for="(item,index) in visitLists">
				<span class="name">{{item.user}}</span>
				<span class="time">{{item.mtime}}</span>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['visitLists']
	}
</script>
<style lang="less">
	.visit_list{
		width:20%;
		min-height:40vh;
		background:#fff;
		box-sizing:border-box;
		border-radius:5px;
		box-shadow:0 0 10px rgba(110,110,110,0.3);
		.visit_head{
			background:#26c47f;
			color:#fff;
			font-weight:bold;
			padding:0.5rem 0.5rem;
		}
		ul{
			padding:0.5rem 0.5rem;
			li{
				width:100%;
				margin:0.2rem 0;
				span{
					font-size:0.8rem;
				}
				.name{
					width:25%;
					display:inline-block;
				}
				.time{
					width:70%;
					display: inline-block;
				}
			}
		}
	}
</style>