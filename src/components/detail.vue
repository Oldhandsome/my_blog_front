<template>
  <div>
    <el-header>
      <el-page-header @back="routerback" content="详情页面" style="padding-top:15px;">
      </el-page-header>
    </el-header>
    <el-container>
      <el-aside width="20%">
        <div id="cateloglist" class="k-catelog-list"></div>
      </el-aside>
      <el-main class="blog_detail" v-if="blog">
        <div class="article">
          <h1 style="padding: 5px 0 10px 0;">{{blog.title}}</h1>
          <article class="markdown-body" v-html="content">
          </article>
          <p style="align:right;margin: 10px 0 5px 0; text-align: right;">
            <span>{{blog.username}}&nbsp;提交于&nbsp;{{blog.created_time}}&nbsp;</span>
          </p>
          <p style="align:right;margin: 5px 0 5px 0;text-align: right;">
            <label style="margin-right: 5px;">标签:</label>
            <span v-for="(t, index) in blog.tag" :key="t.id" style="margin-right: 5px;">
              <i>#{{t.name}}</i>
            </span>
          </p>
          <p style="align:right;margin: 5px 0 5px 0;text-align: right;">

            <span  style="margin-right: 5px;">共浏览&nbsp;&nbsp;{{blog.view_times}}&nbsp;&nbsp;次</span>
          </p>
          <div name='comments'>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  let marked = require('marked');
  let renderer = new marked.Renderer();
  renderer.code = function(code, lang, escaped) {
    if (this.options.highlight) {
      var out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    if (!lang) {
      return '<pre><code>' +
        (escaped ? code : escape(code, true)) +
        '\n</code></pre>';
    }
    return '<pre><code class="' +
      this.options.langPrefix +
      escape(lang, true) +
      ' hljs">' +
      (escaped ? code : escape(code, true)) +
      '\n</code></pre>\n';
  };

  let hljs = require('highlight.js');
  import python from 'highlight.js/lib/languages/python';
  import 'github-markdown-css/github-markdown.css'
  hljs.registerLanguage('python', python);
  import {
    get_detail
  } from "../restful/index.js"

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code, true).value;
      } else {
        return hljs.highlightAuto(code).value;
      };
    }
  });
  export default {
    name: "detail",
    data() {
      return {
        blog: null,
        content: "",
      }
    },
    inject: [],
    beforeRouteEnter: (to, from, next) => {
      get_detail(to.params.id).then((response) => {
        next((vm) => {
          vm.setData(response.data)
        });
      });
    },
    computed: {
      screen_hight: function() {
        return document.body.clientHeight + 'px';
      }
    },
    methods: {
      setData(result) {
        if (result) {
          this.blog = result.data;
          this.content = marked(result.data['text']);
        }
      },
      routerback: function() {
        this.$router.back(-1)
      },



      escape: function(html, encode) {
        return html
          .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      },
      unescape: function(html) {
        // explicitly match decimal, hex, and named HTML entities
        return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
          n = n.toLowerCase();
          if (n === 'colon') return ':';
          if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x' ?
              String.fromCharCode(parseInt(n.substring(2), 16)) :
              String.fromCharCode(+n.substring(1));
          }
          return '';
        });
      },
    }
  }
</script>


<style scoped>
  .article{
    box-sizing: border-box;
    box-shadow: 2px 4px 6px gray;
  }
  
  .markdown-body {

    min-width: 200px;
    max-width: 98%;
    margin: 0 auto;

    padding-left: 20px;
    padding-right: 15px;
    padding-top: 40px;
    font-family: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace";
    text-align: left;
  }

  .blog_detail {
    margin: 0px;
    padding-right: 20%;
    padding-bottom: 60px;
  }
</style>
