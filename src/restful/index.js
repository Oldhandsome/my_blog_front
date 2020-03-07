import Axios from "axios"
import store from '../store/index.js'

Axios.defaults.baseURL="http://127.0.0.1:8000/"

export const get_token = () => {
				Axios.request({
					url: store.state.api_obj.token_url,
					method:"GET",
					params:{

					}
				}).then(function(response){
					if(response.data.code == 1000)
						sessionStorage.setItem("X-TOKEN",response.data.data);
				})
			};
export const getBlogList = async (offset,limit) =>{
				return await Axios.request({
					url: store.state.api_obj.bloglist,
					method:"GET",
					params:{
						'o':offset,
						'l':limit,
					}
				});
			};
export const get_detail = async(blog_id) => {
			return await Axios.request({
				url:store.state.api_obj.detail+blog_id+"/",
				method:"GET",
				params:{}
			});
		};
export const get_tags = async () => {
			return await Axios.request({
				url:store.state.api_obj.taglist,
				method:"GET",
				params:{}
			});
		};
export const ge_brief_blogs_by_tag = async(tag_id) => {
			return await Axios.request({
				url:store.state.api_obj.brief_blog_by_tag+ tag_id +"/",
				method:"GET",
				params:{}
			});
		};

export const get_search_result = async(keyword, position) => {
			return await Axios.request({
				url:store.state.api_obj.search_result,
				method:"POST",
        params:{},
				data:{
          "keyword":keyword,
          "position":position
        }
			});
		};
