<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item>具体信息</el-breadcrumb-item>
      <el-dropdown style="float: right;" trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer;">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="handle_click_update()">修改信息</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-breadcrumb>
    <el-main>
      <el-avatar :size="size" :src="this.user_info.img_url"></el-avatar>
      <div class="div-line"><span>用户名</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{user_info.username}}</span></div>
      <div class="div-line"><span>电子邮箱</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{user_info.email}}</span></div>
      <div class="div-line"><span>上次登录</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{user_info.last_land}}</span></div>
      <div class="div-line">
        <div style="display: inline-block;"><span>自我介绍</span></div>
        <div class="self-introduce">
          <p>{{user_info.self_introduce}}</p>
        </div>
      </div>
    </el-main>
    <el-dialog title="编辑" :visible.sync="user_dialog" width="35%" :show-close="true" :append-to-body="true">
      <el-form :model="user_form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="user_form.username" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="自我介绍哦~~~" v-model="user_form.self_introduce">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="user_dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle_update()" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    get_user_info,
    update_user_info,
  } from "../../restful/index.js"
  export default {
    name: "user_info_management",
    data() {
      return {
        size: 100,
        user_info: {
          username: "",
          email: "",
          self_introduce: "",
          last_land: "",
          img_url: "",
        },
        user_form: {
          username: "",
          self_introduce: "",
        },
        user_dialog: false,
        formLabelWidth: "80px",
        confirmBusy: false,
        confirmButtonText: "确定",
      }
    },
    created() {
      get_user_info().then((response) => {
        this.set_user_info(response.data.data);
      });
    },
    methods: {
      set_user_info(user) {
        this.user_info.username = user.username;
        this.user_info.email = user.email;
        this.user_info.last_land = user.last_land;
        this.user_info.self_introduce = user.self_introduce;
        this.user_info.img_url = 'http://127.0.0.1:8000/' + user.img_url;
      },
      handle_click_update() {
        this.user_form.username = this.user_info.username;
        this.user_form.self_introduce = this.user_info.self_introduce;
        this.user_dialog = true;
      },
      handle_update(){
        update_user_info(this.user_form).then((response) => {
          if(response.data.code == "1000"){
            this.$message({
              type:"success",
              message:"更新用户信息成功"
            });
            this.user_info.username = this.user_form.username;
            this.user_info.self_introduce = this.user_form.self_introduce;
          }
          this.user_dialog = false;
        })
      },
      beforeAvatarUpload(arg_1){
        // 第一个参数是文件
        console.log(arg_1)
      },
      handleAvatarSuccess(arg_1,arg_2,arg_3){
        console.log(arg_1)
        console.log(arg_2)
        console.log(arg_3)
      }
    },
  }
</script>

<style scoped>
  .source {
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;
  }

  .div-line {
    padding: 10px;
    font-size: 16px;
  }

  .self-introduce {
    display: inline-block;
    width: 300px;
    height: 100px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
