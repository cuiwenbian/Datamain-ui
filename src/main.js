import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from "axios";
Vue.config.productionTip = false
Vue.prototype.$http = Axios;
// Vue.prototype.url='http://192.168.1.165:8080/v1/iso'; 
Vue.prototype.url = '/v1/iso';
// Vue.prototype.url='http://t.api.ipcn.xyz/';
Vue.use(ElementUI);
new Vue({
	render: h => h(App),
	router
}).$mount('#app')
