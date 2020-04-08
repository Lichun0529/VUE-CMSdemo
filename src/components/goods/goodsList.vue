<template>
	<div class="goods-list">
		<!-- 标签式导航 -->
		<!-- <router-link class="goods-item" tag="div" v-for="item in goodsList" :key="item.id" :to="'/home/goodsInfo/'+item.id">
			<img :src="item.img_url" alt="">
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span >热卖中</span>
					<span >剩余 {{item.stock_quantity}} 件</span>
				</p>
			</div>
		</router-link> -->
		
		<!-- 编程式导航 -->
		<div class="goods-item" tag="div" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
			<img v-lazy="item.img_url">
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span >热卖中</span>
					<span >剩余 {{item.stock_quantity}} 件</span>
				</p>
			</div>
		</div>
		<mt-button type="primary" size="large" @click="moreGoods">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				pageIndex:1,
				goodsList:[]
			}
		},
		created() {
			this.getGoodsList()
		},
		methods:{
			getGoodsList(){
				//获取商品列表
				this.axios.get('api/getgoods?pageindex='+this.pageIndex).then((res) => {
					if(res.data.status === 0){
						if(res.data.message.length > 0){
							this.goodsList = this.goodsList.concat(res.data.message);
						}else{
							Toast({
							  message: '没有更多了',
							  position: 'bottom',
							  duration: 3000
							});
						}
						console.log(this.goodsList);
						console.log(res);
					}else{
						Toast('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			moreGoods(){
				this.pageIndex++
				this.getGoodsList()
			},
			goDetail(id){
				
				//三种页面跳转的方法
				
				// 1.编程式导航基础用法
				// this.$router.push("/home/goodsInfo/"+id);
				// 2.传递对象
				// this.$router.push({
				// 	path:"/home/goodsInfo/"+id,
				// 	});
				// 3.传递一个命名的路由(配置路由规则时添加name属性)
				this.$router.push({name:"goodsInfo",params:{id}});
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.goods-list{
	display: flex;
	flex-wrap: wrap;
	padding: 8px;
	justify-content: space-between;
	.goods-item{
		width: 49%;
		border:1px solid #CCCCCC;
		box-shadow: 0 0 4px #CCCCCC;
		margin-bottom: 8px;
		padding: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 289;
		img[lazy=loading] {//图片懒加载
		  width: 40px;
		  height: 300px;
		  margin: auto;
		}
		img{
			width: 100%;
		}
		.title{
			font-size: 14px;
		}
		.info{
			background-color: #EEEEEE;
			p {
				margin: 0;
				padding: 5px;
			}
			.price{
				.now{
					color: orangered;
					font-size: 15px;
					font-weight: bold;
				}
				.old{
					text-decoration: line-through;
					font-size: 12px;
					margin-left: 10px;
				}
			}
			.sell{
				display: flex;
				justify-content: space-between;
			}
		}
	}
}
</style>
