<template>
	<div>
		<div class="banner">
			<div class="content">
				<div class="banner_title">
					<h2>欢迎使用 Data Main</h2>
					<h4>为全球提供免费、优势的数据资源，为人们提供专业的数据信息交流平台。</h4>
				</div>
				<div class="banner_tight_img"><img src="../assets/image/banner_imgs.png" /></div>
			</div>
		</div>
		<div class="main_nav">
			<ul>
				<li v-for="(item, index) in current_tab_nav" :key="index" :class="{ tab_nav_cur: current_tab_nav_id === index }" @click="change_curr(index)">{{ item }}</li>
			</ul>
		</div>
		<div class="container content" v-if="current_tab_nav_id === 0">
			<div class="container_title">
				<div class="option_ls sea">
					<input class="search" type="text" placeholder="请输入关键词" v-model="fname" />
					<img src="../assets/image/search.png" class="search_img" @click="search" />
				</div>
				<div class="option_ls switchs">
					<div class="method_sort" :class="{ method_sort_active: current === 0 }" @click="category(0)">最新</div>
					<div class="method_sort" :class="{ method_sort_active: current === 1 }" @click="category(1)">热门</div>
				</div>
			</div>
			<div class="tab_sides">
				<div class="tab_sides_left">
					<ul :class="{ tabIndex: current_tab === index }" v-for="(item, index) in the_mirror" :key="index" @click="change_cur(item, index)">
						<li>{{ item }}</li>
					</ul>
				</div>
				<div class="tables_index">
					<ul class="table_head">
						<li style="width:45%;">数据集名称</li>
						<li style="width:25%;">大小</li>
						<li style="width:30%;">上传日期</li>
						<!-- <li>下载次数</li> -->
					</ul>
					<ul class="table_list" v-for="(item, index) in table_list" :key="index" @click="go(item)">
						<li style="width:45%;">{{ item.fileName }}</li>
						<li style="width:25%;">{{ getfilesize(item.size) }}</li>
						<li style="width:30%;">{{ formateDate(item.updatedtime) }}</li>
						<!-- <li>{{item.numbers}}</li> -->
					</ul>
				</div>
			</div>
		</div>
		<div class="container content" v-if="current_tab_nav_id === 1">ai</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		current_tab_nav_id: 0,
		current_tab_nav: ['OS镜像', 'AI数据集'],
		change: ['最新', '热门'],
		current: 0,
		alldata: [],
		the_mirror: [],
		current_tab: 0,
		value: '',
		table_list: [],
		fname: '',
		ass: [
			{
				fileName: 'guoqing',
				size: '120'
			},
			{
				fileName: 'zhongqiu',
				size: '190'
			},
			{
				fileName: 'shuangshiyi',
				size: '650'
			}
		]
	}),
	mounted() {
		this.getData();
		// this.change_cur(0);
	},
	methods: {
		getfilesize(size) {
			//把字节转换成正常文件大小
			if (!size) return '';
			var num = 1024.0; //byte
			if (size < num) return size + 'B';
			if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'KB'; //kb
			if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + 'MB'; //M
			if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
			return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
		},
		formateDate(datetime) {
			function addDateZero(num) {
				return num < 10 ? '0' + num : num;
			}
			let d = new Date(datetime);
			let formatdatetime =
				d.getFullYear() +
				'-' +
				addDateZero(d.getMonth() + 1) +
				'-' +
				addDateZero(d.getDate()) +
				' ' +
				addDateZero(d.getHours()) +
				':' +
				addDateZero(d.getMinutes()) +
				':' +
				addDateZero(d.getSeconds());
			return formatdatetime;
		},
		go(item) {
			localStorage.setItem('dataList', JSON.stringify(item));
			this.$router.push('/detail');
		},
		change_curr(index) {
			this.current_tab_nav_id = index;
		},
		category(index) {
			this.current = index;
		},
		change_cur(item, index) {
			var that = this;
			console.log(item);
			this.current_tab = index;
			for (var key in this.alldata) {
				if (key == item) {
					that.table_list = this.alldata[key];
					console.log(that.table_list);
				}
			}
		},
		search() {
			var that = this;
			if (!this.fname) {
				this.$message('请输入关键词');
				return;
			}
			console.log(that.table_list);
			const skus = new Array();
			that.table_list.map(item => {
				console.log(item.fileName);
				console.log(that.fname);
				if (item.fileName == that.fname || item.cid == that.fname) {
					skus.push({
						...item
					});
				}
			});
			that.table_list = skus;
			console.log(skus);
			return skus;
		},
		/* async loadMore() {
				await this.getData();
				console.log(this.the_mirror[0]);

			}, */
		getData() {
			var that = this;
			this.$http
				.get(this.url)
				.then(response => {
					console.log(response);
					that.alldata = response.data;
					var arr = [];
					for (var key in response.data) {
						console.log(key);
						arr.push(key);
						that.the_mirror = arr;
						console.log(that.the_mirror);
						console.log(that.the_mirror[0]);
						that.table_list = that.alldata[that.the_mirror[0]];
					}
				})
				.catch(() => {});
		}
	}
};
</script>

<style>
@import url('../assets/css/index.css');
</style>
