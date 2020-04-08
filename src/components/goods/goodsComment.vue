<template>
	<div>
		<comment-box :id="$route.params.id"></comment-box>
	</div>
</template>

<script>
	import comment from '../subcomponets/comment.vue'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		components:{
			'comment-box':comment
		}
	}
</script>

<style lang="scss" scoped>
	
</style>