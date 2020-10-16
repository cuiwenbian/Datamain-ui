<template>
	<div>
		<div class="nav">
			<div class="nav_logo"><img src="../assets/image/logo.png" /></div>
			<div class="nav_per">
				<img src="../assets/image/avator.png" alt="" />
				<p>EN</p>
				<p>中文</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
		msg: String
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
	width: 100%;
	height: 100px;
	background-color: #ffffff;
	padding: 0 40px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.nav_logo {
	width: 172px;
	height: 68px;
}
.nav_logo > img {
	width: 100%;
	height: 100%;
	display: block;
}
.nav_per {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.nav_per > img {
	width: 46px;
	height: 46px;
	display: block;
	margin-right: 25px;
}

.nav_per > p {
	color: #34404e;
	font-size: 14px;
	margin-right: 14px;
	/* line-height: 100px; */
}
</style>
