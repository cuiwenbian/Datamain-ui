<template>
	<div>
		<div class="footer ">
			<div class="content">
				<div><img class="logo_foot" src="../assets/image/loog_foot.png"></div>
				<div>苏ICP备14013035号-11 苏公网安备 浙公网安备 33010602010063号</div>
				<div>联系电话：400-1234-567 联系邮箱：111@xjyt.com</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Foot',
	
};
</script>

<style scoped="scoped">
	.footer {
		width: 100%;
		height: 182px;
		background-color: #202020;
	}
	
	.footer>.content {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.footer>div {
		color: #FFFFFF;
	}
	
	.logo_foot {
		width: 172px;
		height: 68px;
		display: block;
	}
</style>
