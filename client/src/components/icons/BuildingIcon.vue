<template>
	<img
		class="img-icon"
		:src="asset" />
	<div class="__counter">
		<p class="text-body-2">{{count && (count[0] + "/" + count[1])}}</p>
	</div>
</template>

<script>
	export default {
		props: {
			asset: {
				type: String
			},
			count: {
				type: Array
			}
		}
	}
</script>

<style>
	.__counter {
		line-height: normal;
		position: absolute;
		bottom: -5px;
		right: 0px;
		color: white;
	}
</style>