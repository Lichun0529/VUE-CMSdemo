<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="cartCount" @change="changed" ref="numbox" readonly=""/>
		<button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
	</div>
</template>

<script>
	import mui from '../../lib/MUI/js/mui.min.js'
	export default{
		data(){
			return{
				count:1
			}
		},
		props:["max","cartCount","id"],
		mounted() {
			mui(".mui-numbox").numbox();//初始化
		},
		methods:{
			changed(){
				var goodsCount = {
					id:this.id,
					count:this.$refs.numbox.value
				}
				this.$store.commit("updategoodsCount",goodsCount);
				console.log(goodsCount);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
