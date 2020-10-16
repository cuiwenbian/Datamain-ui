import Vue from 'vue';
import Router from 'vue-router';
const Index = () => import( /* webpackChunkName: "index" */ '@/view/index');
const Detail = () => import( /* webpackChunkName: "index" */ '@/view/detail');


Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '/detail',
			name: 'detail',
			component: Detail,
		},

	],
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})
