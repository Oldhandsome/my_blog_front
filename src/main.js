import Vue from 'vue'
import App from './App'
import router from "./router/index.js"
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading,{})

import {get_token} from "./restful/index.js"
import axios from "axios"
import store from './store/index.js'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


axios.interceptors.request.use(function(config){
	// console.log(config)
	// if(sessionStorage.getItem("X-TOKEN"))
  // config.params['X-TOKEN'] = sessionStorage.getItem("X-TOKEN")
	return config
},function(error){
	console.log(error);
});

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		const { config, response: { data, status }} = error;
    if(parseInt(status) == 403 && parseInt(data.code) == 1002)
    {
      // 若1003 之前的token 过期了，重新设置
      sessionStorage.setItem("A-TOKEN", data.data);
      config.params['A-TOKEN'] = data.data;
      return axios.request(config);
    }
		return Promise.reject(error)
	}
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
