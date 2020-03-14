<template>
  <div style="padding: 0px 0px 70px 0px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item :to="{ name: 'blog_management' }">个人博客</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="blog_tables"
      style="width: 100%">
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
      <el-table-column
        label="id"
        prop="id">
      </el-table-column>
      <el-table-column
        label="title"
        prop="title">
      </el-table-column>
      <el-table-column
        label="更新"
        prop="updated_time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handle_attr(scope.$index, scope.row)">属性</el-button>
          <el-button
            size="mini"
            @click="handle_text(scope.$index, scope.row)">文本</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handle_Delete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, next"
      @current-change="current_page">
      </el-pagination>
  </div>
</template>

<script>
  import {getBlogList} from "../../restful/index.js"
  export default {
    name: "blog_management",
    data() {
      return {
        blog_tables: [],
        offset:0,
      }
    },
    created(){
      getBlogList(0,10).then((response) => {
        this.set_table(response.data.data);
      })
    },
    methods: {
      set_table(blogs){
        this.blog_tables = this.blog_tables.concat(blogs);
      },

      handleSelectionChange(val) {
        // val是整个实体对象
        this.multipleSelection = val;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },

      current_page(current_page){
        console.log(current_page);
      },

      handle_attr(index, row) {
        console.log(index, row);
      },
      handle_text(index, row) {
        console.log(index, row);
      },
      handle_Delete(index, row) {
        console.log(index, row);
      },
    },
  }
</script>

<style scoped>
  .source{
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;;
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
    .el-pagination{
      padding: 24px;
    }
</style>
