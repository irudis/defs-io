<template>
	<v-app
		style="background-color: #438e4c;">
		<div
			class="unselectable pa-0 fill-height">
			<div v-if="panel === 'loading'" id="menu">
				<Header/>
			</div>
			<div
				v-if="panel === 'menu'" id="menu"
				style="padding: 0 24px;"
				class="fill-height">
				<AppMenu
					ref="menu"
					:appVersion="appVersion"
					:startGame="connect"
					:host="host"/>
			</div>
			
			<div v-if="panel === 'game'" id="game">
				<Game
					:server="server"
					:panel="panel"
					:name="name"
					:disableGpu="disableGpu"
					ref="game"/>
			</div>
		</div>
		
		<!-- Error message -->
		<v-dialog persistent v-model="errorMessage">
			<v-card
				title="Ошибка"
				:text="errorMessage">
				<v-card-text>
					Попробуйте очистить кэш и перезапустить ВКонтакте.
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-app>
</template>

<script>
	import Header from '/src/components/Header.vue';
	import Game from '/src/components/game/Game.vue';
	
	import AppMenu from "/src/components/AppMenu.vue";
	
	import bridge from '@vkontakte/vk-bridge'
	
	const host = "https://defs-io.fvds.ru"
	const appVersion = "0.1.3.1"
	
	// document.documentElement.requestFullscreen()
	// let locOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
	// locOrientation('landscape');
	
	export default {
		data(){
			return {
				panel: "menu",
				visible: true,
				server: null,
				name: null,
				errorMessage: null,
				host,
				appVersion,
				disableGpu: false
			}
		}, 
		
		async mounted (){
			const version = ( await ( await fetch(host + '/api/get-app-version') ).json() ).appVersion
			
			if (version !== appVersion) {
				this.errorMessage = "Версия приложения не совпадает с текущей! (" + 
						appVersion + " | " + version + ")"
				
				return;
			}
		},
		
		methods: {
			connect(serv, name) {
				if (!serv) return
				
				this.disableGpu = this.$refs.menu.disableGpu
				
				this.name = name
				this.server=serv
				this.panel = "game"
			}
		},
		
		components: {
			Header, AppMenu, Game
		}
	}
</script>

<style>
	body {
		margin: 0;
		background-color: white;
	}
	
	
	.v-application {
	}


	.unselectable {
		-webkit-user-select: none;
		-webkit-touch-callout: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		background-color: white;
		width: 100%;
		height: 100%;
		max-zoom: 1;
	}
	
	#game {
		line-height: 0;
	}
</style>
