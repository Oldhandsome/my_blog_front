<template>
  <div id="app">
	<transition name="fade">
       <loading v-show="this.$store.state.screen"></loading>
    </transition>
	<keep-alive>
        <router-view v-if="isRouterAlive"></router-view>
	</keep-alive>
  </div>
</template>

<script>
import loading from "./components/loading.vue"
export default {
	name: 'App',
	provide () {
	    return {
	      reload: this.reload,
	    }
	},
	data () {
	    return {
	      isRouterAlive: true,
	    }
	},
	methods:{
		reload() {
		      this.isRouterAlive = false;
		      this.$nextTick(function () {
		      this.isRouterAlive = true
			});
		},
	},
	components:{
		loading,
	}
}
</script>

<style scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0rem;
	padding: 0rem;
	min-height:37.5rem ;
	position: relative;
	z-index: 999;
	height: 100%;
	width: 100%;
}
</style>
