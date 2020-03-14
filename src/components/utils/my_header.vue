<template>
  <div style="margin: 0;padding: 0;">
    <el-header style="width: 100%;height: 70px;">
      <el-row style="width:100%;padding-top: 20px;float: right;">
        <a style="margin: 0;padding: 0;float: inherit;cursor: pointer;" @click="drawer = true">
          <el-avatar src="../../../static/images/header_1.jpg" style="float: inherit;" :size='50'>
          </el-avatar>
        </a>
        <div class="toolbar">
          <transition name="slide-fade">
            <div class="tool-items" v-if="toolbar">
              <span class="tool-item" @click="homepage()">首页</span>
              <span class="tool-item" @click="tag()">标签</span>
              <span class="tool-item" @click="search()">搜索</span>
              <span class="tool-item" @click="user()">用户</span>
              <span class="tool-item" @click="edit_blog()">管理</span>
            </div>
          </transition>
          <span @click="show_toolbar();" class="tool-item">更多</span>
        </div>
      </el-row>
    </el-header>

    <el-dialog title="登录" :visible.sync="login_form_flag" :append-to-body="true" width="35%" :show-close="false"
      :destroy-on-close="true" @open="open_dialog">
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input v-model="form.validate_code" autocomplete="off">
            <template slot="prepend">
              <img :src="validate_code_img" style="vertical-align:middle; height:38px; width:100px;" @click="get_validate_img" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="login_form_flag = false">取 消</el-button>
        <el-button type="primary" @click="login()" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :show-close="false" :append-to-body="true">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  import {
    authenticate_user
  } from "../../restful/index.js"
  import {
    get_validation_code
  } from "../../restful/index.js"
  export default {
    name: "my_header",
    data() {
      return {
        toolbar: false,
        drawer: false,

        login_form_flag: false,
        formLabelWidth: '80px',
        confirmButtonText: "确定",
        confirmBusy: false,
        validate_code_img: "",
        form: {
          id: "",
          email: "",
          password: "",
          validate_code: "",
        },

      }
    },
    methods: {
      show_toolbar() {
        this.toolbar = !this.toolbar;
      },
      homepage() {
        this.$router.push({
          name: "homepage"
        });
      },
      tag() {
        this.$router.push({
          name: 'tag'
        });
      },
      search() {
        this.$router.push({
          name: 'my_search'
        });
      },
      open_dialog() {
        this.form.email = "";
        this.form.password = "";
        this.form.validate_code = "";
        this.get_validate_img();
      },

      login() {
        this.confirmButtonText = "执行中";
        this.confirmBusy = true;
        let _self = this;
        setTimeout(function() {
          authenticate_user(_self.form.id, _self.form.email, _self.form.password, _self.form.validate_code).then((
            response) => {
            if (response.data.code == "1009") {
              sessionStorage.setItem("A-TOKEN", response.data.data);
              _self.$message({
                message: '亲爱的用户，您好！',
                type: 'success'
              });
            }
            _self.confirmButtonText = "确定";
            _self.confirmBusy = false;
            _self.login_form_flag = false;
          });
        }, 500);
      },
      get_validate_img() {
        get_validation_code().then((response) => {
          let img_obj = response.data;
          this.form.id = response.data.data.id;
          this.validate_code_img = "data:image/png;base64," + response.data.data.image;
        });
      },
      user() {
        if (sessionStorage.getItem("A-TOKEN") == null || sessionStorage.getItem("A-TOKEN") == "") {
          this.login_form_flag = true
        } else {
          this.$confirm('确定退出么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            sessionStorage.removeItem("A-TOKEN")
            this.$message({
              type: 'success',
              message: '成功退出!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消退出!'
            });
          });
        }
      },

      edit_blog() {
        if (sessionStorage.getItem("A-TOKEN") == null || sessionStorage.getItem("A-TOKEN") == "") {
          this.$message({
            message: '请点击用户登录!',
            type: 'warning'
          });
        } else {
          this.$router.push({
            name: "editor",
          });
        }
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 300px;
  }

  .toolbar {
    position: relative;
    margin: 10px;
    padding: 0;
    height: 30px;
    border-radius: 20px;
    vertical-align: middle;
    display: table-cell;
    float: right;
  }

  .tool-items {
    height: 30px;
    float: left;
    display: block;
  }

  .tool-item {
    margin: 0 5px 0 5px;
    font-size: 14px;
    border-radius: 50%;
    display: inline-block;
    line-height: 30px;
    height: 30px;
    width: 30px;
    background-color: white;
    cursor: pointer;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-to

  /* .slide-fade-leave-active for below version 2.1.8 */
    {
    transform: translateX(50px);
    opacity: 0;
  }

  .tool-items .tool-item:hover {
    transition: -moz-transform 2s ease-out 0s;
    box-shadow: 0 0 3px black;
  }
</style>
