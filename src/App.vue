<template>
  <div id="app" :style="{'height':screen_hight}">
    <el-backtop :bottom="40">
    </el-backtop>
    <keep-alive>
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {
    screen_hight
  } from "../static/js/utils.js"
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload,
      }
    },
    data() {
      return {
        isRouterAlive: true,
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      },
    },
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function() {
          this.isRouterAlive = true
        });
      },
    },
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0rem;
    padding: 0rem;
    min-height: 37.5rem;
    position: relative;
    z-index: 999;
    height: 100%;
    width: 100%;
  }
</style>
