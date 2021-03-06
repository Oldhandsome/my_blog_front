import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		api_obj:{
			bloglist:"/app01/bloglist/",
			likelist: "/app01/likelist/",
			detail:"/app01/blog/",
      type_list:"/app01/type/",
			taglist:"/app01/tags/",
			brief_blog_by_tag:"/app01/tag/",
      search_result:"/app01/search/",
      user:"/app01/user/",
      validation_code:"/app01/get_validate_code/",
      blog_illustration:"/app01/blog/img/",
		},
	},
})
