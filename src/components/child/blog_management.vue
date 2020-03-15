<template>
  <div style="padding: 0px 0px 70px 0px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item :to="{ name: 'blog_management' }">个人博客</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="visible_blogs" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="博客ID">
              <p><span>{{ props.row.id }}</span></p>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="访问人数">
              <span>{{ props.row.view_times }}</span>
            </el-form-item>
            <el-form-item label="点赞人数">
              <span>{{ props.row.likes }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updated_time }}</span>
            </el-form-item>
            <el-form-item label="所属标签">
              <span v-for="(t , index) in props.row.tag">
                {{t.name}}
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="title" prop="title">
      </el-table-column>
      <el-table-column label="更新" prop="updated_time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handle_attr(scope.$index, scope.row)">属性</el-button>
          <el-button size="mini" @click="handle_text(scope.$index, scope.row)">文本</el-button>
          <el-button size="mini" type="danger" @click="handle_Delete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, next" :page-count="total_page" @current-change="current_page">
    </el-pagination>

   <el-dialog title="属性" :visible.sync="attr_dialog" :append-to-body="true" width="35%" :show-close="false"
      :destroy-on-close="true" >
      <el-form :model="blog_form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="blog_form.id" autocomplete="on" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="blog_form.title" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select
              v-model="blog_form.tag"
              multiple
              collapse-tags
              placeholder="请选择标签">
              <el-option
                v-for="(t,index) in tag_list"
                :key="t.id"
                :label="t.name"
                :value="t.id">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attr_dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle_attr_submit()" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getBlogList,
    getBlogTotal,
    get_tags,
  } from "../../restful/index.js"
  export default {
    name: "blog_management",
    data() {
      return {
        blog_tables: [],
        visible_blogs: [],
        tag_list:[],
        total_page: null,

        attr_dialog: false,
        formLabelWidth: '80px',
        confirmButtonText:"确定",
        confirmBusy:false,
        blog_form:{
          id:"",
          title:"",
          tag:[],
        },
      }
    },
    created() {
      getBlogList(0, 10).then((response) => {
        this.blog_tables = this.blog_tables.concat(response.data.data);
        this.visible_blogs = this.blog_tables.slice(0, 10);
      });
      getBlogTotal().then((response) => {
        this.total_page = Math.ceil(parseInt(response.data.data) / 10);
      });
      get_tags().then((response) => {
        this.tag_list = this.tag_list.concat(response.data.data);
      });
    },
    methods: {
      current_page(cur_page) {
        // 第一种情况 请求开始的索引位置小于blog_tables，但不再请求
        if ((cur_page - 1) * 10 < this.blog_tables.length) {
          this.visible_blogs = this.blog_tables.slice((cur_page - 1) * 10, (cur_page - 1) * 10 + 10);
        }
        //第二种情况 请求开始的索引位置大于blog_tables，请求
        else if ((cur_page - 1) * 10 >= this.blog_tables.length) {
          getBlogList((cur_page - 1) * 10, 10).then((response) => {
            this.blog_tables = this.blog_tables.concat(response.data.data);
            this.visible_blogs = this.blog_tables.slice((cur_page - 1) * 10, (cur_page - 1) * 10 + 10);
          });
        }
      },

      handle_attr(index, row) {
        // console.log(index, row);
        this.attr_dialog = true;
        this.blog_form.id = row.id;
        this.blog_form.title = row.title;
        this.blog_form.tag = []
        for(let i = 0; i < row.tag.length; i++){
          this.blog_form.tag.push(row.tag[i].id);
        }
      },
      handle_text(index, row) {
        console.log(index, row);
      },
      handle_Delete(index, row) {
        console.log(index, row);
      },
      handle_attr_submit(){
        
      }
    },
  }
</script>

<style scoped>
  .source {
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;
    ;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-pagination {
    padding: 24px;
  }
</style>
