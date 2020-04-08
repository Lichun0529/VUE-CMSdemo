<template>
	<div class="cardinfo">
		<div class="goods" v-for="(item,i) in goodsInfo" :key="item.id">
			<mt-switch v-model="$store.getters.getgoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getgoodsSelected[item.id])"></mt-switch>
			<img :src="item.thumb_path" >
			<div class="info">
				<h1>{{item.title}}</h1>
				<div>
					<span class="price">￥{{item.sell_price}}</span>
					<num-box style="height: 33px;margin: 0 5px;" :cartCount="$store.getters.getCartcount[item.id]" :id="item.id"></num-box>
					<mt-button size="small" type="danger" @click="delGoods(item.id,i)" plain>删除</mt-button>
				</div>
			</div>
		</div>
		<div class="settlement">
			<div class="total">
				<p>总计（不含运费）</p>
				<p>已勾选<span class="count">{{this.$store.getters.getGoodsCountAndTotal.count}}</span>件商品总价:<span class="count">￥{{this.$store.getters.getGoodsCountAndTotal.total}}</span></p>
			</div>
			<mt-button size="normal" type="danger" >去结算</mt-button>
		</div>
		
	</div>
</template>

<script>
	import numbox from '../subcomponets/cart_numbox.vue'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				goodsInfo:[],
			}
		},
		created() {
			this.getgoodsInfo()
			
		},
		methods:{
			getgoodsInfo(){//获取商品信息
				var idArr = [];
				this.$store.state.cart.forEach(item => {
					idArr.push(item.id)//把本地储存的商品id push到数组中发请求用
				})
				this.axios.get('api/goods/getshopcarlist/'+idArr.join(",")).then((res) => {
					if(res.data.status === 0){
						this.goodsInfo = res.data.message;
					}else{
						console.log('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			delGoods(id,i){//删除购物车中的商品
				this.goodsInfo.splice(i,1);//删除页面中的数据
				this.$store.commit("delGoods",id);//删除store中的数据
			},
			selectedChanged(id,val){
				//每次点击开关把最新的开关状态同步到store中
				console.log(id,val);
				this.$store.commit('updategoodsSelected',{ id:id , selected:val });
			}
		},
		components:{
			'num-box':numbox
		}
	}
</script>

<style lang="scss" scoped>
	.cardinfo{
		background-color: #FFFFFF;
	}
	.goods,
	.settlement{
		background-color: #FFFFFF;
		box-shadow: 0 0 4px #CCCCCC;
		margin: 10px;
	}
	.goods{
		height: 100px;
		display: flex;
		flex-direction:row;
		align-items: center;
		.van-checkbox{
			margin: 0 10px;
		}
		img{
			width: 100px;
			height: 100px;
		}
		.info{
			width: 70%;
			h1{
				font-size: 16px;
				color: #000000;
				margin: 5px;
			}
			div{
				display: flex;
				.price{
					color: red;
					font-weight: bold;
					font-size: 16px;
					line-height: 33px;
				}
			}
			
		}
	}
	.settlement{
		display: flex;
		flex-direction:row;
		.total{
			padding: 0 0 0 0;
			width: 75%;
			padding: 30px 0 10px 10px;
			p{
				font-size: 16px;
				margin: 0 0 20px 0;
			}
			.count{
				font-size: 16px;
				color: red;
				font-weight: bold;
				margin: 0 5px;
			}
		}
		.mint-button{
			margin: auto 0;
			font-size: 20px;
		}
	}
</style>
