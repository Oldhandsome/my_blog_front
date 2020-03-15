<template>
  <div>
    <my_header></my_header>
    <el-main>
      <ul class="time-line">
        <li class="time-line-item">
          <div class="tail-line"></div>
          <div class="normal-size top-node" style="background-color: white;">
            <img src='../../static/images/position.png' style="width: 25px;height: 25px;border-radius: 50%;" />
          </div>
        </li>
        <li class="time-line-item">
          <div class="tail-line"></div>
          <div class="small-size top-node" style="background-color: white;"></div>
          <div class="wrapper">
            <div class="content search-box">
              <el-autocomplete popper-class="my-autocomplete" v-model="keyword" :fetch-suggestions="querySearch"
                :trigger-on-focus="false" placeholder="one word, one world!" @select="handleSelect">
                <i class="el-icon-search el-input__icon" slot="suffix" @click="handelClick()">
                </i>
              </el-autocomplete>
              <p style="padding:5px 0px 5px 15px;color: #999;">共为您搜索到{{this.total}}条数据</p>
            </div>
          </div>
        </li>
        <transition-group name="list" tag="div">
          <li class="time-line-item" v-for="(blog, index) in blog_list" :key="blog._id">
            <div class="tail-line" v-if="index!=(blog_list.length-1)"></div>
            <div class="small-size top-node" :style="{'background-color':color_list[index%8]}"></div>
            <div class="wrapper">
              <div class="blog-title" @click="click_blog(blog._id);" v-html="blog.highlight.title[0]"></div>
              <div class="blog-text">
                <span v-html="blog.highlight.text[0]"></span>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
      <el-footer v-show="blog_list.length < total">
        <div >
          <i class="el-icon-caret-bottom"></i>
          <span style="cursor: pointer;" @click="get_more">加载更多</span>
        </div>
      </el-footer>
    </el-main>

  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import {
    get_suggestion
  } from "../restful/index.js"
  import my_header from "./utils/my_header.vue"
  import {
    get_search_result
  } from "../restful/index.js"
  export default {
    name: "my_search",
    components: {
      my_header,
    },
    data() {
      return {
        keyword: '',
        total: 0,
        offset: 0,
        blog_list: [],
        color_list: ['#00CD00', '#1abc9c', '#3498db', '#9b59b6', '#9400D3', '#e67e22', '#e74c3c', '#8B0000'],
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight + 50) + 'px';
      }
    },
    methods: {
      querySearch(queryString, cb) {
        if (queryString.trim() != "") {
          get_suggestion(queryString).then((response) => {
            let suggestion = this.initialize_suggestion(response.data.data[0]['options']);
            cb(suggestion);
          })
        }
      },
      initialize_suggestion(options) {
        let suggestion = [];
        for (let i = 0; i < options.length; i++) {
          suggestion.push({
            "id": i,
            "value": options[i]['text']
          })
        }
        return suggestion;
      },
      handleSelect(item) {
        // console.log(item);
      },
      handelClick(keyword) {
        this.blog_list = [];
        this.offset = 0;
        get_search_result(this.keyword, 0).then((response) => {
          this.set_search_result(response.data.data.hits.hits, response.data.data.hits.total.value);
        });
      },
      set_search_result(result, total) {
        this.blog_list = this.blog_list.concat(result);
        this.total = total;
        this.offset = this.offset + result.length;
        console.log(this.offset)
        console.log(this.total)
      },
      get_more() {
        get_search_result(this.keyword, this.offset).then((response) => {
          this.set_search_result(response.data.data.hits.hits, response.data.data.hits.total.value);
        });
      },
      click_blog(blog_id) {
        this.$router.push({
          name: "detail",
          params: {
            id: blog_id
          }
        });
      },
    }
  }
</script>

<style scoped>
  .el-autocomplete {
    width: 400px;
    height: 40px;
    line-height: 40px;
  }

  .el-container {
    overflow-y: auto;
  }

  .el-main {
    width: 100%;
    padding-top: 30px;
    padding-left: 30%;
    padding-right: 20%;
  }

  .search-box {
    position: relative;
    width: 400px;
  }

  .blog-title {
    font-size: 16px;
    padding-bottom: 5px;
    cursor: pointer;
  }

  .blog-text {
    font-size: 15px;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }

  .list-enter,
  .list-leave-to

  /* .list-leave-active for below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
