<template>
	<div class="main_list">
	  <div class="info_middle pull-left">
        <div class="choice">
          <span>
            问题定性

            <select name="problem_times" v-on:change="change_status('problem_times')">
              <option v-for="(item,index) in questions" :value="item.value" v-if="item.value == tableList.problem_times" selected="selected" >{{item.name}}</option>
              <option v-for="(item,index) in questions" :value="item.value" v-if="item.value != tableList.problem_times">{{item.name}}</option>
            </select>
          </span>
          <span>
            问题严重性
            <select name="problem_hard" v-on:change="change_status('problem_hard')">
            <option v-for="(item,index) in degree" :value="item.value" v-if="item.value == tableList.problem_hard" selected>{{item.name}}</option>
            <option v-for="(item,index) in degree" :value="item.value" v-if="item.value != tableList.problem_hard">{{item.name}}</option>
            </select>
          </span>
          <span>
            目前情况
            <select name="mark" v-on:change="change_status('mark')">
              <option v-for="(item,index) in status" :value="item.value" v-if="item.value == tableList.mark" selected>{{item.name}}</option>
              <option v-for="(item,index) in status" :value="item.value" v-if="item.value != tableList.mark">{{item.name}}</option>
            </select>
          </span>
        </div>
        <div class="question_describe">
          <h3>问题描述:</h3>
          <p class="describe_box">{{tableList.content}}</p>
        </div>
        <div class="base_info">
          <h3>基本信息:</h3>
          <ul class="table">
            <li class="clearfix">
              <div class="tb_title pull-left">当贝版本号</div>
              <div class="pull-left tb_box">{{tableList.banben?tableList.banben:'空'}}</div>
              <div class="tb_title pull-left">网络运营商</div>
              <div class="pull-left tb_box">{{tableList.net_suppert?tableList.net_suppert:'空'}}</div>
              <div class="tb_title pull-left">QQ号</div>
              <div class="pull-left tb_box">{{tableList.qq?tableList.qq:'空'}}</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">设备品牌</div>
              <div class="pull-left tb_box">{{tableList.brand?tableList.brand:'空'}}</div>
              <div class="tb_title pull-left">带宽</div>
              <div class="pull-left tb_box">{{tableList.net_size?tableList.net_size:'空'}}</div>
              <div class="tb_title pull-left">联系电话</div>
              <div class="pull-left tb_box">{{tableList.mobile?tableList.mobile:'空'}}</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">设备型号</div>
              <div class="pull-left tb_box">{{tableList.appver?tableList.appver:'空'}}</div>
              <div class="tb_title pull-left">IP</div>
              <div class="pull-left tb_box">{{tableList.ip?tableList.ip:'空'}}</div>
              <div class="tb_title pull-left">DNS</div>
              <div class="pull-left tb_box">{{tableList.dns?tableList.dns:'空'}}</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">CDN</div>
              <div class="pull-left tb_full">{{tableList.cdn}}</div>
            </li>
            <li class="clearfix">
              <div class="tb_title pull-left">DEVINCE</div>
              <div class="pull-left tb_full">{{tableList.device}}</div>
            </li>
          </ul>
        </div>
        <div class="question_images">
          <h3>问题图片/视频</h3>
          <image_list :image-lists="tableList.imgarr"></image_list>
        </div>
        <div class="comment_box">
          <h3>更新记录</h3>
          <comment :mId="$route.params.id"></comment>
        </div>
    </div>
	  <visit :visit-lists="visitor_list"></visit>
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
        {name:'请选择',value:0},
        {name:'单机问题',value:1},
        {name:'该型号问题',value:2},
        {name:'普遍问题',value:3},
        {name:'偶显问题',value:4}
      ],
      degree:[
        {name:'请选择',value:0},
        {name:'建议',value:1},
        {name:'一般',value:2},
        {name:'严重',value:3},
        {name:'致命',value:4}
      ],
      status:[
        {name:'请选择',value:0},
        {name:"未联系",value:1},
        {name:"解决中",value:2},
        {name:"无法联系",value:3},
        {name:"无法解决",value:4},
        {name:"已解决",value:5}

      ],
      visitor_list:[],
      tableList:{},
    }
  },
  components:{
  	'visit':visit,
    'image_list':image_list,
    'comment':comment
  },
  methods:{
    imageLists(){
      this.$http.post(
        'http://localhost:80/data.php',
        {name:'axl',age:'21',sex:'man'},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((request)=>{
          request.bodyText.promise.then((res)=>{
            res = JSON.parse(res);
            Vue.set(this,'imagesLists',res)
          })
        })
    },
    change_status(type){
      let value = event.target.value;
      let data = type+"="+value+"&id="+this.$route.params.id;
      this.$http.post('http://www.dangbei.com/feedbackapi/table_detail.php',data,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
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
            console.log(res)
            Vue.set(this,'tableList',res);
        })
      })
    },
    get_visitors(){
      let id = this.$route.params.id;
      this.$http.post('http://www.dangbei.com/feedbackapi/table_detail.php',{visitor:1,id:id},{
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then((request)=>{
        request.bodyText.promise.then((res)=>{
            res = JSON.parse(res);
            Vue.set(this,'visitor_list',res)
        })
      })
    }
  },
  created(){
    this.data_list({id:this.$route.params.id});
    this.get_visitors()
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
</style>
