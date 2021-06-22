import Vue from "vue";
import VueRouter from "vue-router";

/*引入页面组件配置跳转路由*/
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

/*安装插件*/
Vue.use(VueRouter)

//创建路由对象
const routes = [
	/*配置跳转路由*/
	{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/profile',
		component: Profile
	}
]

const router = new VueRouter({
	routes,
	/*去掉链接的#号*/
	mode:'history'
})
/*导出*/
export default router