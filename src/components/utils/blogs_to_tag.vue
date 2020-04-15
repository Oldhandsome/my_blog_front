<template>
	<div>
		<transition-group name="list" tag="div">
		    <li v-for="(blog,index) in blogs" :key="blog.id">
		    	<p>
		    		<span class="time_span">{{blog.updated_time}}</span>
		    		&nbsp;&nbsp;&nbsp;
		    		<span  class="blog" @click="click_blog(blog.id);">{{blog.title}}</span>
		    	</p>
		    </li>
		</transition-group>
	</div>
</template>

<script>
	import {ge_brief_blogs_by_tag} from "../../restful/index.js"
	export default {
		name:"blogs_to_tag",
		props:{
			tag_id:Number,
		},
		data(){
			return{
				blogs:[],
			}
		},
		created(){
			ge_brief_blogs_by_tag(this.tag_id).then((response)=>{
				this.set_blogs(response.data);
			});
		},
		methods:{
			set_blogs(result){
				if(result.data && result.data.length > 0)
					this.blogs = result.data;
			},
			click_blog(blog_id){
				// this.$store.state.screen = true;
				this.$router.push({name:"detail",params:{id:blog_id}});
			},

		}
	}
</script>

<style scoped>
	div{
		display: inline-block;
		padding-bottom: 20px;
	}
	div>li{
		height:30px;
		line-height: 30px;
		font-size: 16px;
		font-weight: normal;
		list-style: none;
		position: relative;
	}
	.blog{
		cursor: pointer;
		transition: color .3s;
		-moz-transition: color .3s; /* Firefox 4 */
		-webkit-transition: color .3s; /* Safari 和 Chrome */
		-o-transition: color .3s; /* Opera */
	}
	.blog:hover{
		color:aquamarine
	}
	.time_span{
		font-size: 14px;
	}
	div>li>p::before{
		position: absolute;
		left: -27px;
		top:10px;
		content: '';
		width: 8px;
		height: 8px;
		background-color: navajowhite;
		border-radius: 50%;
	}

	.list-enter-active, .list-leave-active {
	  transition: all 1s;
	}
	.list-enter, .list-leave-to
	/* .list-leave-active for below version 2.1.8 */ {
	  opacity: 0;
	  transform: translateY(30px);
	}
</style>
