<template>
	<div class="main_list">
	  <h3>应用问题</h3>
      <div class="search_btn">搜索</div>
      <input type="text" name="search" class="search_box">
      <div class="table clearfix">
        <div class="table_head clearfix">
          <div class="tb_id pull-left">应用ID</div>
          <div class="tb_name pull-left">应用名称</div>
          <div class="tb_today pull-left">今日反馈数</div>
          <div class="tb_untreated pull-left">未处理数</div>
          <div class="tb_all pull-left">总问题数</div>
          <div class="tb_time pull-left">最近反馈时间</div>
        </div>
        <ul class="tb_ul">
          <li class="clearfix" v-on:click="appQues()">
            <div class="tb_id pull-left">12</div>
            <div class="tb_name pull-left">腾讯视频</div>
            <div class="tb_today pull-left">2</div>
            <div class="tb_untreated pull-left">14</div>
            <div class="tb_all pull-left">1452</div>
            <div class="tb_time pull-left">2017-2-24 15:36</div>
          </li>
          <li class="clearfix" v-on:click="appQues()">
            <div class="tb_id pull-left">12</div>
            <div class="tb_name pull-left">腾讯视频</div>
            <div class="tb_today pull-left">2</div>
            <div class="tb_untreated pull-left">14</div>
            <div class="tb_all pull-left">1452</div>
            <div class="tb_time pull-left">2017-2-24 15:36</div>
          </li>
        </ul>
      </div>
	 </div>
</template>

<script>
const questionList = require('./questionList');
export default {
  data () {
    return {
      app_name:'腾讯视频'
    }
  },
  components:{
  	'questionList':questionList
  },
  methods:{
    appQues(){
      this.$router.push({ name: 'appQuestion', params: { status:'all'}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../css/main.less";
h3{
  text-align:left;
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
.table{
  width:100%;
  .table_head{
    background:#f2f2f2;
    width:100%;
    margin-top:20px;
    text-align:center;
    padding:0.5rem 0;
  }
  .tb_ul{
    width:100%;
    li{
      width:100%;
      border-bottom:1px solid #eee;
      text-align: center;
      box-sizing:border-box;
      padding:0.5rem 0.2rem;
    }
  }
  .tb_id{
    width:16%;
  }
  .tb_name{
    width:20%;
  }
  .tb_today{
    width:16%;
  }
  .tb_untreated{
    width:16%;
  }
  .tb_all{
    width:16%;
  }
  .tb_time{
    width:16%;
  }
}
</style>
