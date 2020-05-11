<template>
	<div class="container">
		<h3>{{goodsDesc.title}}</h3>
		<div class="content" v-html="goodsDesc.content"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				id:this.$route.params.id,
				goodsDesc:[]
			}
		},
		created() {
			this.getDesc();
		},
		methods:{
			getDesc(){
				this.axios.get('api/goods/getdesc/'+this.id).then((res) => {
					console.log(res);
					if(res.data.status === 0){
						this.goodsDesc = res.data.message[0];
					}else{
						console.log('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			}
		}
	}
</script>

<style lang="scss" >
.container{
	h3{
		font-size: 16px;
		color: #226aff;
		text-align: center;
		margin: 15px 0;
	}
	.content{
		img{
			width: 100%;//需去掉scoped
		}
	}
}
	
</style>
