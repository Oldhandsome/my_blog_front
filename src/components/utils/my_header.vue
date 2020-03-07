<template>
	<div style="margin: 0;padding: 0;">
		<el-header style="width: 100%;height: 70px;">
			  <el-row style="width:100%;padding-top: 20px;float: right;">
				  <a style="margin: 0;padding: 0;float: inherit;cursor: pointer;" @click="drawer = true">
					  <el-avatar src="../../../static/images/header_1.jpg"
					  			style="float: inherit;" :size='50'>
					  </el-avatar>
				  </a>
				  <div class="toolbar">
					  <transition name="slide-fade">
						  <div class="tool-items" v-if="toolbar">
							<span class="tool-item" @click="homepage()">首页</span>
							<span class="tool-item" @click="tag()">标签</span>
							<span class="tool-item" @click="search()">搜索</span>
							<span class="tool-item" >关于</span>
						  </div>
					  </transition>
					  <span @click="show_toolbar();" class="tool-item">更多</span>
				  </div>
			  </el-row>
		</el-header>
		<el-drawer
		  :visible.sync="drawer"
		  direction="rtl"
		  title="个人介绍"
		  :append-to-body="true"
		  :modal-append-to-body="true"
		  :show-close="false"
		  :before-close="handleClose">
		  <span>我来啦!</span>
		</el-drawer>
	</div>
</template>

<script>
	export default{
		name:"my_header",
		data(){
			return{
				toolbar:false,
				drawer: false,
			}
		},
		methods:{
			handleClose(done) {
			        this.$confirm('确认关闭？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			},
			show_toolbar(){
				this.toolbar = !this.toolbar;
			},
			homepage(){
				this.$router.push({name:"homepage"});
			},
			tag(){
				// this.$store.state.screen = true;
				this.$router.push({name:'tag'});
			},
			search(){
				this.$router.push({name:'my_search'});	
			},
		}
	}
</script>

<style>
	.toolbar{
		position: relative;
		margin: 10px;
		padding: 0;
		height: 30px;
		border-radius: 20px;
		vertical-align: middle;
		display:table-cell;
		float: right;
	}
	.tool-items{
		height: 30px; 
		float: left;
		display: block;
	}
	.tool-item{
		margin:0 5px 0 5px;
		font-size:14px;
		border-radius:50%;
		display: inline-block;
		line-height:30px;
		height: 30px;
		width: 30px;
		background-color: white;
		cursor: pointer;
	}
	
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  transform: translateX(50px);
	  opacity: 0;
	}
	.tool-items .tool-item:hover{
		transition: -moz-transform 2s ease-out 0s;
		box-shadow: 0 0 3px black;
	}
</style>
