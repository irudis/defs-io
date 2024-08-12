<template>
	<table
		class="tree-node">
		<svg
			ref="svg"
			width="100%"
			height="100%"
			class="tree-node-svg">
			<line
				v-for="(line, i) in lines"
				:stroke="curNode.unlocked ? 'white' : 'rgb(100, 100, 100)'"
				:x1="line.x1"
				:y1="line.y1"
				:x2="line.x2"
				:y2="line.y2"/>
		</svg>
		<tr>
			<td
				v-for="(node, i) in curNode.next"
				:ref="`node${i}`"
				style="vertical-align: bottom;">
				<UpgradeTreeButton
					:curNode="node"
					:avaliable="curNode.unlocked"
					:host="host"
					@updateData="() => {
						this.$emit('updateData')
					}"
					@update="() => {
						this.$emit('update')
						this.drawLines()
					}"/>
			</td>
		</tr>
		<tr>
			<td
				:colspan="curNode.next.length"
				ref="node"
				style="padding: 60px 10px 0 10px"
				class="text-amber">
				<div
					@click="() => showCard = true"
					v-click-outside="() => showCard = false"
					:class="'tree-node-icon'
						+ (avaliable ? ' tree-node-icon-avaliable' : '')
						+ (curNode.unlocked ? ' tree-node-icon-unlocked' : '')"
					:style="`background-image: url(/upgrade.${curNode.code}.png); background-size: 100%;`">
					<div
						v-if="!avaliable"
						class="tree-node-icon-disabled"/>
					<div
						style="position: relative; width: 100%; height: 100%;">
						<v-expand-x-transition
							origin="0 50%">
							<div
								v-show="showCard"
								class="tree-node-card__container">
								<div
									style="position: absolute; width: 100%; height: 100%; opacity: 0.16;">
									<div class="tree-node-card-corner bg-amber" />
									<div class="tree-node-card-background bg-amber" />
								</div>
								<v-card
									class="tree-node-card__content"
									variant="text"
									theme="dark">
									<p
										style="line-height: 1.4em;"
										class="text-white text-button ms-3 mt-5">
										{{curNode.name}}
									</p>
									<p
										class="text-white text-body-2 ms-3 mt-3">
										{{curNode.description}}
									</p>
									<v-btn
										block
										variant="tonal"
										color="white"
										:disabled="!avaliable || curNode.unlocked"
										style="position: absolute; bottom: 0px;"
										@click="buyUpgrade">
										Купить {{curNode.dCoins}}<DCoinIcon/>
									</v-btn>
								</v-card>
							</div>
						</v-expand-x-transition>
					</div>
				</div>
			</td>
		</tr>
	</table>
</template>

<script>
	import { nextTick, onUpdated } from 'vue';
	import DCoinIcon from "/src/components/icons/DCoin.vue"
	
	export default {
		name: "UpgradeTreeButton",
		
		data (){
			return {
				childNodes: [],
				lines: [],
				showCard: false
			}
		},
		
		mounted() {
			if (!this.curNode.next.length) this.$emit("update")
		},
		
		methods: {
			drawLines(){
				this.lines = []
				for (let i = 0; i < this.curNode.next.length; i++){
					let nodeB = this.$refs[`node${i}`][0].getBoundingClientRect()
					let svgB = this.$refs.svg.getBoundingClientRect()
					let rootB = this.$refs.node.getBoundingClientRect()
					
					let obj = {
						x1: nodeB.left + nodeB.width / 2 - svgB.left,
						y1: nodeB.top + nodeB.height - 1 - svgB.top,
						x2: rootB.left + rootB.width / 2- svgB.left,
						y2: rootB.top + rootB.height - 42 - svgB.top
					}
					
					this.lines.push(obj)
				}
			},
			
			async buyUpgrade(){
				let res = (await (await fetch(`${this.host}/api/buy-upgrade?id=${this.curNode.code}`)).json()).status
				
				this.$emit("updateData")
			}
		},

		props: {
			curNode: Object,
			avaliable: Boolean,
			host: String
		},
		
		components: {
			DCoinIcon
		}
	}
</script>

<style>
	.tree-node {
		position: relative;
	}
	
	.tree-node-card__content, .tree-node-card__container {
		width: 300px;
	}
	
	.tree-node-card__content {
		height: 100%;
		position: relative;
		border-radius: 10px;
	}
	
	.tree-node-card__container {
		position: absolute;
		left: 60px;
		top: -50px;
		bottom: -50px;
		z-index: 1;
		backdrop-filter: blur(20px);
	}
	
	.tree-node-card-corner {
		display: visible !important;
		position: absolute;
		top: calc(50% - 25px);
		left: -10px;
		width: 50px;
		height: 50px;
		transform: rotate(45deg);
	}
	
	.tree-node-card-background {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	
	.tree-node-svg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;;
	}
	
	.tree-node-icon, .tree-node-icon-disabled:after {
		width: 40px;
		height: 40px;
		position: absolute;
		display: block;
	}
	
	.tree-node-icon {
		margin: auto;
		border-radius: 10px;
		background-color: rgba(30, 30, 30, 1);
		pointer-events: auto;
		position: static;
		outline: 2px solid gray;
	}
	
	.tree-node-icon-avaliable {
		outline: 2px solid white;
	}
	
	.tree-node-icon-unlocked {
		outline: 3px solid #7CB342;
	}
	
	.tree-node-icon-disabled:after {
/* 		content: "";
		backdrop-filter: brightness(0.6); */
	}
</style>