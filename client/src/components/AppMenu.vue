<template>
	<div
		class="fill-height"
		style="width: inherit; opacity: 0.9; position: relative;">
		
		<p class="text-caption text-left pa-1 text-white text-medium-emphasis">
			App version: {{appVersion}}
		</p>
		
		<div
			id="menu-buttons">
			
			<div
				style="width: inherit; position: relative;">
				<v-btn
					icon
					theme="dark"
					id="leaderboard-btn"
					@click="topDialog = true" >
					<LeaderboardIcon
						color="white"/>
				</v-btn>
				
				<v-btn
					icon
					theme="dark"
					id="history-btn"
					@click="historyDialog = true" >
					<HistoryIcon 
						color="white"/>
				</v-btn>
				
				<v-btn
					icon
					theme="dark"
					id="button-profile_app"
					@click="() => {
						this.updateProfile()
						this.profileDialog = true
					}" >
					<ProfileIcon 
						color="white"/>
				</v-btn>
				<v-btn
					icon
					theme="dark"
					id="button-shop_app"
					@click="() => {
						this.updateProfile()
						this.shopDialog = true
					}" >
					<ShopIcon 
						color="white"/>
				</v-btn>
				
				<v-btn
					icon
					theme="dark"
					id="button-upgrade-tree"
					@click="() => {
						this.updateProfile()
						this.upgradeTreeDialog = true
					}" >
					<TreeViewIcon 
						color="white"/>
				</v-btn>
			</div>
		</div>
		<v-card
			theme="dark"
			class="pa-3"
			id="menu-center">
			<Header/>
			<v-row>
				<v-col
					cols="auto"
					class="me-auto">
					<ServerList
						ref="serverList"
						:serverList="serverList"
						:userId="userId"/>
				</v-col>
				<v-col
					cols="auto"
					class="flex-1-0"
					align-self="center">
					<v-text-field 
						maxlength="20"
						:model-value="defaultName"
						counter="20"
						label="Ваш ник"
						ref="name"
						variant="outlined"/>
					<VBtn 
						:disabled="playIsActive"
						size="large"
						v-on:click="() => {
							this.writeDefaultName()
							let serv = this.serverList.find(s => {
								return s.name === this.$refs.serverList.selected
							})
							
							let mainServ  = this.serverList.find(s => {
								return s.players.find(i => i == this.userId)
							})
							
							if (mainServ && mainServ.name !== serv.name){
								this.serverWarning = true
							} else {
								this.startGame(serv, this.$refs.name.value)
							}
						}"
						block variant="tonal">Играть</VBtn>
					<v-switch
						  v-model="disableGpu"
						  color="primary"
						  density="compact"
						  label="Отключить GPU ускорение"
						  hide-details
						></v-switch>
				</v-col>
			</v-row>
		</v-card>
	</div>
	
	<v-btn
		theme="dark"
		id="how-to-play">
		<template v-slot:prepend>
			<QuestionIcon />
		</template>
		Как играть
	</v-btn>
	
	<v-dialog
		theme="dark"
		max-width="400"
		v-model="serverWarning">
		<v-card
			title="Осторожно"
			text="Вы пытаетесь присоединиться к серверу, имея активный сеанс на другом. Если продолжить, то
				прогресс на первом сервере будет потерян!">
				<v-container>
					<v-btn
						block
						variant="tonal"
						@click="serverWarning = false"
						color="red">
						Отмена
					</v-btn>
					<v-btn
						block
						variant="tonal"
						class="mt-2"
						@click="() => {
							let mainServ  = this.serverList.find(s => {
								return s.players.find(i => i == this.userId)
							})
							
							if (!mainServ){
								this.serverWarning = false
							} else {
								this.startGame(mainServ, this.$refs.name.value)
							}
						}"
						color="light-green">
						Существующая игра
					</v-btn>
					<v-btn
						block
						variant="flat"
						class="mt-2"
						@click="() => {
							let serv = this.serverList.find(s => {
								return s.name === this.$refs.serverList.selected
							})
							
							if (!serv){
								this.serverWarning = false
							} else {
								this.startGame(serv, this.$refs.name.value)
							}
						}"
						color="red-darken-4">
						Новая игра
					</v-btn>
				</v-container>
		</v-card>
	</v-dialog>
	
	<v-dialog
		fullscreen
        transition="dialog-bottom-transition"
		v-model="topDialog">
		<Leaderboard 
			:close="() => topDialog = false"
			:host="host"/>
	</v-dialog>
	
	<v-dialog
		fullscreen
        transition="dialog-bottom-transition"
		v-model="historyDialog">
		<HistoryLog 
			:close="() => historyDialog = false"
			:host="host"/>
	</v-dialog>
	
	<v-dialog
		fullscreen
        transition="dialog-bottom-transition"
		v-model="shopDialog">
		<Shop 
			@updateData="() => updateProfile()"
			:close="() => shopDialog = false"
			:dCoins="profile.dCoins"
			:collection="profile.collection || []"
			:host="host"/>
	</v-dialog>
	
	<v-dialog
		v-model="profileDialog"
        transition="dialog-bottom-transition"
		fullscreen>
		<Profile 
			@updateData="() => updateProfile()"
			:close="() => profileDialog = false"
			:profile="profile"
			:host="host"/>
	</v-dialog>
	
	<v-dialog
		max-width="400px"
		activator="#how-to-play">
		<HowToPlay 
			:host="host"/>
	</v-dialog>
	
	<v-dialog
		fullscreen
        transition="dialog-bottom-transition"
		v-model="upgradeTreeDialog">
		<UpgradeTree 
			@close="() => upgradeTreeDialog = false"
			@updateData="() => updateProfile()"
			:profile="profile"
			:host="host"/>
	</v-dialog>
</template>

<script>
	import { defineAsyncComponent } from 'vue';

	import ServerList from '/src/components/ServerList.vue';
	import Leaderboard from "/src/components/Leaderboard.vue"
	import HistoryLog from "/src/components/HistoryLog.vue"
	import Shop from "/src/components/Shop.vue"
	import Profile from "/src/components/Profile.vue"
	
	import Header from '/src/components/Header.vue';
	
	import GamepadIcon from "/src/components/icons/Gamepad.vue";
	import LeaderboardIcon from "/src/components/icons/Leaderboard.vue";
	import HistoryIcon from "/src/components/icons/History.vue";
	import ProfileIcon from "/src/components/icons/Profile.vue"
	import ShopIcon from "/src/components/icons/Shop.vue"
	import QuestionIcon from "/src/components/icons/Question.vue"
	import TreeViewIcon from "/src/components/icons/TreeView.vue"
	
	const HowToPlay = defineAsyncComponent(() => import("/src/components/HowToPlay.vue"))
	const UpgradeTree = defineAsyncComponent(() => import("/src/components/UpgradeTree.vue"))
	
	export default {
		data (){
			return {
				serverList: [],
				isMounted: false,
				topDialog: false,
				historyDialog: false,
				shopDialog: false,
				profileDialog: false,
				upgradeTreeDialog: false,
				menu: "lobby",
				disableGpu: false,
				profile: {},
				serverWarning: false,
				userId: new URLSearchParams(location.search).get("viewer_id")
			}
		},
		
		computed: {
			playIsActive () {
				//console.log(this.$refs)
				// return true
				if (!this.isMounted) return true;
				
				return !this.$refs.serverList.selected
			},
			color () {
				switch (this.menu) {
					case "lobby": return '#c4ffc4'
					case "leaderboard": return '#ffffc4'
					case "shop": return '#e2d4ff'
				}
			},
			defaultName (){
				return localStorage.getItem('name') || 'New player'
			}
		},
		
		methods: {
			async updateProfile(){
				let profile = (await (await fetch(this.host + "/api/get-profile")).json()).player
				
				let items = (await (await fetch(this.host + "/api/get-items-info?ids=" + profile.collection.join(","))).json()).items.map((item, index) => {
					item.id = profile.collection[index].split(".")[1]
					item.category = profile.collection[index].split(".")[0]
					return item
				})
				
				profile.collection = items
				
				this.profile = profile
			},
			
			writeDefaultName (){
				localStorage.setItem('name', this.$refs.name.value)
			}
		},
		
		props: {
			startGame: Function,
			host: String,
			appVersion: String
		},
		
		async mounted(){
			this.isMounted = true
			// this.$refs.name.value = localStorage.getItem("name") || "New player"
			const updateServerList = async () => {
				fetch(this.host + '/api/server-list')
					.then(res => res.json())
					.catch(e => console.error(e))
					.then(body => {
						this.serverList = body
					})
				
				setTimeout(updateServerList, 5000)
			}
			
			updateServerList()
		},
		
		components: {
			GamepadIcon, ServerList, Header, LeaderboardIcon, ShopIcon,
			Leaderboard, HistoryIcon, HistoryLog, ProfileIcon, Shop,
			Profile, QuestionIcon, HowToPlay, UpgradeTree, TreeViewIcon
		}
	}
</script>

<style>
	#menu-center, #menu-buttons {
		height: 230px;
	}
	
	#menu-center {
		position: absolute;
		left: 50%;
		bottom: 10px;
		overflow: visible;
		transform: translateX(-50%);
		border: 0;
		background: rgba(0, 0, 0, 0.8);
		border-radius: 20px;
		width: min(600px, calc(100% - 120px));
	}
	
	#menu-buttons {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: min(720px, 100%);
	}
	
	#leaderboard-btn {
		position: absolute;
		top: 55px;
		right: 0;
		border-radius: 8px;
	}

	#history-btn {
		position: absolute;
		top: 0;
		right: 0;
		border-radius: 8px;
	}
	
	#how-to-play {
		position: absolute;
		top: 25px;
		right: 20px;
	}
	
	#button-profile_app {
		position: absolute;
		top: 55px;
		left: 0;
		border-radius: 8px;
	}
	
	#button-upgrade-tree {
		position: absolute;
		top: 110px;
		left: 0;
		border-radius: 8px;
	}
	
	#button-shop_app {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 8px;
	}
</style>