<template>
  <div :style="{'max-height':screen_hight}" class="outer">
    <my_header></my_header>
    <el-container>
      <el-main>
        <ul class="time-line">
          <li class="time-line-item">
            <div class="tail-line"></div>
            <div class="normal-size top-node" style="background-color: white;">
              <img src='../../static/images/position.png' style="width: 25px;height: 25px;border-radius: 50%;" />
            </div>
          </li>
          <transition-group name="list" tag="div">
            <li class="time-line-item" v-for="(blog, index) in blog_list" :key="blog.id">
              <div class="tail-line" v-if="index!=(blog_list.length-1)"></div>
              <div class="small-size top-node" :style="{'background-color':color_list[index%8]}"></div>
              <div class="wrapper">
                <div class="content">
                  <span class="time_span">{{blog.updated_time}}</span>
                  &nbsp;
                  <span class="blog" @click="click_blog(blog.id);">{{blog.title}}</span>
                </div>
              </div>
            </li>
          </transition-group>
        </ul>
      </el-main>
      <el-footer>
        <infinite-loading @infinite="onInfinite" :distance="5">
          <span slot="no-more">————————别扯了,我也是有底线的————————</span>
        </infinite-loading>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import {getBlogList} from "../restful/index.js"
  import my_header from "./utils/my_header.vue"
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: "blogs",
    inject: ['reload', ],
    components: {
      my_header,
      InfiniteLoading,
    },
    data() {
      return {
        blog_list: [],
        offset: 0,
        color_list: ['#00CD00', '#1abc9c', '#3498db', '#9b59b6', '#9400D3', '#e67e22', '#e74c3c', '#8B0000'],
        more: true,
        loading: false,
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next();
    },
    created() {
      getBlogList(0, 10).then((response) => {
        this.set_Blog_List(response.data, 10);
      });
    },
    methods: {
      onInfinite($state) {
        let that = this;
        if (that.more) {
          if (!that.loading) {
            that.loading = true;
            setTimeout(() => {
              getBlogList(that.offset, 2).then((response) => {
                that.set_Blog_List(response.data, 2);
              });
              $state.loaded();
            }, 2000);
            that.loading = false;
          }
        }
        if (!that.more) {
          $state.complete();
        }
      },
      set_Blog_List(result, index) {
        if (result.data && result.data.length > 0) {
          this.offset += result.data.length;
          this.blog_list = this.blog_list.concat(result.data);
          if (0 < result.data.length && result.data.length < index) {
            this.more = false;
          } else {
            this.more = true;
          }
        } else {
          this.more = false;
        }
      },
      click_blog(blog_id) {
        this.$router.push({
          name: "detail",
          params: {
            id: blog_id
          }
        });
      },
    },
  }
</script>

<style scoped>
  .el-main {
    width: 100%;
    padding-top: 30px;
    padding-left: 30%;
    padding-right: 20%;
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

  .time_span {
    font-size: 14px;
  }

</style>
