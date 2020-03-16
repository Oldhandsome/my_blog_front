<template>
  <div style="padding: 0px 0px 70px 0px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item>个人标签</el-breadcrumb-item>
      <el-breadcrumb-item>标签列表</el-breadcrumb-item>
      <el-dropdown style="float: right;" trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer;">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="tag_dialog_2 = true">新增标签</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-breadcrumb>
    <el-table :data="tag_list" style="width: 100%">
      <el-table-column label="id" prop="id">
      </el-table-column>
      <el-table-column label="标签名" prop="name">
      </el-table-column>
      <el-table-column label="排序" prop="order">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handle_tag_update_click(scope.$index, scope.row)">属性</el-button>
          <el-button size="mini" type="danger" @click="handle_tag_delete_click(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="属性" :visible.sync="tag_dialog" :append-to-body="true" :show-close="true">
      <el-form :model="tag_form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="tag_form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="tag_form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="tag_form.order"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tag_dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle_tag_update" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>

    <el-dialog title="属性" :visible.sync="tag_dialog_2" :append-to-body="true" :show-close="true">
      <el-form :model="tag_form_2">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="tag_form_2.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="tag_form_2.order" placeholder="请输入排序的序号,尽量不要相同!"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tag_dialog_2 = false">取 消</el-button>
        <el-button type="primary" @click="handle_tag_add" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    get_tags,
    update_tag,
    delete_tag,
    add_new_tag,
  } from "../../restful/index.js"
  export default {
    name: "tag_management",
    data() {
      return {
        tag_list: [],
        tag_form: {
          index: null,
          id: null,
          name: "",
          order: null,
        },
        tag_dialog: false,
        formLabelWidth: '80px',
        confirmBusy: false,
        confirmButtonText: "确定",
        tag_dialog_2: false,
        tag_form_2: {
          name: "",
          order: null,
        }
      }
    },
    created() {
      get_tags().then((response) => {
        this.tag_list = this.tag_list.concat(response.data.data);
      });
    },
    methods: {
      handle_tag_update_click(index, row) {
        this.tag_form.index = index;
        this.tag_form.id = row.id;
        this.tag_form.name = row.name;
        this.tag_form.order = row.order;
        this.tag_dialog = true;
      },
      handle_tag_update() {
        this.confirmBusy = true;
        this.confirmButtonText = "执行中";
        update_tag(this.tag_form).then((response) => {
          // console.log(response.data.code)
          if (response.data.code == "1000") {
            this.$message({
              type: "success",
              message: "标签更新成功"
            });
            this.tag_list[this.tag_form.index].name = this.tag_form.name;
            this.tag_list[this.tag_form.index].order = this.tag_form.order;
          }
          this.confirmBusy = false;
          this.confirmButtonText = "确定";
          this.tag_dialog = false;
        });
      },
      handle_tag_delete_click(index, row) {
        let _self = this;
        this.$confirm('将该标签删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_tag(row.id).then((response) => {
            if (response.data.code == "1000") {
              this.$message({
                type: "success",
                message: "标签删除成功"
              });
            }
          });
          this.tag_list.splice(index,1);
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handle_tag_add() {
        this.confirmBusy = true;
        this.confirmButtonText = "执行中";
        add_new_tag(this.tag_form_2).then((response) => {
          if(response.data.code == "1000"){
            this.tag_list.push({"id":response.data.data, "name":this.tag_form_2.name, "order":this.tag_form_2.order});
            this.$message({
              type: "success",
              message: "标签添加成功"
            });
          }
          this.tag_form_2 = {
              name: null,
              order: null,
            },
          this.confirmBusy = false;
          this.confirmButtonText = "确定";
        });
      }
    }
  }
</script>


<style scoped>
  .source {
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;
    ;
  }
</style>
