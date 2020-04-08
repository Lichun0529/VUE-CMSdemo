<template>
	<div class="container">
		<transition
			v-on:before-enter="beforeEnter"
			v-on:enter="enter"
			v-on:after-enter="afterEnter"
		>
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<div class="swipe">
			<swipe-box :swipeList="swipeList"></swipe-box>
		</div>
		<div class="info">
			<div class="title">{{goodsInfo.title}}</div>
			<div class="middle">
				<p class="pirce">
					<span >市场价:<span class="oldPrice">￥{{goodsInfo.market_price}}</span></span>
					<span >销售价:<span class="newPrice">￥{{goodsInfo.sell_price}}</span></span>
				</p>
				<div class="count">
					<span>购买数量:</span>
					<num-box @getnumbox="getnumbox" :max="goodsInfo.stock_quantity"></num-box>
				</div>
				<div class="button">
					<mt-button size="small" type="primary" @click="addtoCart">加入购物车</mt-button>
					<mt-button size="small" type="danger">立即购买</mt-button>
				</div>
			</div>
			
			
		</div>
		<div class="detail">
			<div class="title">商品参数</div>
			<div class="detail-info">
				<p>商品货号:{{goodsInfo.goods_no}}</p>
				<p>库存情况:{{goodsInfo.stock_quantity}}</p>
				<p>上架时间:{{goodsInfo.add_time | timeFilter}}</p>
			</div>
			<div class="footer">
				<mt-button size="large" type="primary" plain @click="goDesc(id)">图文详情</mt-button>
				<mt-button size="large" type="danger" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swipe from '../subcomponets/swipe.vue'
	import numbox from '../subcomponets/goodsinfo_numbox.vue'
 	export default {
		data() {
			return {
				id:this.$route.params.id,	
				swipeList:[],
				goodsInfo:[],
				ballFlag:false,
				numboxCount:1
			}
		},
		created() {
			this.getswipeList();
			this.getgoodsInfo();
		},
		methods:{
			//获取产品轮播图
			getswipeList(){
				this.axios.get('api/getthumimages/'+this.id).then((res) => {
					if(res.data.status === 0){
						res.data.message.forEach(item =>{
							item.img = item.src
						})
						this.swipeList = res.data.message;
					}else{
						console.log('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			//获取产品信息
			getgoodsInfo(){
				
				this.axios.get('api/goods/getinfo/'+this.id).then((res) => {
					console.log(res);
					if(res.data.status === 0){
						this.goodsInfo = res.data.message[0];
					}else{
						console.log('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			//跳转至商品详情页
			goDesc(id){
				this.$router.push("/home/goodsDesc/"+id);
			},
			//跳转至商品评论页
			goComment(id){
				this.$router.push("/home/goodsComment/"+id);
			},
			addtoCart(){
				this.ballFlag = !this.ballFlag;
				//拼接出一个要加入store的对象
				var goodsinfo = {
					id:this.id,
					count:this.numboxCount,
					price:this.goodsInfo.sell_price,
					selected:true
				}
				this.$store.commit("addtoCart",goodsinfo);
				
			},
			//动画钩子函数
			beforeEnter(el){
				el.style.transform = "translate(0,0)"
			},
			enter(el,done){
				//获取小球在页面中的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect();
				//获取购物车在页面中的位置
				const badgePosition = document.getElementById('tabbar-cart').getBoundingClientRect();
				// 小球的x轴实际移动距离
				const xDist = badgePosition.right - ballPosition.left;
				// 小球的y轴实际移动距离
				const yDist = badgePosition.top - ballPosition.top;
				
				
				el.offsetWidth;//没有实际作用，但没有这句话动画会不显示
				el.style.transform = 'translate('+xDist+'px,'+yDist+'px)';
				el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
				done()//当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
			},
			afterEnter(el){
				this.ballFlag = false;
			},
			getnumbox(count){
				this.numboxCount = count;
			}
		},
		components:{
			'swipe-box':swipe,
			'num-box':numbox
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #EEEEEE;
		overflow: hidden;
	}

	.swipe {
		margin: 10px;
		box-shadow: 0 0 4px #CCCCCC;
		img {
			width: 100%;
			max-height: 300PX;
		}
	}
	.title{
		font-size: 20px;
		color: #000000;
		padding: 12px;
		border-bottom: 1px solid #CCCCCC;
	}
	.info {
		background-color: #FFFFFF;
		box-shadow: 0 0 4px #CCCCCC;
		margin: 10px;
		.middle{
			padding:30px 12px;
			.pirce{
				color: #000;
				font-size: 16px;
				.oldPrice{
					text-decoration: line-through;
				}
				.newPrice{
					font-size: 20px;
					color: red;
					font-weight: 500;
				}
				
			}
			.count{
				color: #000;
				margin-bottom: 10px;
				input{
					width: 40px;
					margin: 0;
					padding: 0;
					height: 30px;
				}
			}
			.button{
				.mint-button--small {
				    display: inline-block;
				    font-size: 20px;
				    padding: 0 12px;
				    height: 40px;
				}
			}
			span{
				margin-right: 10px;
			}
		}
	}
	.detail{
		background-color: #FFFFFF;
		box-shadow: 0 0 4px #CCCCCC;
		margin: 10px;
		.detail-info{
			padding: 30px 12px;
			border-bottom: 1px solid #CCCCCC;
			p{
				font-size: 16px;
			}
		}
		.footer{
			padding: 30px 12px;
			button{
				margin-bottom: 12px;
			}
		}
	}
	.ball{
		position: absolute;
		top: 378px;
		left: 162px;
		border-radius:50%;
		z-index: 99;
		background-color: red;
		width: 13px;
		height: 13px;
		transform: translate(100px,320px);
	}
</style>
