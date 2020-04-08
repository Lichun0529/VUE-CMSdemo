<template>
	<div class="cmt-content">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入.." maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list" v-for="(item,index) in comments" :key="index">
			<div class="cmt-item">
				<div class="cmt-title">第{{index+1}}楼  用户:{{item.user_name}} 发表时间:{{item.add_time | timeFilter}}</div>
				<div class="cmt-body">{{item.content}}</div>
			</div>
		</div>
		<mt-button type="primary" size="large" @click="moreComment">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				pageIndex:1,
				comments:[],
				msg:''
			}
		},
		created() {
			this.getComments()
		},
		methods:{
			getComments(){
				this.axios.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then((res)=>{
					if(res.data.status===0){
						this.comments = this.comments.concat(res.data.message)
					}else{
						Toast('没有更多了');
					}
				})
			},
			moreComment(){
				this.pageIndex++
				this.getComments()
			},
			postComment(){//发表评论功能
				if(this.msg.length === 0){
					return Toast('评论不能为空')
				}
				var params = new URLSearchParams();//需使用application/x-www-form-urlencoded format格式提交
				params.append('content', this.msg);
				this.axios.post('api/postcomment/'+this.id,params).then((res)=>{
					if(res.data.status===0){
						var cmt = {
							user_name:'奥特曼',
							add_time:Date.now(),
							content:this.msg
						}
						// this.comments.unshift(cmt)
						this.msg = '';
						this.comments = '';
						this.pageIndex = 1;
						this.getComments()	
					}
				})
			}
		},
		props:[
			"id"
		]
	}
</script>

<style lang="scss" scoped>
	.cmt-content{
		h3{
			margin-top: 20px;
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 80px;
			margin: 0;
		}
		.cmt-list{
			margin: 5px 0;
			.cmt-title{
				background-color: #CCCCCC;
				font-size: 12px;
				line-height: 35px;
			}
			.cmt-body{
				line-height: 35px;
				font-size: 14px;
				text-indent: 2em;
			}
		}
		
		
	}
</style>
