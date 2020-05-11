//抽离路由模块
import VueRouter from 'vue-router'

//导入对应路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import photoList from './components/photos/PhotoList.vue'
import photoInfo from './components/photos/PhotoInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComment from './components/goods/goodsComment.vue'

var router = new VueRouter({
	routes:[//配置路由规则
		{path:'/',redirect:'/home'},//路由重定向,自动打开首页
		{path:'/home',component:HomeContainer},
		{path:'/member',component:MemberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
		{path:'/home/newsList',component:newsList},
		{path:'/home/newsInfo/:id',component:newsInfo},
		{path:'/home/photoList',component:photoList},
		{path:'/home/photoInfo/:id',component:photoInfo},
		{path:'/home/goodsList',component:goodsList},
		{path:'/home/goodsInfo/:id',component:goodsInfo,name:'goodsInfo'},//为路由命名
		{path:'/home/goodsDesc/:id',component:goodsDesc},
		{path:'/home/goodsComment/:id',component:goodsComment},
		// {path:'/carousel',component:carousel},
		
	],
	// linkActiveClass:'van-tabbar-item--active'//覆盖默认路由高亮类router-link-active
})
//把路由对象暴露出去
export default router