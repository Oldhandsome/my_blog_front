<template>
	<div id="box">
		<p style="height: 100px;"><img src="../../static/images/header_1.jpg" /></p>
		<router-link :to="{path:'blogs'}">博客</router-link>
	</div>
</template>

<script>
	import {get_token} from '../restful/index.js'
	import store from "../store/index.js"
	export default{
		name:'homepage',
		mounted(){
			get_token();
		},
		beforeRouteLeave:(to,from,next) =>{
			// store.state.screen = true;
			setTimeout(()=>{next();},500);
		},
	}
</script>

<style scoped>
	#box{
		width: 300px;
		height: 300px;
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	#box img{
		width: 100px;
		height: 100px;
		border-radius: 16px;
		border: none;
	}
</style>
