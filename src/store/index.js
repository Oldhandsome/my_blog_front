import Vuex from "vuex"
import Vue from "vue"
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		api_obj:{
			token_url:"/app01/get_token/",
			bloglist:"/app01/bloglist/",
			likelist: "/app01/likelist/",
			detail:"/app01/blog/",
			taglist:"/app01/tags/",
			brief_blog_by_tag:"/app01/tag/",
      search_result:"/app01/search/",
      suggestion:"/app01/suggestion/",
      authentication:"/app01/authenticate/",
		},
		screen:false,
	},
	
})