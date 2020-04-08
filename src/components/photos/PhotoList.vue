<template>
	<div>
		<van-tabs class="tabs" v-model="cateId" @click="getImages()" color="#26a2ff">
		  <van-tab  v-for="item in imgcateList" :name="item.id"  :title="item.title" :key="item.id"></van-tab>
		</van-tabs>
		<ul>
			<router-link v-for="item in imgList" :key="item.id" :to="'/home/photoInfo/'+item.id" tag="li"> 
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body" v-html="item.content"></div>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				cateId: 0,
				imgcateList:[],
				imgList:[]
			}
		},
		created() {
			this.getImgcate();
			this.cateId = 0;
			this.getImages();
		},
		methods:{
			getImgcate(){
				this.axios.get('api/getimgcategory/').then((res)=>{
					if(res.data.status === 0){
						res.data.message.unshift({title:'全部',id: 0 });
						this.imgcateList = res.data.message;
					}else{
						Toast('获取失败')
					}
				})
			},
			getImages(){
				this.axios.get('api/getimages/'+this.cateId).then((res) => {
					console.log(res);
					if(res.data.status === 0){
						this.imgList = res.data.message;
					}else{
						Toast('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		touch-action: pan-y;
	}
	.tabs {
		margin: 0 5px;
	}
	ul{
		padding: 10px;
		padding-bottom: 0px;
		li{
			margin-bottom: 10px;
			background-color: #CCCCCC;
			text-align: center;
			box-shadow: 0 0 4px #999;
			position: relative;
			.info {
				color:white;
				text-align: left;
				position: absolute;
				bottom: 0;
				background-color: rgba(0,0,0,0.4);
				max-height: 84px;
				.info-title{
					font-size: 14px;
				}
				.info-body{
					font-size: 13px;
					
				}
			}
		}
		img[lazy=loading] {//图片懒加载
		  width: 40px;
		  height: 300px;
		  margin: auto;
		}
		img {
			width: 100%;
			vertical-align: middle;	
			
		}
	}
</style>
