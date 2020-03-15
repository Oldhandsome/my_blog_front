import Axios from "axios"
import store from '../store/index.js'

Axios.defaults.baseURL = "http://127.0.0.1:8000/"

export const get_token = () => {
  Axios.request({
    url: store.state.api_obj.token_url,
    method: "GET",
    params: {

    }
  }).then(function(response) {
    if (response.data.code == 1000)
      sessionStorage.setItem("X-TOKEN", response.data.data);
  })
};
export const getBlogTotal = async () => {
  return await Axios.request({
    url: store.state.api_obj.bloglist,
    method: "GET",
    params: {}
  });
};
export const getBlogList = async (offset, limit) => {
  let email = sessionStorage.getItem("email");
  if(email == null || email == "")
    email = "over_flowing@163.com"
  return await Axios.request({
    url: store.state.api_obj.bloglist,
    method: "POST",
    params: {
      'o': offset,
      'l': limit,
      'email': email,
    },
  });
};
export const get_detail = async (blog_id) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "GET",
    params: {
      id: blog_id,
    }
  });
};
export const get_tags = async () => {
  let email = sessionStorage.getItem("email", "over_flowing@163.com");
  return await Axios.request({
    url: store.state.api_obj.taglist,
    method: "GET",
    params: {
      "email": email
    }
  });
};
export const ge_brief_blogs_by_tag = async (tag_id) => {
  return await Axios.request({
    url: store.state.api_obj.brief_blog_by_tag + tag_id + "/",
    method: "GET",
    params: {}
  });
};

export const get_search_result = async (keyword, position) => {
  return await Axios.request({
    url: store.state.api_obj.search_result,
    method: "POST",
    params: {},
    data: {
      "keyword": keyword,
      "position": position
    }
  });
};
export const get_suggestion = async (word) => {
  return await Axios.request({
    url: store.state.api_obj.search_result,
    method: "GET",
    params: {
      "word": word
    }
  });
};
export const get_validation_code = async () => {
  return await Axios.request({
    url: store.state.api_obj.validation_code,
    method: "GET",
    params: {},
  });
};
export const authenticate_user = async (id, email, password, validate_code) => {
  return await Axios.request({
    url: store.state.api_obj.authentication,
    method: "POST",
    params: {},
    data: {
      "id": id,
      "email": email,
      "pwd": password,
      "validate_code": validate_code
    }
  });
};

export const update_blog_attr = async (attr_form) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "PUT",
    params: {},
    data: {
      type:attr_form.type,
      id: attr_form.id,
      title: attr_form.title,
      tag_list: attr_form.tag,
    }
  });
};
export const update_blog_text = async (blog) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "PUT",
    params: {},
    data: {
      type:blog.type,
      id: blog.id,
      text:blog.text,
    }
  });
};
export const delete_blog = async (blog_id) =>{
  return await Axios.request({
    url:store.state.api_obj.detail,
    method:"DELETE",
    params:{
      id:blog_id,
    },
  });
};
