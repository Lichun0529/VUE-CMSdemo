<template>
	<div class="app-container">
		
		<!-- 顶部 Header 区域 -->
		<mt-header fixed title="fixed top">
			<span slot="left" v-show="flag">
			    <mt-button @click="backButton" icon="back">返回</mt-button>
			</span>
		</mt-header>
		<!-- 中间 路由 router-view 区域 -->
		<transition >
			<router-view></router-view>
		</transition>
		<!-- 底部 Tabbar 区域 -->
			<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o">
				<router-link to="/home">主页</router-link>
			</van-tabbar-item>
			<van-tabbar-item icon="contact">
				<router-link to="/member">会员</router-link>
			</van-tabbar-item>
			<van-tabbar-item icon="cart-o" :info="cartNum">
				<router-link to="/shopcar" id="tabbar-cart">购物车</router-link>
			</van-tabbar-item>
			<van-tabbar-item icon="search">
				<router-link to="/search">搜索</router-link>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				active:0,
				cartNum:this.$store.getters.getAllcount,
				flag:false
			}
		},
		created() {
			this.flag = this.$route.path === "/home" ? false : true; 
		},
		methods:{
			backButton(){
				//点击后退
				this.$router.go(-1)
			}
		},
		watch:{
			'$route.path':function(newVal){
				if(newVal === "/home"){
					this.flag = false;
				}else{
					this.flag = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.app-container {
	padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
.mint-header{
	z-index: 99;
}
.van-tabbar-item__text{
	a{
		color: black;
	}
}
.van-tabbar-item--active{
	a{
		color: #1989fa;
	}
}
</style>
