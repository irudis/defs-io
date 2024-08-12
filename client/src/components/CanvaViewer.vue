<template>
	<div
		v-on:pointermove="pointerMOve"
		v-on:pointerdown="pointerDown"
		class="custom-viewer">
		<div
			class="custom-viewer_child"
			:style="style"
			ref="child">
			<slot />
		</div>
	</div>
</template>

<script>
	import { reactive } from 'vue'
	export default {
		data(){
			return {
				transform: reactive({
					x: 0,
					y: 0
				})
			}
		},
		
		methods: {
			/**
			 * @param {PointerEvent} event
			 */
			pointerMOve(event){
				this.transform.x += event.movementX,
				this.transform.y += event.movementY
			},
			
			/**
			 * @param {PointerEvent} event
			 */
			pointerDown(event){
				
			}
		},
		
		computed: {
			style (){
				return `transform: translate(
					calc(-50% + ${this.transform.x}px),
					calc(-50% + ${this.transform.y}px))`
			}
		}
	}
</script>

<style>
	.custom-viewer {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		touch-action: none;
		background-color: rgba(20, 20, 20, 0.9);
	}
	
	.custom-viewer_child {
		position: absolute;
		top: 50%;
		left: 50%;
	}
</style>