<template>
  <div style="padding: 0px 0px 70px 0px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item>博客类型</el-breadcrumb-item>
      <el-breadcrumb-item>类型列表</el-breadcrumb-item>
      <el-dropdown style="float: right;" trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer;">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="type_dialog_2 = true">新增类型</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-breadcrumb>
    <el-table :data="type_list" style="width: 100%">
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="标签名" prop="name">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handle_type_update_click(scope.$index, scope.row)">属性</el-button>
          <el-button size="mini" type="danger" @click="handle_type_delete_click(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="属性" :visible.sync="type_dialog" :append-to-body="true" :show-close="true">
      <el-form :model="type_form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="type_form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="type_form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="type_dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle_type_update" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>

    <el-dialog title="属性" :visible.sync="type_dialog_2" :append-to-body="true" :show-close="true">
      <el-form :model="type_form_2">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="type_form_2.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="type_dialog_2 = false">取 消</el-button>
        <el-button type="primary" @click="handle_type_add" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    get_type_list,
    update_type,
    delete_type,
    add_new_type,
  } from "../../restful/index.js"
  export default {
    name: "type_management",
    data() {
      return {
        type_list: [],
        type_form: {
          index: null,
          id: null,
          name: "",
        },
        type_dialog: false,
        formLabelWidth: '80px',
        confirmBusy: false,
        confirmButtonText: "确定",
        type_dialog_2: false,
        type_form_2: {
          name: "",
        }
      }
    },
    created() {
      get_type_list().then((response) => {
        this.type_list = this.type_list.concat(response.data.data);
      });
    },
    methods: {
      handle_type_update_click(index, row) {
        this.type_form.index = index;
        this.type_form.id = row.id;
        this.type_form.name = row.name;
        this.type_dialog = true;
      },
      handle_type_update() {
        this.confirmBusy = true;
        this.confirmButtonText = "执行中";
        update_type(this.type_form).then((response) => {
          // console.log(response.data.code)
          if (response.data.code == "1000") {
            this.$message({
              type: "success",
              message: "博客类型更新成功"
            });
            this.type_list[this.type_form.index].name = this.type_form.name;
          }
          this.confirmBusy = false;
          this.confirmButtonText = "确定";
          this.type_dialog = false;
        });
      },
      handle_type_delete_click(index, row) {
        let _self = this;
        this.$confirm('将该类型删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_type(row.id).then((response) => {
            if (response.data.code == "1000") {
              this.$message({
                type: "success",
                message: "博客类型删除成功"
              });
            }
          });
          this.type_list.splice(index, 1);
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      handle_type_add() {
        this.confirmBusy = true;
        this.confirmButtonText = "执行中";
        add_new_type(this.type_form_2).then((response) => {
          if (response.data.code == "1000") {
            if (response.data.code == "1000") {
              this.type_list.push({
                "id": response.data.data,
                "name": this.type_form_2.name
              })
              this.$message({
                type: "success",
                message: "标签添加成功"
              });
            }
          }
          this.type_form_2 ={
            name:"",
          }
          this.confirmBusy = false;
          this.confirmButtonText = "确定";
          this.type_dialog_2 = false;
        });
      }
    }
  }
</script>


<style scoped>
  .source {
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;
  }
</style>
