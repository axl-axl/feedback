<template>
	<div class="main_list">
	  <div class="info_middle pull-left">
        <div class="question_describe">
          <h3>问题描述:</h3>
          <p class="describe_box">我是问题描述</p>
        </div>
        <div class="base_info">
          <h3>基本信息:</h3>
          <ul class="table">
            <li class="clearfix">
              <div class="tb_title pull-left">当贝版本号</div>
              <div class="pull-left tb_box">3.9.8</div>
              <div class="tb_title pull-left">网络运营商</div>
              <div class="pull-left tb_box">电信</div>
              <div class="tb_title pull-left">QQ号</div>
              <div class="pull-left tb_box">2504479390</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">设备品牌</div>
              <div class="pull-left tb_box">天猫</div>
              <div class="tb_title pull-left">带宽</div>
              <div class="pull-left tb_box">40兆</div>
              <div class="tb_title pull-left">联系电话</div>
              <div class="pull-left tb_box">15955232061</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">设备型号</div>
              <div class="pull-left tb_box">M13</div>
              <div class="tb_title pull-left">IP</div>
              <div class="pull-left tb_box">114.101.99.166</div>
              <div class="tb_title pull-left">DNS</div>
              <div class="pull-left tb_box">202.102.214.4</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">CDN</div>
              <div class="pull-left tb_full">PING+netcenter.dlmix.ourdvs.com+(60.174.241.21)+56(84)+bytes+of+data.</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">DEVINCE</div>
              <div class="pull-left tb_full">a1736e4b1b62351f4563b9b2e7b4a653</div>
            </li>
          </ul>
        </div>
        <div class="question_images">
          <h3>问题图片/视频</h3>
          <image_list :image-lists='imagesLists'></image_list>
        </div>
        <div class="comment_box">
          <h3>更新记录</h3>
          <comment></comment>
        </div>
    </div>
    <div class="send_email pull-left">
      <h5>发送给开发者</h5>
      <input type="email" name="email">
      <div class="btn_bg send">发送</div>
      <div class="btn_bg turn">转到当贝市场</div>
    </div>
	  <visit :visit-lists='visit_lists'></visit>
	 </div>
</template>

<script>
const visit = require('./visit');
const image_list = require('./image_list');
const comment = require('./comment');
import Vue from 'vue'
export default {
  data () {
    return {
      questions:[
        {name:'单机问题',id:1},
        {name:'该型号问题',id:2},
        {name:'普遍问题',id:3},
        {name:'偶显问题',id:4}
      ],
      degree:[
        {name:'致命',id:1},
        {name:'严重',id:2},
        {name:'一般',id:3},
        {name:'建议',id:4}
      ],
      status:[
        {name:"未联系",id:1},
        {name:"解决中",id:2},
        {name:"无法联系",id:3},
        {name:"无法解决",id:4},
        {name:"已解决",id:5}

      ],
      visit_lists:[
        {name:'万股',time:'2017-2-12 12:15'},
        {name:'德赛欧尼',time:'2017-2-12 12:15'},
        {name:'李彩霞',time:'2017-2-12 12:15'}
      ],
      imagesLists:'',
    }
  },
  components:{
  	'visit':visit,
    'image_list':image_list,
    'comment':comment
  },
  methods:{
    imageLists(){
      this.$http.get('http://www.dangbei.com/feedbackapi/table_detail.php').then((request)=>{
        request.bodyText.promise.then((res)=>{
          res = JSON.parse(res);
          Vue.set(this,'imagesLists',res)
        })
      })
    },
    data_list(data){
      this.$http.post('http://www.dangbei.com/feedbackapi/table_detail.php',data,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((resquest)=>{
        resquest.bodyText.promise.then((res)=>{
            res = JSON.parse(res);
            Vue.set(this,'tableList',res);
        })
      })
    }
  },
  created(){
    this.data_list({id:this.$route.params.id});
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../css/main.less";
h3{
  text-align:left;
}
.info_middle{
  width:80%;
  .choice{
    span{
      margin-right:2rem;
      line-height:2rem;
      select{
        padding:0.5rem 0;
        min-width:100px;
      }
    }
  }
}
.question_describe{
  margin-top:20px;
  .describe_box{
    border:1px solid #ddd;
    width:95%;
    height:100px;
    resize:none;
    box-sizing: border-box;
    padding:0.5rem;
    margin:0.5rem;
  }
}
.base_info{
  margin-top:20px;
  width:95%;
  margin:0.5rem;
  .table{
    border:1px solid #999;
    margin:0.5rem 0;
    li{
      width:100%;
      display:block;
      border-bottom:1px solid #aaa;
      line-height:2.5rem;
    }
    .tb_title{
      background:#ccc;
      color:#222;
      width:15%;
      text-align: center;
    }
    .tb_box{
      width:16%;
      padding-left:0.5rem;
    }
    .tb_full{
      padding-left:0.5rem;
    }
  }
}
.question_images{
  margin-top:20px;
}
.comment_box{
  margin-top:20px;
}
.send_email{
  padding:1rem 0.5rem;
  box-sizing: border-box;
  background:#fff;
  box-shadow:0 0 10px rgba(110,110,110,0.3);
  border-radius:5px;
  margin-bottom:20px;
  width:20%;
  h5{
    margin-bottom:20px;
  }
  .send,.turn,input{
    box-sizing: border-box;
    font-size:16px;
    line-height:2rem;
    padding:0 0.5rem;
  }
  input{
    width:80%;
    outline:none;
    border:1px solid #ddd;
  }
  .send{
    width:20%;
    border-radius:0;
    text-align: center;
    border:1px solid #26c47f;
    float:right;
  }
  .turn{
    margin:20px auto;
    text-align: center;
    border-radius:0;
  }
}
</style>
