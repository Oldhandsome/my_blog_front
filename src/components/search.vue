<template>
  <div class="outer">
    <el-backtop :bottom="60"></el-backtop>
    <my_header></my_header>
    <el-container :style="{height:screen_hight}">
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
                <!-- <i class="el-icon-search" style="padding-left: 5px;height:36px;line-height: 36px;font-size: 20px;position: absolute;z-index: 2;"></i>
							<input  class="search_input" placeholder="search..."/>
              <div style="position: absolute;width: 400px;">
                <p class="suggestion_p" v-for="(suggestion,index) in suggestions" :key="index">{{suggestion}}</p>
              </div> -->
                <el-autocomplete popper-class="my-autocomplete" v-model="keyword" :fetch-suggestions="querySearch"
                                 placeholder="请输入内容" @select="handleSelect">
                  <i class="el-icon-search el-input__icon" slot="suffix" @click="handelClick()">
                  </i>
                </el-autocomplete>
              </div>
            </div>
          </li>
          <transition-group name="list" tag="div">
				    <li class="time-line-item" v-for="(blog, index) in blog_list" :key="blog.id">
				    	<div class="tail-line" v-if="index!=(blog_list.length-1)"></div>
				    	<div class="small-size top-node" :style="{'background-color':color_list[index%8]}"></div>
				    	<div class="wrapper">
				    		<div class="content">
				    			<span class="time_span">{{blog.created_time}}</span>
				    			&nbsp;
				    			<span style="cursor: pointer;" @click="click_blog(blog.id);">{{blog.title}}</span>
				    		</div>
				    	</div>
				    </li>
				</transition-group>
        </ul>
      </el-main>
      <el-footer>
        <!-- <infinite-loading @infinite="onInfinite" :distance="5">
					<span slot="no-more">————————别扯我了,我也是有底线的————————</span>
				</infinite-loading> -->
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import my_header from "./utils/my_header.vue"
  import {get_search_result} from "../restful/index.js"
  export default {
    name: "my_search",
    components: {
      my_header,
    },
    data() {
      return {
        suggestions: [],
        keyword: '',
        position:0,
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight - 70) + 'px';
      }
    },
    mounted() {
      // 请求建议
      // this.restaurants = this.loadAll();
    },
    methods: {
      querySearch(queryString, cb) {
        // 请求建议
        // queryString 是 请求关键字 this.get_suggestion(queryString)
        // let results = this.get_suggestion();
        if(queryString.trim() != ""){
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        }
      },
      get_suggestion(keyword){
        return this.suggestions;
      },
      handleSelect(item) {
        console.log(item);
      },
      handelClick(keyword,position) {
        get_search_result(this.keyword,this.position).then((response) => {
          console.log(response.data);
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

  .search_input {
    outline: none;
    border: none;
    background-color: #c4e0e5;
    font-size: 16px;
    line-height: 36px;
    height: 36px;
    width: 370px;
    padding-left: 30px;
    border-radius: 18px;
  }

  .suggestion_p {
    padding-left: 30px;
    background-color: #E4E7ED;
    height: 36px;
    width: 370px;
    line-height: 36px;
  }
</style>
