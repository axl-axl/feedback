<template>
	<div class="main_list">
	  <h3>应用问题</h3>
      <p class="current_app">
        当前应用:<span class="app_name">{{app_name}}</span>
      </p>
  	  <questionList :status-list='statusList' :current="0"></questionList>
	 </div>
</template>

<script>
const questionList = require('./questionList');
export default {
  data () {
    return {
      app_name:'腾讯视频',
      statusList:[
          {name:'全部',path:'0'},
          {name:'未联系',path:'1'},
          {name:'解决中',path:'2'},
          {name:'已解决',path:'3'},
          {name:'无法解决',path:'4'},
          {name:'无法联系',path:'5'}
        ]
    }
  },
  methods:{

  },
  components:{
  	questionList:questionList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../css/main.less";
h3{
  text-align:left;
}
.current_app{
  margin:10px 0;
}
.app_name{
  color:#222;
  font-weight:bold;
}
</style>
