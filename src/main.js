import Vue from 'vue'
import App from './App'
import router from "./router/index.js"
Vue.config.productionTip = false
/* eslint-disable no-new */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading,{})

import {get_token} from "./restful/index.js"
import axios from "axios"
import store from './store/index.js'
axios.interceptors.request.use(function(config){
	// store.state.isShow=true; //在请求发出之前进行一些操作
	// console.log(config)
	if(sessionStorage.getItem("X-TOKEN"))
		config.params['X-TOKEN'] = sessionStorage.getItem("X-TOKEN")
	return config
},function(error){
	console.log(error);
});

axios.interceptors.response.use(
	// store.state.isShow=false;//在这里对返回的数据进行处理
	response => {
		if(response.data.code != 1000)
			this.$message.error(response.data.message);
		return response
	},
	error => {
		if(error.response.data.code == "1003"){
			get_token();
			alert('请重新刷新网页!!!');
		}
		return Promise.reject(error)
	}
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
