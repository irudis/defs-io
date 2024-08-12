<template>
	<v-card
		variant="outlined"
		class="server-list">
		<p class="font-weight-bold">
			Список серверов
		</p>
		<v-divider :thickness="1" class="border-opacity-100"></v-divider>
		<div
			v-for="server in serverList">
			
			<v-btn
				block
				variant="text"
				v-bind:class="'server-list-item' + (selected === server.name ? ' selected' : '')"
				v-on:click="select($event, server)">
				<PlaceIcon v-if="server.name === serverWhereUserIsIn"/> {{server.name}} [{{server.players.length}} / {{server.maxPlayers}}]
			</v-btn>
		</div>
	</v-card>
</template>

<script>
	import PlaceIcon from "/src/components/icons/Place.vue"
	import {watch} from "vue"
	
	export default {
		data() {
			return {
				selected: null,
				serverWhereUserIsIn: null
			}
		},
		
		methods: {
			select (e, server) {
				this.selected = server.name
			}
		},
		
		mounted(){
			const unwatch = this.$watch("serverList", () => {
				for (let i = 0; i < this.serverList.length; i++){
					if (this.serverList[i].players.includes(this.userId)){
						this.selected = this.serverList[i].name
						this.serverWhereUserIsIn = this.serverList[i].name
					}
				}
				unwatch()
			})
		},
		
		props: {
			serverList: {
				type: Array,
				required: true
			},
			userId: {
				type: String,
				required: true
			}
		},
		
		components: {
			PlaceIcon
		}
	}
</script>

<style>
	.server-list {
		padding: 10px;
		margin: 20px 0;
		border-radius: 10px;
		height: 160px;
		width: 230px;
		overflow-y: scroll;
		scrollbar-width: 0;
	}
	.server-list:-webkit-scrollbar {
		display: none;
	}
	.server-list-item {
		padding: 8px;
		font-size: 16px;
		font-weight: 500;
		border-radius: 5px;
		margin: 5px 0;
	}
	.server-list-item.selected {
		background: rgba(0 255, 0, 0.5);
	}
</style>