# 我的博客->前端项目
前端是我参考另一个人的博客（感觉很简洁）

- 文件目录结构

```
——| vue03 # 项目
——|——| src 
——|——|——| components
——|——|——|——|——| child 
——|——|——|——|——| blog_management.vue 	# management的子组件 博客管理组件
——|——|——|——|——| tag_management.vue 	# management的子组件 标签管理组件
——|——|——|——|——| type_management.vue 	# management的子组件 类型管理组件
——|——|——|——|——| user_info_management.vue 	# management的子组件 用户信息管理组件
——|——|——|——|——| util
——|——|——|——|——|——| blogs_to_tag.vue 	# 将标签页中的一个标签以及所显示的博客进行了组件化，用于查看属于同一个标签下的全部博客。
——|——|——|——|——|——| my_header.vue 	# 将页头组件化，方便其他组件都能调用该页头。
——|——|——|——| blogs.vue 	# 博客浏览页面
——|——|——|——| deatil.vue 	# 博客具体详情页
——|——|——|——| homepage.vue 	# 首页
——|——|——|——| management.vue 	# 管理页面（融合了上述的四个子组件）
——|——|——|——| search.vue 	# 搜索页面
——|——|——|——| tag.vue 	# 标签页
——|——|——| restful
——|——|——|——| index.js 	# Axios各种请求的方法 
——|——|——| router
——|——|——|——| index.js 	# vue组件之间的跳转页面
——|——|——| store
——|——|——|——| index.js 	# 存放后端API接口
——|——|——| App.vue 	# app.vue
——|——|——| main.js 	# main.js
——|——| static
——|——|——| css 	# 存放公用的css
——|——|——| images						
——|——|——| js
——|——| index.html 	# 单页面应用之index.html
```

- 博客浏览页面 （blogs.vue）

  调用了VUE的transition-group组件和infinite-loading组件。当页面拉到一定低时，前端便会向后端请求更多的博客数据，此处加上了一个动态效果，避免过于直接。

- 博客详情页（detail.vue）

  调用highlight.js和marked组件，现实博客的正文内容。

- 搜索博客页面（search.vue)

  首先在输入框输入文字（仅限英文）会给出些许的意见，点击意见后搜索或是直接搜索都将返回符合关键字的博客和符合关键字的博客数量。而后端将博客的标题和正文都放入ElasticSearch的blog（使用IK分析器）索引中，因此当输入关键字后，能返回符合关键字的博客，缺点是只能返回符合某个特定关键字的文章（例如：python他就会返回符合的博客，但pyth就会返回空的列表）

- 标签页（tag.vue）

  标签页会列出当前所有的标签，以及标签所对应的博客。（由于一篇博客对应多个标签，因此可能不同的标签会重复相同的博客）并且将标签进行了组件化（因为不同的标签有不同的博客，因此会根据标签的id请求后端）。

- 博客管理页面 (blog_management.vue)

  在登录之后，管理员便可进入该页面（management.vue）对自己的博客进行管理（增删改查）（在线编辑器是mavon-editor，但还没实现插入图片的功能)（其他的类似的3个子组件就不再做介绍了）

- 缺点

  由于对前端的知识不是很了解，没有将项目做成响应式的。
  
