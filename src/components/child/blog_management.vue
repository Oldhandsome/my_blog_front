<template>
  <div style="padding: 0px 0px 70px 0px;">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="source">
      <el-breadcrumb-item>个人博客</el-breadcrumb-item>
      <el-breadcrumb-item>博客列表</el-breadcrumb-item>
      <el-dropdown style="float: right;" trigger="click">
        <span class="el-dropdown-link" style="cursor: pointer;">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="new_blog_dialog = true">新增博客</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-breadcrumb>
    <el-table :data="blog_tables.slice(offset,offset+10)" style="width: 100%">
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
            <el-form-item label="是否公开">
              <span v-show="props.row.article_type == 1">公开</span>
              <span v-show="props.row.article_type == 2">私密</span>
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
    <el-pagination background layout="prev, next" :total="total_num" @current-change="current_page">
    </el-pagination>

    <el-dialog title="属性" :visible.sync="attr_dialog" :append-to-body="true" width="30%" :show-close="false"
      :destroy-on-close="true" :close-on-click-modal="false">
      <el-form :model="blog_form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="blog_form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="blog_form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="blog_form.type" placeholder="请选择类型">
            <el-option v-for="(t,index) in type_list" :key="t.id" :label="t.name" :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="blog_form.tag" multiple collapse-tags placeholder="请选择标签">
            <el-option v-for="(t,index) in tag_list" :key="t.id" :label="t.name" :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="blog_form.article_type" placeholder="是否公开">
            <el-option v-for="item in article_type_list" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attr_dialog = false">取 消</el-button>
        <el-button type="primary" @click="handle_attr_submit()" :loading="confirmBusy" v-text="confirmButtonText"></el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑页面" :visible.sync="blog_dialog" :append-to-body="true" :fullscreen="true" :show-close="true"
      :style="{'max-height':screen_hight}" class="outer" :destroy-on-close="true">
      <mavon-editor v-model="blog_form_2.text" :code_style="code_style" :ishljs="true" :externalLink="externalLink"
        :style="{'min-height':screen_hight}" @save="save" />
    </el-dialog>


    <el-dialog title="新增博客" :visible.sync="new_blog_dialog" :append-to-body="true" width="30%" :show-close="false"
      :destroy-on-close="true" :close-on-click-modal="false">
      <el-form :model="blog_form_3">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="blog_form_3.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="blog_form_3.type" placeholder="请选择类型">
            <el-option v-for="(t,index) in type_list" :key="t.id" :label="t.name" :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" :label-width="formLabelWidth">
          <el-select v-model="blog_form_3.tag" multiple collapse-tags placeholder="请选择标签">
            <el-option v-for="(t,index) in tag_list" :key="t.id" :label="t.name" :value="t.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="blog_form_3.article_type" placeholder="是否公开">
            <el-option v-for="item in article_type_list" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="new_blog_dialog = false">取 消</el-button>
        <el-button type="primary" @click="new_blog_text = true">添加文本</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑页面" :visible.sync="new_blog_text" :append-to-body="true" :fullscreen="true" :show-close="true"
      :style="{'max-height':screen_hight}" class="outer" :close-on-click-modal="false" :destroy-on-close="true">
      <mavon-editor v-model="blog_form_3.text" :code_style="code_style" :ishljs="true" :externalLink="externalLink"
        :style="{'min-height':screen_hight}" @save="handle_new_blog_submit" />
    </el-dialog>
  </div>
</template>

<script>
  import {
    getBlogList,
    getBlogTotal,
    get_tags,
    update_blog_attr,
    get_detail,
    update_blog_text,
    delete_blog,
    get_type_list,
    add_new_blog,
  } from "../../restful/index.js"
  export default {
    name: "blog_management",
    data() {
      return {
        blog_tables: [],
        offset: 0,
        tag_list: [],
        type_list: [],
        article_type_list: [{
          "value": 1,
          "label": "公开"
        }, {
          "value": 2,
          "label": "私密"
        }],
        total_num: null,

        attr_dialog: false,
        formLabelWidth: '80px',
        confirmButtonText: "确定",
        confirmBusy: false,
        blog_form: {
          index: "",
          id: "",
          title: "",
          type: 0,
          tag: [],
          article_type: 0,
        },

        blog_dialog: false,
        code_style: 'atom-one-dark',
        blog_form_2: {
          id: "",
          text: "",
        },

        new_blog_dialog: false,
        new_blog_text: false,
        blog_form_3: {
          title: "",
          type: null,
          tag: [],
          article_type: null,
          text: "",
        },
        externalLink: {
          markdown_css: function() {
            // 这是你的markdown css文件路径
            return '/markdown/github-markdown.min.css';
          },
          hljs_js: function() {
            // 这是你的hljs文件路径
            return '/highlightjs/highlight.min.js';
          },
          hljs_css: function(css) {
            // 这是你的代码高亮配色文件路径
            return '/highlightjs/styles/' + css + '.min.css';
          },
          hljs_lang: function(lang) {
            // 这是你的代码高亮语言解析路径
            return '/highlightjs/languages/' + lang + '.min.js';
          }
        },
      }
    },
    computed: {
      screen_hight: function() {
        return (document.body.clientHeight || document.documentElement.clientHeight) + 'px';
      }
    },
    created() {
      getBlogList(0, 10).then((response) => {
        this.blog_tables = this.blog_tables.concat(response.data.data);
      });
      getBlogTotal().then((response) => {
        this.total_num = parseInt(response.data.data);
      });
      get_tags().then((response) => {
        this.tag_list = this.tag_list.concat(response.data.data);
      });
      get_type_list().then((response) => {
        this.type_list = response.data.data;
      });
    },
    methods: {
      current_page(cur_page) {
        // 第一种情况 请求开始的索引位置小于blog_tables，但不再请求
        if ((cur_page - 1) * 10 < this.blog_tables.length) {
          this.offset = (cur_page - 1) * 10
        }
        //第二种情况 请求开始的索引位置大于blog_tables，请求
        else if ((cur_page - 1) * 10 >= this.blog_tables.length) {
          getBlogList((cur_page - 1) * 10, 10).then((response) => {
            this.blog_tables = this.blog_tables.concat(response.data.data);
            this.offset = (cur_page - 1) * 10;
          });
        }
      },

      handle_attr(index, row) {
        // console.log(index, row);
        this.attr_dialog = true;
        this.blog_form.index = index;
        this.blog_form.id = row.id;
        this.blog_form.title = row.title;
        this.blog_form.article_type = row.article_type;
        this.blog_form.type = row.type;
        this.blog_form.tag = [];
        for (let i = 0; i < row.tag.length; i++) {
          this.blog_form.tag.push(row.tag[i].id);
        }
      },
      handle_attr_submit() {
        this.confirmButtonText = "请求中";
        this.confirmBusy = true;
        update_blog_attr(this.blog_form).then((response) => {
          let index = this.blog_form.index + this.offset;
          this.blog_tables[index].title = this.blog_form.title;
          this.blog_tables[index].type = this.blog_form.type;
          this.blog_tables[index].article_type = this.blog_form.article_type;

          // console.log("原本的", this.blog_tables[index].tag);
          this.blog_tables[index].tag = []
          for (let i = 0; i < this.tag_list.length; i++) {
            if (this.blog_form.tag.indexOf(this.tag_list[i].id) != -1) {
              this.blog_tables[index].tag.push(this.tag_list[i]);
            }
          }
          // console.log("现在应该有的", this.blog_form.tag);
          // console.log("请求成功之后的",this.blog_tables[index].tag);
          this.attr_dialog = false;
          this.confirmButtonText = "确定";
          this.confirmBusy = false;
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        })
      },

      handle_text(index, row) {
        get_detail(row.id).then((response) => {
          this.blog_form_2.text = response.data.data.text;
          this.blog_form_2.id = response.data.data.id;
          this.blog_dialog = true;
        });
      },
      save(value, render) {
        update_blog_text(this.blog_form_2).then((response) => {
          if (response.data.data == null || response.data.data == "") {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
          }
        });
      },

      handle_Delete(index, row) {
        let _self = this;
        this.$confirm('将博客取消公开, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_blog(row.id).then((response) => {
            if (response.data.code == "1000") {
              _self.$message({
                type: 'success',
                message: '博客已取消公开!'
              });
              _self.blog_tables[this.offset + index].article_type = 2
            }
          });
        }).catch(() => {
          _self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      handle_new_blog_submit() {
        add_new_blog(this.blog_form_3).then((response) => {
          if (response.data.code == "1000") {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.total_num += 1;
            if(this.blog_tables.length + 1 >= this.total_num){
              let arr = [];
              for (let i = 0; i < this.tag_list.length; i++) {
                if (this.blog_form_3.tag.indexOf(this.tag_list[i].id) != -1) {
                  arr.push(this.tag_list[i]);
                }
              }
              this.blog_tables.push({
                "id": response.data.data,
                "title": this.blog_form_3.title,
                "type": this.blog_form_3.type,
                "view_times": 0,
                "likes": 0,
                "updated_time": new Date().toISOString().substring(0, 10),
                "article_type": this.blog_form_3.article_type,
                "tag": arr,
              });
            }
          };
          this.blog_form_3 = {
              title: "",
              type: null,
              tag: [],
              article_type: null,
              text: "",
            },
            this.new_blog_text = false;
          this.new_blog_dialog = false;
        });
      },

      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
          url: 'server url',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          $vm.$img2Url(pos, url);
        })
      }
    },
  }
</script>

<style scoped>
  .source {
    padding: 24px;
    border-bottom: solid 1px #e6e6e6;
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

  .el-dialog .header {
    padding: 0px;
  }

  .el-pagination {
    padding: 24px;
  }
</style>
