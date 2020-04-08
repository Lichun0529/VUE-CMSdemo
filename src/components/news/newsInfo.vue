<template>
	<div class="newsinfo-container">
		<div class="title">
			{{newsInfo.title}}
		</div>
		<p class="subtitle">
			<span>发布时间: {{newsInfo.add_time}} </span>
			<span>点击: {{newsInfo.click}} 次</span>
		</p>
		<hr>
		<div class="content" v-html="newsInfo.content"></div>
		<comment-box :id="this.id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponets/comment.vue'
	export default {
		data(){
			return{
				id:this.$route.params.id,
				newsInfo:[]
			}
		},
		created() {
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				this.axios.get('api/getnew/'+this.id).then((res)=>{
					if(res.data.status === 0){
						this.newsInfo = res.data.message[0]
					}else{
						Toast('获取失败')
					}
				})
			}
		},
		components:{
			'comment-box':comment
		}
	}
</script>

<style lang="scss" scoped>
	.newsinfo-container{
		padding: 5px;
		.title {
			text-align: center;
			font-size:18px;
			margin: 15px 0;
			font-weight: 700;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			color: #2187E7;
		}
		.content{
			
		}
	}
</style>
