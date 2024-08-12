<template>
	<div
		class="__header">
		<img
			class="__header-img"
			:src="icon"/>
	</div>
</template>

<script>
	
	import Icon from "/src/assets/icon.png"
	
	export default {
		data (){
			return {
				icon: Icon
			}
		}
	}
</script>

<style>
	.__header {
		width: 100%;
		display: block;
		height: 10px;
		position: relative;
		overflow: visible;
	}
	
	.__header-img {
		position: absolute;
		width: 150px;
		height: 150px;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 30px;
	}
</style>