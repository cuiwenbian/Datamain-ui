<template>
	<div>
		<div class="banner2">
			<div class="content">
				<div class="banner_card">
					<div class="banner_card_left">
						<div class="banner_card_left_img"><img src="../assets/image/detail_img.png" alt="" /></div>
					</div>
					<div class="banner_card_right">
						<div class="de_infomation">
							<div class="de_info_list">
								<h3>{{ por.fileName }}</h3>
							</div>
							<div class="de_info_list info_list_desc">
								<div class="info_list_desc_i">
									<div>下载量： 2500</div>
									<div>上传时间 ：{{ formateDate(por.updatedtime) }}</div>
								</div>
								<div class="info_list_desc_i">
									<div>
										大小：
										<span>{{ getfilesize(por.size) }}</span>
									</div>
									<div>格式： MP4</div>
								</div>
							</div>
							<div class="de_info_list"><button class="down" type="button">全部下载</button></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content margin_top">
			<h2 class="margin">数据集简介</h2>
			<div class="text margin"><p>北京过热快递费居民半解吧v简单方便</p></div>
			<h2 class="margin">全部数据</h2>
			<div class="tables" style="margin-top: 28px;margin-bottom: 139px;">
				<ul class="table_head_Detail">
					<li style="width: 23%;">
						<!-- <img v-if="no_check" src="../assets/image/check.png" class="checked" @click="checkall" />
						<img v-else src="../assets/image/checked.png" class="checked" @click="checkall" /> -->
						文件名称
					</li>
					<li style="width: 35%;">文件CID</li>
					<li style="width: 13%;">文件大小</li>
					<li style="width: 19%;">上传日期</li>
					<li style="width: 10%;">操作</li>
				</ul>
				<ul class="table_list_Detail">
					<li style="width: 23%;" class="text_out">
						<!-- <div :class="'checked' + (item.checked ? ' si-radio-selected' : '')" @click="handleSelectRadio(item)"></div> -->
						{{ por.fileName }}
					</li>
					<li style="width: 35%;">{{ por.cid }}</li>
					<li style="width: 13%;">{{ getfilesize(por.size) }}</li>
					<li style="width: 19%;">{{ formateDate(por.updatedtime)  }}</li>
					<li style="width: 10%;">
						<span>检索</span>
						<span @click="down(por.fileName, por.cid)">下载</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { createPow } from '@textile/powergate-client';

/* async function exampleCode() {
	const host = 'http://61.155.145.6:6002'; // or whatever powergate instance you want
	const pow = createPow({ host });
	const authToken = '76b543ee-97df-4774-a1e4-3924a82e52a4';
	pow.setToken(authToken);
	// const { jobId } = await pow.ffs.pushStorageConfig('QmXZwYWno6n2o8Jp3fjR8NXWTE7mZ5KAoYefShc85pbHX9')
	// console.log(jobId)
	const bytes = await pow.ffs.get('QmRMacn6jaHBTWWTWQVuTdtwWgHzNiCokLhW7NcSXfdVt3');
	console.log("bytes")
	console.log(bytes);
	saveByteArray('album', bytes);
}

function saveByteArray(reportName, byte) {
	var blob = new Blob([byte], { type: 'application/txt' });
	console.log(blob);
	var link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	var fileName = reportName;
	link.download = fileName;
	link.click();
}
exampleCode(); */
export default {
	data: () => ({
		name: '数据集名称',
		total: 10, //总条目数
		pageSize: 5, //每页显示条目
		no_check: true,
		list_checked: true,
		selected: { id: '' },
		selection: [],
		files: [],
		por: '',
		cid: ''
	}),
	mounted() {
		this.files.map(val => {
			val.checked = false;
		});
		//console.log(this.files);
		try {
			this.files = localStorage.getItem('dataList');
			this.por = JSON.parse(this.files);
			this.cid = this.por.cid;
		} catch (error) {
			this.$router.push('/pool');
		}
		//console.log(this.por);
		//console.log(this.cid);
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
		checkall() {
			this.no_check = !this.no_check;
			if (this.no_check) {
				for (let i = 0; i < this.files.length; i++) {
					this.files[i].checked = false;
				}
			} else {
				for (let i = 0; i < this.files.length; i++) {
					this.files[i].checked = true;
				}
			}
		},
		handleSelectRadio(item) {
			item.checked = !item.checked;
			console.log(item.checked);
			console.log(this.files);
		},
		
		async down(reportName, cid) {
			console.log(cid);
			console.log(reportName);
			const host = 'http://61.155.145.6:6002'; // or whatever powergate instance you want
			const pow = createPow({ host });
			const authToken = '76b543ee-97df-4774-a1e4-3924a82e52a4';
			pow.setToken(authToken);
			// const { jobId } = await pow.ffs.pushStorageConfig('QmXZwYWno6n2o8Jp3fjR8NXWTE7mZ5KAoYefShc85pbHX9')
			// console.log(jobId)
			const bytes = await pow.ffs.get('QmRMacn6jaHBTWWTWQVuTdtwWgHzNiCokLhW7NcSXfdVt3');
			// const bytes = await pow.ffs.get(cid);
			console.log(bytes);
			this.saveByteArray(reportName, bytes);
		},
		saveByteArray(reportName, byte) {
			var blob = new Blob([byte]);
			console.log(blob);
			var link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			var fileName = reportName;
			link.download = fileName;
			link.click();
		}
	}
};
</script>

<style>
	@import url("../assets/css/index.css");
</style>
