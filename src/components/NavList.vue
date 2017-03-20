<template>
  <nav>
    <div class="header">
      <h3 v-if="this.$store.state.userInfo.name">{{this.$store.state.userInfo.name}}</h3>
      <router-link to="/regist" v-else tag='span'>注册</router-link>
      <div class="outlogin" v-on:click="exit_login" v-if="this.$store.state.userInfo.name">退出</div>
      <router-link to="/" v-else tag='span'>登录</router-link>
    </div>
      <ul>  
        <!-- <router-link :to="{path:nav.path}" v-for="nav in nav_list" tag='li' active-class="nav_active" exact>{{nav.name}}</router-link> -->
        <!-- <li><router-link to="/index/0" tag='a' active-class="nav_active" exact>{{nav.name}}</router-link></li> -->
        <li><a href="#/index/0">当贝市场问题</a></li>
        <li><a href="http://www.dangbei.com/feedback/app_tables.php" target="_blank">应用问题</a></li>
        <li><a href="http://admin.znds.com/dedeznds/down_logs.php" target="_blank">下载错误日志</a></li>
        <li><a href="http://admin.znds.com/dedeznds/debuglist.php?activepath=&vcode=107" target="_blank">用户反馈日志</a></li>
        <li><a href="http://admin.znds.com/dedeznds/md5tj.php" target="_blank">MD5错误</a></li>
        <li><a href="#/account">账号管理</a></li>
      </ul>
  </nav>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      nav_list:[
        {name:"当贝市场问题",id:1,path:'/index/0'},
        {name:"应用问题",id:2,path:'/appList'},
        {name:"下载错误日志",id:3,path:'/download'},
        {name:"用户反馈日志",id:4,path:'/feedback'},
        {name:"MD5错误",id:5,path:'/md5'},
        {name:"账号管理",id:6,path:'/account'}
      ]
    }
  },
  methods:{
    ...mapMutations(['exit_login','setUserInfo']),
    userInit(){
      let user = sessionStorage.getItem('user_name');
      if(user){
        this.setUserInfo(user)
      }
    }
  },
  created(){
    this.userInit();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
@import "../css/main.less";
    nav{
      width:10vw;
      position:fixed;
      left:0;
      top:0;
      height:100%;
      background:#28314c;
      text-align:center;
      .header{
        color:#fff;
        margin-top:20px;
        h3{
          text-align: center;
          cursor:pointer;
        }
        span{
          cursor:pointer;
        }
        .outlogin{
          cursor:pointer;
        }
      }
      ul{
        margin-top:10vh;
      }
      li{
        display:block;
        padding:0.5rem 0;
        a{color:#a9bdcc;}
        &.nav_active{
          background:#26c47f;
          color:#fff;
          a{color:#a9bdcc;}
        }
        &:hover{
          cursor:pointer;
        }
      }
    }
</style>
