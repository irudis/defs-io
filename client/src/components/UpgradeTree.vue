<template>
	<v-toolbar
		theme="dark"
		density="comfortable"
		class="upgrade-tree-header">
		<v-toolbar-title
			class="ml-16">
			Улучшения
		</v-toolbar-title>
		<v-spacer />
		
		<v-btn
			icon
			@click="$emit('close')">
			<IconClose
				size="x-small"
				color="white"/>
		</v-btn>
	</v-toolbar>
	
	<CanvaViewer>
		<div class="tree" theme="dark">
			<v-col cols="auto" class="me-auto">
				<UpgradeTreeButton
					@updateData="() => {
						this.updateData()
					}"
					v-for="node in tree"
					:avaliable="true"
					:host="host"
					:curNode="node"/>
			</v-col>
		</div>
	</CanvaViewer>
	
	<p
		class="text-body text-white"
		style="position: absolute; top: 65px; left: 10px">
		{{profile.dCoins}}<DCoinIcon/>
	</p>
</template>

<script>
	import UpgradeTreeButton from "/src/components/UpgradeTreeButton.vue"
	import CanvaViewer from "/src/components/CanvaViewer.vue"
	import IconClose from "/src/components/icons/Close.vue"
	import DCoinIcon from "/src/components/icons/DCoin.vue"

	export default {
		data() {
			return {
				tree: []
			}
		},
		
		async mounted(){
			this.updateData()
		},
		
		methods: {
			async updateData(){
				let tree= (await (await fetch(this.host + "/api/get-upgrades")).json()).tree
				
				this.tree = tree
			}
		},
		
		props: {
			host: String,
			profile: Object
		},

		components: {
			UpgradeTreeButton, DCoinIcon,
			CanvaViewer, IconClose
		},
		
		emits: ["close", "updateData"]
	}
</script>

<style>
	.tree {
		overflow: ;
		min-width: min-content
	}
	
	.upgrade-tree-header {
		position: static;
		top: 0;
		left: 0;
		right: 0;
	}
</style>