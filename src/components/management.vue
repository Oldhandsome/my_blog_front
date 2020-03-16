<template>
  <div style="background-color: white;">
    <el-backtop :bottom="60"></el-backtop>
    <el-container :style="{'height':screen_hight}" class="outer">
      <el-col :span="4" :style="{'min-height':screen_hight}" class="toolbar">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true">
          <el-menu-item index="/management/blog">
            <i class="el-icon-tickets"></i>
            <span slot="title">个人博客</span>
          </el-menu-item>
          <el-menu-item index="/management/tag">
            <i class="el-icon-menu"></i>
            <span slot="title">个人标签</span>
          </el-menu-item>
          <el-menu-item index="/management/type_info">
            <i class="el-icon-document"></i>
            <span slot="title">博客类型</span>
          </el-menu-item>
          <el-menu-item index="/management/user_info">
            <i class="el-icon-document"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/blogs">
            <i class="el-icon-back"></i>
            <span slot="title">回主页面</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" :style="{'max-height':screen_hight}" class="main">
        <router-view></router-view>
      </el-col>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "management",
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      }
    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    border: none;
  }

  .container {}

  .toolbar {
    border-right: solid 1px #e6e6e6;
    ;
    background-color: white;
  }

  .main {
    float: right;
    background-color: white;
  }
</style>
