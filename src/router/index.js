import Vue from 'vue'
import Router from 'vue-router'
import homepage from "../components/homepage.vue"
import blogs from "../components/blogs.vue"
import detail from "../components/detail.vue"
import tag from '../components/tag.vue'
import my_search from "../components/search.vue"
import editor from "../components/editor.vue"
Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
	{
		path: '/',
		name: 'homepage',
		component:homepage,
	},
	{
		path:"/blogs",
		name:"blogs",
		component:blogs,
	},
	{
		path:'/detail/:id',
		name:'detail',
		component:detail,
	},
	{
		path:"/tag",
		name:'tag',
		component:tag,
	},
	{
		path:"/search",
		name:"my_search",
		component:my_search,
	},
  {
    path:"/editor",
    name:"editor",
    component:editor,
  },
	]
})
