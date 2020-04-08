<template>
	<div>
		<!-- 轮播图 -->
		<!-- <mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
			  <img :src="item.img">
		  </mt-swipe-item>
		</mt-swipe> -->
		<swipe-box :swipeList="this.lunbotuList" :isfull="true"></swipe-box>
		<!-- 六宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
				<img src="/static/images/menu1.png" alt=""><!-- 注：使用webpack构建的项目本地图片地址根目录为src -->
				<div class="mui-media-body">新闻资讯</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
				<img src="/static/images/menu2.png" alt="">
				<div class="mui-media-body">图片分享</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
				<img src="/static/images/menu3.png" alt="">
				<div class="mui-media-body">商品购买</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/newslist">
				<img src="/static/images/menu4.png" alt="">
				<div class="mui-media-body">留言反馈</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/newslist">
				<img src="/static/images/menu5.png" alt="">
				<div class="mui-media-body">视频专区</div></router-link></li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/newslist">
				<img src="/static/images/menu6.png" alt="">
				<div class="mui-media-body">联系我们</div></router-link></li>
		</ul> 
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import swipe from '../subcomponets/swipe.vue'
	export default{
		data(){
			return{
				lunbotuList:[]//保存轮播图数据
			}
		},
		created() {
			this.getSwipeData()
		},
		methods:{	 
			//获取轮播图数据
			getSwipeData(){
				this.axios.get('api/getlunbo').then((response) => {
					if(response.data.status === 0){
						this.lunbotuList = response.data.message;
					}else{
						Toast('获取轮播图失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			}
		},
		components:{
			'swipe-box':swipe
		},
	}
</script>

<style lang="scss" scoped> 
	.mint-swipe{
		height: 200px;
	}
	.mint-swipe-item {
		// &:nth-child(1){
		// 	background-color: lightblue;
		// }
		// &:nth-child(2){
		// 	background-color: lightcoral;
		// }
		// &:nth-child(3){
		// 	background-color: lightgoldenrodyellow;
		// }
		img {
			width: 100%;
			height: 100%;
		}
	}
	.mui-grid-view.mui-grid-9 {
		background-color: #FFFFFF;
		border: none;
		img {
			width: 60px;
			height: 60px;
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;
	}
	.mui-media-body {
		font-size: 13px;
	}
</style>
