<template>
	<div class="main_list">
	  <h3>账号管理</h3>
      <div class="table clearfix">
        <div class="table_head clearfix">
          <div class="tb_name pull-left">用户名</div>
          <div class="tb_7L pull-left">近7天登录次数</div>
          <div class="tb_30L pull-left">近30天登录次数</div>
          <div class="tb_7H pull-left">近7天操作次数</div>
          <div class="tb_30H pull-left">近30天操作次数</div>
        </div>
        <ul class="tb_ul">
          <li class="clearfix" v-for="user in userList">
            <div class="tb_name pull-left">{{user.user}}</div>
            <div class="tb_7L pull-left">{{user.daylogin}}</div>
            <div class="tb_30L pull-left">{{user.monthlogin}}</div>
            <div class="tb_7H pull-left">{{user.dayset}}</div>
            <div class="tb_30H pull-left">{{user.monthset}}</div>
          </li>
        </ul>
      </div>
	 </div>
</template>

<script>
import Vue from 'vue';
export default {
  data () {
    return {
      userList:[]
    }
  },
  methods:{
    get_userList(){
      this.$http.post('http://www.dangbei.com/feedbackapi/visitor_log.php','',{
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then((request)=>{
        request.bodyText.promise.then((res)=>{
            res = JSON.parse(res);
            Vue.set(this,'userList',res)
        })
      })
    }
  },
  created(){
    this.get_userList();
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
  .tb_30H,.tb_name,.tb_7H,.tb_30L,.tb_7L{
    width:16%;
  }
}
</style>
