<template>
	<div class="main_list">
	  <h3>当贝市场问题</h3>
	  <questionList :status-list="statusList" :current="0"></questionList>
	 </div>
</template>

<script>
const questionList = require('./questionList');
export default {
  data () {
    return {
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
  components:{
  	'questionList':questionList
  },
  created(){
    this.getDatas()
  },
  methods:{
    getDatas(){
      this.$http.options.emulateHTTP = true;
      this.$http.get('http://localhost:80/data.php').then((request)=>{
        
      })
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
</style>