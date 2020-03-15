<template>
  <div class="tag_div">

    <my_header> </my_header>
    <el-container>
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
            <div class="normal-size top-node" style="background-color: white;top: 30%;">
              <span style="font-size: 14px;">
                标签
              </span>
            </div>
            <div class="wrapper" style="padding-bottom: 30px;">
              <div class="content">
                <span class="tags" v-for="(tag,index) in tag_list" @click="jumpTo(index);">
                  &nbsp;&nbsp;{{tag.name}}&nbsp;&nbsp;
                </span>
              </div>
            </div>
          </li>
          <li class="time-line-item" v-for="(tag,index) in tag_list">
            <div class="tail-line"></div>
            <div class="small-size top-node" :style="{'background-color':color_list[index%8]}"></div>
            <div class="wrapper">
              <div style="padding-bottom: 10px;"><span style="cursor: pointer;">{{tag.name}}</span></div>
              <div class="content">
                <blogs_to_tag :tag_id="tag.id"></blogs_to_tag>
              </div>
            </div>
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {
    get_tags
  } from "../restful/index.js"
  import {
    scrollAnimation
  } from "../../static/js/utils.js"
  import my_header from "./utils/my_header.vue"
  import blogs_to_tag from "./utils/blogs_to_tag.vue"
  import store from "../store/index.js"
  export default {
    name: "tag",
    data() {
      return {
        tag_list: [],
        color_list: ['#00CD00', '#1abc9c', '#3498db', '#9b59b6', '#9400D3', '#e67e22', '#e74c3c', '#8B0000']
      }
    },
    components: {
      blogs_to_tag: blogs_to_tag,
      my_header: my_header,
    },
    beforeRouteEnter: (to, from, next) => {
      next();
    },
    created() {
      get_tags().then((response) => {
        this.set_taglist(response.data.data);
      });
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      }
    },
    methods: {
      set_taglist(result) {
        if (result)
          this.tag_list = result;
        // store.state.screen = false;
      },
      jumpTo(index) {
        let array = document.querySelectorAll(".time-line-item");
        let target = array[index + 2].offsetTop;
        let current = document.documentElement.scrollTop || document.body.scrollTop;
        scrollAnimation(current, target);
      },

    },
  }
</script>

<style scoped>
  .tag_div {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .el-main {
    width: 100%;
    /* 上右下左 */
    padding: 30px 20% 60px 30%;
  }

  .tags {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    background-color: white;
    border-radius: 12px;
    margin: 5px 3px;
    padding: 0 12px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .tags:hover {
    transition: -moz-transform 2s ease-out 0s;
    box-shadow: 0 0 3px black;
  }

  
</style>
