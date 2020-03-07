<template>
<div class="loading">
	<img src="../../static/images/loading.gif"  />
</div>
</template>
 
<script>
export default {
  name: 'Loading'
}
</script>
 
<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background:#fff;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  }
.loading img{
	position: absolute;
	top:45%;
	left:50%;
	width: 50px;
	height:50px;
}
</style>
