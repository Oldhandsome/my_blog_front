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
  if (email == null || email == "")
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
      email: email
    }
  });
};
export const ge_brief_blogs_by_tag = async (tag_id) => {
  return await Axios.request({
    url: store.state.api_obj.brief_blog_by_tag,
    method: "GET",
    params: {
      t_id: tag_id,
    }
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
export const get_type_list = async () => {
  return await Axios.request({
    url: store.state.api_obj.type_list,
    method: "GET",
    params: {},
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
    url: store.state.api_obj.user,
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
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN"),
    },
    data: {
      updated_type: 0,
      id: attr_form.id,
      title: attr_form.title,
      type: attr_form.type,
      tag_list: attr_form.tag,
      article_type: attr_form.article_type,
    }
  });
};
export const update_blog_text = async (blog) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "PUT",
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN"),
    },
    data: {
      updated_type: 1,
      id: blog.id,
      text: blog.text,
    }
  });
};
export const delete_blog = async (blog_id) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "DELETE",
    params: {
      id: blog_id,
      "A-TOKEN": sessionStorage.getItem("A-TOKEN"),
    },
  });
};

export const add_new_blog = async (new_blog) => {
  return await Axios.request({
    url: store.state.api_obj.detail,
    method: "POST",
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
    data: {
      title: new_blog.title,
      type: new_blog.type,
      tag_list: new_blog.tag,
      article_type: new_blog.article_type,
      // text: new_blog.text,
      user: parseInt(sessionStorage.getItem("uid")),
    }
  })
};
export const update_tag = async (tag) => {
  return await Axios.request({
    url: store.state.api_obj.brief_blog_by_tag,
    method: "PUT",
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
    data: {
      id: tag.id,
      name: tag.name,
      order: tag.order,
    }
  });
};
export const delete_tag = async (tag_id) => {
  return await Axios.request({
    url: store.state.api_obj.brief_blog_by_tag,
    method: "DELETE",
    params: {
      id: tag_id,
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
  });
};
export const add_new_tag = async (tag) => {
  return await Axios.request({
    url: store.state.api_obj.brief_blog_by_tag,
    method: "POST",
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
    data: {
      name: tag.name,
      order: parseInt(tag.order),
      user: parseInt(sessionStorage.getItem("uid")),
    }
  });
};
export const update_type = async (type) => {
  return await Axios.request({
    url: store.state.api_obj.type_list,
    method: "PUT",
    params: {
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
    data: {
      id: type.id,
      name: type.name,
    }
  });
};
export const delete_type = async (type_id) => {
  return await Axios.request({
    url: store.state.api_obj.type_list,
    method: "DELETE",
    params: {
      t_id: type_id,
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
  });
};
export const add_new_type = async (type) => {
  return await Axios.request({
    url: store.state.api_obj.type_list,
    method: "POST",
    params:{
      "A-TOKEN": sessionStorage.getItem("A-TOKEN")
    },
    data: {
      name: type.name,
    },
  });
};
export const get_user_info = async (email) =>{
  return await Axios.request({
    url:store.state.api_obj.user,
    method:"GET",
    params:{
      email:sessionStorage.getItem("email")
    },
  });
};
export const update_user_info = async (user) => {
  return await Axios.request({
    url:store.state.api_obj.user,
    method:"PUT",
    params:{
      "A-TOKEN":sessionStorage.getItem("A-TOKEN")
    },
    data:{
      email:sessionStorage.getItem("email"),
      username:user.username,
      self_introduce:user.self_introduce,
    },
  })
};
export const upload_blog_illustration = async (img) => {
    return await Axios.request({
      url:store.state.api_obj.blog_illustration,
      method:"POST",
      headers: { 'Content-Type': 'multipart/form-data' },
      params:{
        "A-TOKEN":sessionStorage.getItem("A-TOKEN")
      },
      data:img,
    })
};
export const delete_blog_illustration = async (img_path) =>{
  return await Axios.request({
    url:store.state.api_obj.blog_illustration,
    method:"DELETE",
    params:{
      "A-TOKEN":sessionStorage.getItem("A-TOKEN"),
    },
    data:{
      "img_path":img_path,
    }
  })
}
