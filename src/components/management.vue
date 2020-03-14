<template>
  <div :style="{'max-height':screen_hight}">
    <el-backtop :bottom="60"></el-backtop>
    <el-col :span="4">
      <el-menu default-active="3" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1" >
          <i class="el-icon-tickets"></i>
          <span slot="title">个人博客</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">个人标签</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-back"></i>
          <span slot="title">回主菜单</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!--      <el-col :span="20" class="outer editor" :style="{'max-height':screen_hight}">
        <mavon-editor v-model="blog_text" ref="md" @change="change" :code_style="code_style" :ishljs="true"
          :externalLink="externalLink" :style="{'min-height':screen_hight}" />
      </el-col> -->
    <el-main :style="{'max-height':screen_hight}" class="outer">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  export default {
    name: "management",
    data() {
      return {
        blog_text: "",
        blog_html: "",
        code_style: 'atom-one-dark',
        externalLink: {
          markdown_css: function() {
            // 这是你的markdown css文件路径
            return '/markdown/github-markdown.min.css';
          },
          hljs_js: function() {
            // 这是你的hljs文件路径
            return '/highlightjs/highlight.min.js';
          },
          hljs_css: function(css) {
            // 这是你的代码高亮配色文件路径
            return '/highlightjs/styles/' + css + '.min.css';
          },
          hljs_lang: function(lang) {
            // 这是你的代码高亮语言解析路径
            return '/highlightjs/languages/' + lang + '.min.js';
          }
        },
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      }
    },
    methods: {
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.blog_html = render;
      },
      // 提交
      submit() {
        console.log(this.blog_text);
        console.log(this.blog_html);
      },

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
  .toolbar {
    padding: 20px 10px 20px 20px;
  }

  .editor {
    padding: 20px 20px 20px 0px;
  }
</style>
