import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import con from './views/con2'
import theme from './views/theme'
Vue.use( Router )

/* 页面路由， home, con, theme 场景界面跳转 */
const router = new Router( {
	mode: 'hash',
	routes: [
		{
			path: '/',
			component: home,
			name: 'home'
		},
		{
			path: '/con',
			component: con,
			name: 'con'
		},
		{
			path: '/theme',
			component: theme,
			name: 'theme'
		},
		{
			path: '*',
			redirect: '/'
		}
	]
} )
export default router
