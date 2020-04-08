<template>
	<div>
		<van-swipe class="my-swipe" :autoplay="3000">
			<van-swipe-item v-for="(image, index) in swipeList" :key="index">
				<img :class="{full:isfull}" v-lazy="image.img" />
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:[
			"swipeList",
			"isfull"
			]
			
	}
</script>

<style lang="scss" scoped>
	.my-swipe {
		height: 200px;
		text-align: center;
		background-color: #FFFFFF;
		img[lazy=loading] {//图片懒加载
		  width: 40px;
		  height: 300px;
		  margin: auto;
		}
		img {
			// width: 100%;
			height: 100%;
		}
	}
	.full{
		width: 100%;
	}
</style>
