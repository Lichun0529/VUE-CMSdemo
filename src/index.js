
//入口文件
import Vue from 'vue'

//导入axios
import axios from 'axios'
//请求地址默认根域名
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
//qs插件
import qs from 'qs'
Vue.prototype.qs = qs
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

//Vant组件库
import { Tabbar, TabbarItem, Tab, Tabs , Card ,Swipe, SwipeItem ,Lazyload ,  Checkbox, CheckboxGroup } from 'vant';
Vue.use(Tabbar).use(TabbarItem);//底部tabbar
Vue.use(Tab).use(Tabs);//标签栏
Vue.use(Card);//卡片
Vue.use(Swipe);//轮播图
Vue.use(SwipeItem);//轮播图
Vue.use(Lazyload);//图片懒加载
Vue.use(Checkbox);//复选框
Vue.use(CheckboxGroup);//复选框

import 'mint-ui/lib/style.css'

// 1.1导入路由的包
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter);
// 1.3导入自己的router.js路由模块
import router from './router.js'

//导入App根组件
import app from './App.vue'

//导入MUI中的样式
import '../lib/MUI/css/mui.min.css'
import '../lib/MUI/css/icons-extra.css'
import '../lib/MUI/fonts/mui-icons-extra.ttf'

//按需导入mint-ui组件
// import {Header, Swipe, SwipeItem, Lazyload, Button,Toast } from 'mint-ui';
// Vue.component(Header.name, Header);//顶部组件
// Vue.component(Swipe.name, Swipe);//轮播图
// Vue.component(SwipeItem.name, SwipeItem);//轮播图
// Vue.component(Button.name, Button);//按钮
// Vue.use(Lazyload);//图片懒加载
// Vue.use(Toast.name,Toast);

//全部导入mint-ui组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview);

//导入时间格式化插件
import moment from 'moment'
//自定义全局过滤器
Vue.filter('timeFilter',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})

import Vuex from 'vuex'//2.1引入vuex
Vue.use(Vuex)//2,2注册vuex
var localcart = JSON.parse(localStorage.getItem('cart') || '[]');
var store = new Vuex.Store({//2.3创建仓储对象
	state:{//可以理解为组件中的data,用于存储数据
		cart:localcart//将购物车中数据用数组存储
	},
	mutations:{//可以理解为组件中的methods,用于放置业务逻辑函数
		//点击加入购物车把商品信息保存到store中的cart中
		addtoCart(state,goodsinfo){
			//业务逻辑:对接收的值进行判断,如果cart中没有此商品,则把数据加入到cart中,若已有,则只加数量
			var flag = false;
			state.cart.some(item => {
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count);
					flag = true;
					return true
				}
			})
			if(!flag){
				state.cart.push(goodsinfo)
			}
			//数据储存到本地
			localStorage.setItem('cart',JSON.stringify(state.cart));
		},
		updategoodsCount(state,goodsCount){//改变商品数量
			state.cart.some(item =>{
				if(item.id == goodsCount.id){
					item.count = parseInt(goodsCount.count);
					return true
				}
			})
			localStorage.setItem('cart',JSON.stringify(state.cart));
			console.log(state.cart);
		},
		delGoods(state,id){//删除商品
			state.cart.some((item,i) => {
				if(item.id == id){
					state.cart.splice(i,1);
					return true
				}
			})
			localStorage.setItem('cart',JSON.stringify(state.cart));
		},
		updategoodsSelected(state,info){
			state.cart.some(item => {
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
			localStorage.setItem('cart',JSON.stringify(state.cart));
		}
	},
	getters:{
		getAllcount(state){
			var c = 0;
			state.cart.forEach(item =>{
				c += item.count;
			})
			return c
		},
		getCartcount(state){
			var count = {};
			state.cart.forEach(item =>{
				count[item.id] = item.count//拼接出一个格式为{id:count}的对象给购物车页面
			})
			return count
		},
		getgoodsSelected(state){
			var s = {}
			state.cart.forEach(item =>{
				s[item.id] = item.selected;
			})
			return s
		},
		getGoodsCountAndTotal(state){
			var s = {
				count:0,
				total:0
			};
			state.cart.forEach(item =>{
				if(item.selected){
					s.count += item.count;
					s.total += item.price * item.count;
				}
			})
			return s
		}
	}
})

var vm = new Vue({
	el:'#app',
	data:{},
	created(){},
	methods:{},
	render:c =>c(app),
	router, //1.4挂载路由对象到VM实例
	store//2.4挂载仓储对象到VM实例
})