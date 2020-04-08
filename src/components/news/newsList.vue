<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url" v-lazy="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class='mui-ellipsis'>
							<span>发表时间: {{item.add_time | timeFilter}}</span>
							<span>点击: {{item.click}} 次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return{
			 	newsList:[]
			}
		},
		created() {
			this.getNewsList();
		},
		methods:{
			getNewsList(){
				this.axios.get('api/getnewslist').then((res) => {
					if(res.data.status === 0){
						this.newsList = res.data.message;
					}else{
						Toast('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mui-table-view {
		li {
			h1 {
				font-size: 14px;
			}
			.mui-ellipsis {
				font-size: 12px;
				color: #226aff;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	img[lazy=loading] {//图片懒加载
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	.mui-media-body {
		h1{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
