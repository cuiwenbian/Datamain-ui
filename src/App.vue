<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HelloWorld />
	<router-view></router-view>
	<Foot />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Foot from './components/foot.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
	Foot
  }
}
</script>

<style>

* {
	margin: 0;
	padding: 0;
}

ol,
ul {
	list-style: none
}

body {
	color: #3d4c63;
	background-image: url(assets/image/body_bj.png);
	background-size: 100% 100%;
	font: 14px/1.5 "Microsoft Yahei", Arial, sans-serif;
	outline: 0
}

a {
	color: #333;
	text-decoration: none
}

a:hover {
	color: inherit
}

h2,
p {
	display: block;
}

input,
select,
option {
	outline: none;
	border: 1px solid #DCDCDC;
}

.margin {
	margin: 20px 0;
}

.content {
	width: 63%;
	/* height: auto; */
	margin: 0 auto;
}
.el-select:hover .el-input__inner {
	border-radius: 20px;
	border: 1px solid #DCDCDC;
}
.el-select .el-input__inner {
	border-radius: 20px;
	border: 1px solid #DCDCDC;
}
</style>
