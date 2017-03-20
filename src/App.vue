<template>
  <div id="app">
    <nav-list></nav-list>
    <router-view></router-view>
    <div class="show_box">
      <div class="mask" v-on:click="hide_img"></div>
      <img id="big_img" src=''>
      <div id="embed"></div>
    </div>
  </div>
</template>

<script>
const nav = require('./components/NavList')
export default {
  components:{
    'nav-list':nav
  },
  methods:{
    hide_img(){
        let show_box = document.querySelector(".show_box");
        let embed = document.querySelector('#embed');
        embed.textContent=""
        show_box.setAttribute('class','show_box')
    }
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;
}
h1,h2,h3,h4,h5,h6,p,span,a{
  margin:0 auto;
  padding:0;
}
.main_list{
  width:88vw;
  box-sizing:border-box;
  margin-left:10vw;
  padding:10px 20px;
}
.show_box{
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  display:none;
  &.active{
    display:flex;
    justify-content:center;
    align-items: center;
  }
  .mask{
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index:-1;
    background:rgba(0,0,0,0.5);
  }
}
#big_img{
  max-width:80%;
  display:none;
  &.active{
    display:block;
  }
}
#embed{
  width:80%;
  height:60%;
  display:none;
  &.active{
    display:block;
  }
}
</style>
