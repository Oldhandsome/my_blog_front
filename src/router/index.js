import Vue from 'vue'
import Router from 'vue-router'
import homepage from "../components/homepage.vue"
import blogs from "../components/blogs.vue"
import detail from "../components/detail.vue"
import tag from '../components/tag.vue'
import my_search from "../components/search.vue"
import management from "../components/management.vue"
import blog_management from "../components/child/blog_management.vue"
import tag_management from "../components/child/tag_management.vue"
import type_management from "../components/child/type_management.vue"
import user_info_management from "../components/child/user_info_management.vue"

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'homepage',
      component: homepage,
    },
    {
      path: "/blogs",
      name: "blogs",
      component: blogs,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail,
    },
    {
      path: "/tag",
      name: 'tag',
      component: tag,
    },
    {
      path: "/search",
      name: "my_search",
      component: my_search,
    },
    {
      path: "/management",
      name: "management",
      component: management,
      redirect:{name:"user_info_management"},
      children:[
      	{
      		path:"/management/blog",
      		name:"blog_management",
      		component:blog_management,
      	},
      	{
      		path:'/management/tag',
      		name:"tag_management",
      		component:tag_management,
      	},
      	{
      		path:"/management/user_info",
      		name:"user_info_management",
      		component:user_info_management
      	},
        {
        	path:"/management/type_info",
        	name:"type_management",
        	component:type_management
        },
        
      ],
    },
  ]
})
