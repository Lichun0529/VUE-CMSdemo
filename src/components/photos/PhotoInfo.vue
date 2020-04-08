<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtittle">
			<span>发表时间:{{ photoinfo.add_time | timeFilter }}</span>
			<span>点击:{{photoinfo.click}}次</span>
		</p>
		<hr>
		<!-- 缩略图区域 -->
		<!-- <vue-preview :slides="photoList" ></vue-preview> -->
		<vue-preview
		      :list="photoList"
		      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
		      :previewBoxStyle="{border: '1px solid #eee'}"
		      :tapToClose="true"
		      @close="closeHandler"
		      @destroy="destroyHandler"
		    />
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoinfo.content"></div>
		
		<!-- 评论组件 -->
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponets/comment.vue'
	export default{
		data(){
			return {
				id:this.$route.params.id,
				photoinfo:[],
				photoList: []
			}
			
		},
		created() {
			this.getPhtotoInfo();
			this.getThumbs();
		},
		methods:{
			getPhtotoInfo(){
				//获取图片的详情
				this.axios.get('api/getimageInfo/'+this.id).then((res) => {
					if(res.data.status === 0){
						this.photoinfo = res.data.message[0];
					}else{
						Toast('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			getThumbs(){
				//获取缩略图
				this.axios.get('api/getthumimages/'+this.id).then((res) => {
					if(res.data.status === 0){
						res.data.message.forEach(item =>{
							item.w = 600;
							item.h = 400;
							item.msrc = item.src;
						})
						this.photoList = res.data.message;
					}else{
						Toast('获取失败');
					}
				}).catch(function (error) {
					console.log(error);
				  });
			},
			// 即将关闭的时候，调用这个处理函数
			closeHandler() {
			  console.log('closeHandler')
			},
			// 完全关闭之后，调用这个函数清理资源
			destroyHandler() {
			  console.log('destroyHandler')
			}
		},
		components:{
			'comment-box':comment
		}
	}
</script>

<style lang="scss" scoped>
.photoinfo-container{
	padding: 3px;
	h3{
		color: #26a2ff;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;
	}
	.subtittle{
		display: flex;
		justify-content: space-between;
		font-size: 13px;
	}
	.content{
		font-size: 13px;
		line-height: 30px;
	}
}
</style>
