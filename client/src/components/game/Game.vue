<template>
	<div id="pixi-container" ref="pixi-container">
		<div id="day-timer">
			<v-progress-circular
				model-value="33"
				:rotate="360 * timeExpired"
				size="30"
				width="15"
				color="#252850"
		    />
			<div id="day-timer-helper" />
		</div>
		
		<v-btn
			v-show="!selectedBuilding"
			variant="tonal"
			hidden
			icon
			v-touch="{
				start: () => attack(true),
				end: () => {this.attack(false); this.attackLocked = false}
			}"
			size="x-large"
			:id="invertControl ? 'button-attack-inverted' : 'button-attack'">
			<SwordIcon />
		</v-btn>
		
		<v-btn
			v-show="!selectedBuilding"
			variant="tonal"
			icon
			@click="attack()"
			size="x-small"
			:id="invertControl ? 'button-attack-locker-inverted' : 'button-attack-locker'">
			<p
				class="text-white">
				A
			</p>
		</v-btn>
		
		<v-btn
			v-show="!selectedBuilding"
			variant="tonal"
			icon
			:id="invertControl ? 'button-profile-invert' : 'button-profile'">
			<ProfileIcon />
			<ProfileCard
				activator="parent"
				@invertControl="(arg) => invertControl = arg"
				:upgrade="(id) => {
					this.game.emit({
						upgradeWeapon: id
					})
				}"
				:buyTimer="(id) => {
					this.game.emit({
						buyTimer: id
					})
				}"
				:getShortNumber="getShortNumber"
				:weapons="game && game.self && game.self.weapons"
				:timers="game && game.self && game.self.timers"/>
		</v-btn>
		
		<v-card
			v-show="!selectedBuilding  && $refs"
			variant="flat"
			v-on:click="() => game.resize(1)"
			id="button-resize-plus">
			-
		</v-card>
		<v-card
			v-show="!selectedBuilding  && $refs"
			variant="flat"
			v-on:click="() => game.resize(-1)"
			id="button-resize-minus">
			+
		</v-card>
		
		<v-btn
			:variant="selectedBuilding === null ? 'tonal' : 'flat'"
			:color="selectedBuilding === null ? '' : 'rgba(200,0,0,0.5)'"
			icon
			@click="onOpenBuildingsSelector"
			:id="invertControl ? 'button-build-invert' : 'button-build'">
			<HammerIcon v-if="selectedBuilding === null"/>
			<BuildingIcon
				v-else
				ref="current"
				:asset="game && game.loaded && game.buildings[selectedBuilding].asset"
				:count="[game && __crutch && 
						game.world &&
						game.self && 
						Object.values(game.world.entities).filter(e => {
							return e.type === game.buildings[selectedBuilding].id && e.ownerId ===game.self.id
						}).length || 0, game.buildings[selectedBuilding].max]"/>
		</v-btn>
		
		<v-menu 
			transition="slide-x-transition"
			persistent
			no-click-animation
			activator="#button-build"
			location="right">
			<div
				v-if="game.loaded"
				class="d-flex"
				border="0"
				elevation="0"
				bg-color="rgba(0,0,0,0)">
				<div
					v-for="(building, i) in game.buildings"
					:key="i"
					class="pl-1">
					
					<v-btn
						variant="tonal"
						icon
						size="large"
						:disabled="!canBuild(building)"
						@click="selectBuilding(i, building.id)"
						id="build-item">
						
						<BuildingIcon
							:asset="building.asset"
							:count="[getCountOfBuilding(building), building.max]"/>
					</v-btn>
				</div>
			</div>
		</v-menu>
		
		
		<v-btn
			v-show="!selectedBuilding"
			hid
			variant="tonal"
			icon
			@click="weapon=(weapon === 1 ? 2 : 1), game.emit({weapon})"
			:id="invertControl ? 'button-weapons-inverted' : 'button-weapons'">
			<WeaponIcon />
		</v-btn>
		
		<!--  <v-menu 
			transition="slide-x-transition"
			ref="weapon-list"
			persistent
			no-click-animation
			activator="#button-weapons-DEACTIVATED"
			location="top">
			<v-list
				v-if="game.loaded"
				border="0"
				elevation="0"
				bg-color="rgba(0,0,0,0)">
				<v-list-item
					v-for="(weapon, i) in weapons"
					:key="i"
					class="zero-padding">
					
					<v-btn
						:variant="i + 1=== game.self.weapon ? 'flat' : 'tonal'"
						icon
						:color="i + 1=== game.self.weapon ? 'green' : null"
						size="large"
						@click="game.emit({weapon: i + 1})"
						id="weapon-item">
							
						<img
							class="img-icon"
							:src="weapon" />
					</v-btn>
				</v-list-item>
			</v-list>
		</v-menu> -->
		
		<InGameLeaderboard
			:self="game && game.self"
			:players="players"/>
			
		
		<v-slide-y-reverse-transition>
			<InGameBuildingCard
				v-if="buildingMenu"
				id="building-menu"
				:upgradeBuilding="() => {
					this.game.emit({
						upgradeBuilding: this.buildingMenu.id
					})
				}"
				:sellBuilding="() => {
					this.game.emit({
						sellBuilding: this.buildingMenu.id
					})
				}"
				:self="game && game.self"
				:getCountOfBuilding="getCountOfBuilding"
				:getShortNumber="getShortNumber"
				:entities="game && game.world.entities"
				:buildingMenuOnClose="buildingMenuOnClose"
				:inventory="inventory"
				:buildingMenu="buildingMenu"/>
		</v-slide-y-reverse-transition>
		
		<v-btn
			v-show="selectedBuilding !== null"
			variant="flat"
			hidden
			icon
			@click="accessBuilding()"
			size="large"
			color="success"
			:id="invertControl && 'access-button-build-inverted' || 'access-button-build'">
			<OkIcon />
		</v-btn>
		
		
		<v-card
			id="inventory-card"
			class="elevation-0">
			<p class="text-caption">
				{{getShortNumber(inventory.gold)}} <GoldCoinIcon />
				{{getShortNumber(inventory.wood)}} <WoodIcon />
				{{getShortNumber(inventory.stone)}} <StoneIcon />
			</p>
		</v-card>
		
		<v-dialog
			transition="dialog-bottom-transition"
			persistent
			no-click-animation
			v-model="closed">
			<v-card
				title="Игра окончена"
				theme="dark">
				<p class="text-overline" style=" margin: 10px; text-align: center;">
					{{closed}} <br />
					Волна: {{game.self.wave}}
				</p>
				<v-spacer></v-spacer>
				<v-btn
					variant="tonal"
					@click="reload"
					color="red">
					Перезапустить
				</v-btn>
			</v-card>
		</v-dialog>
	</div>
	
	<v-dialog
		v-model="loading"
		theme="dark"
		no-click-animation
		width="auto"
		persistent>
		<v-container
			theme="dark"
			class="text-center pa-4 animated-random-border">
			<v-progress-circular
				indeterminate
				color="amber"/>
			<p
				class="text-button text-white">
				Загрузка
			</p>
		</v-container>
	</v-dialog>
</template>

<script>
	import GameEngine from '/src/components/game/game.js'
	
	import ProfileCard from "/src/components/ProfileCard.vue"
	import InGameLeaderboard from "/src/components/InGameLeaderboard.vue"
	import InGameBuildingCard from "/src/components/InGameBuildingCard.vue"
	
	import HammerIcon from '/src/components/icons/Hammer.vue'
	import SwordIcon from '/src/components/icons/Sword.vue'
	import ProfileIcon from '/src/components/icons/Profile.vue'
	import WeaponIcon from '/src/components/icons/Weapon.vue'
	
	import OkIcon from "/src/components/icons/Ok.vue"
	
	import GoldCoinIcon from '/src/components/icons/GoldCoin.vue'
	import WoodIcon from '/src/components/icons/Wood.vue'
	import StoneIcon from '/src/components/icons/Stone.vue'
	
	import BuildingIcon from '/src/components/icons/BuildingIcon.vue'
	import { reactive } from 'vue'
	
	
	export default {
		data(){
			return {
				__crutch: 1,
				renderer: null,
				game: null,
				selectingBuilding: false,
				selectedBuilding: null,
				buildingMenu: false,
				timeExpired: 0,
				weapons: [],
				players: reactive([]),
				inventory: {
					gold: 0,
					wood: 0,
					stone: 0
				},
				weapon: 1,
				buildingMenuOnClose: null,
				closed: false,
				loading: true,
				attackLocked: false,
				invertControl: false
			}
		},
		
		async mounted() {
			const game = new GameEngine({
				gameVue: this,
				disableGpu: this.disableGpu
			})
			await game.init({
				server: this.server,
				name: this.name
			})
			this.game = game
			this.$refs["pixi-container"].appendChild(game.app.renderer.view)
		},
		
		props: {
			server: {
				type: Object
			},
			name: {
				type: String
			},
			panel: {
				type: String
			},
			disableGpu: Boolean
		},
		
		methods: {
			onOpenBuildingsSelector(){
				if (!this.game) return
				if (this.selectedBuilding !== null){
					this.selectingBuilding = false
					this.selectedBuilding = null
					this.game.stopBuilding()
					this.game.joystick.enable()
				} else {
					this.selectingBuilding = !this.selectingBuilding
				}
			},
			
			selectBuilding(i, id){
				if (!this.game) return
				this.selectedBuilding = i
				this.selectingBuilding = false
				this.game.__startBuilding = id
			},
			
			getShortNumber(n){
				let w = ""
				if (n >= 1000){
					n /= 1000
					w = "К"
				}
				if (n >= 1000){
					n /= 1000
					w = "м"
				}
				return w ? Number(n.toFixed(1)) + w : n
			},
			
			accessBuilding(){
				this.game.emit({
					build: {
						id: this.game.buildingNow._bStat.id,
						position: {
							x: this.game.buildingNow.x,
							y: this.game.buildingNow.y
						}
					}
				})
			},
			
			attack(v){
				if (v === undefined){
					this.attackLocked = !this.attackLocked
					v = this.attackLocked
				}
				this.game.emit({
					attack: v 
				})
			},
			
			reload(){
				location.reload()
			},
			
			getCountOfBuilding(building){
				return this.game && this.game.world && this.game.self && 
							Object.values(this.game.world.entities).filter(e => {
								return e.type === building.id && e.ownerId ===this.game.self.id
							}).length || 0
			},
			
			canBuild(building){
				let count = this.getCountOfBuilding(building)
				
				if (count >= building.max) return false
				
				if (building.id !== 1 && this.getCountOfBuilding({id: 1}) === 0) return false
				
				return true
			}
		},
		
		components: {
			HammerIcon, BuildingIcon, GoldCoinIcon,
			WoodIcon, StoneIcon, SwordIcon, ProfileIcon, WeaponIcon, OkIcon,
			ProfileCard, InGameLeaderboard, InGameBuildingCard
		}
	}
</script>

<style>
	#pixi-container {
		position: static;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0;
		padding: 0;
	}
	
	#button-build2 {
		border-radius: 5px;
	}
	.zero-padding {
	  padding: 0 !important;
	}
	
	#weapon-item, #build-item {
		margin-top: -1px;
		border-radius: 5px;
	}
	
	#building-menu {
		line-height: normal;
		text-align: left;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
		padding: 10px;
		background: rgba(190, 190, 190, 0.7);
	}
	
	#upgrading-info {
		background: rgba(0, 0, 0, 0.1);
		margin-bottom: 10px;
		padding: 7px;
	}
	.arrow-right-upgrade {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate( calc(-50% - 10px), -50%);
		margin: 0;
		padding: 0;
	}
	
	#day-timer{
		position: absolute;
		top: 10px;
		right: 100px;
		border-radius: 50%;
		background: #f9d71c;
		opacity: 0.5;
		border: 2px solid #252850;
	}
	#day-timer-helper{
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%));
		width: 2px;
		background: white;
		height: 50%;
	}
	
	#inventory-card {
		line-height: normal;
		text-align: left;
		position: absolute;
		top: 10px;
		left: 50px;
		padding: 5px;
		text-align: right;
		background: rgba(190, 190, 190, 0.6);
	}
	
	#button-attack, #button-attack-inverted {
		position: absolute;
		bottom: 30px;
		-webkit-user-select: none;
		-webkit-touch-callout: none;
	}
	#button-attack { right: 30px; }
	#button-attack-inverted { left: 30px; }
	
	
	#button-attack-locker, #button-attack-locker-inverted {
		position: absolute;
		bottom: 100px;
	}
	#button-attack-locker { right: 20px; }
	#button-attack-locker-inverted { left: 20px; }
	
	
	
	#button-build, #button-build-invert {
		bottom: 130px;
		border-radius: 5px;
		padding: 0;
		position: absolute;
		transform: translate(2px, 0);
	}
	#button-build { left: 10px; }
	#button-build-invert { right: 10px; }
	
	
	#access-button-build, #access-button-build-inverted {
		bottom: 70px;
		border-radius: 5px;
		padding: 0;
		position: absolute;
		transform: translate(2px, 0);
	}
	#access-button-build {
		right: 30px;
	}
	#access-button-build-inverted {
		left: 30px;
	}
	
	#button-weapons, #button-weapons-inverted {
		bottom: 10px;
		padding: 0;
		position: absolute;
		transform: translate(2px, 0);
	}
	#button-weapons { right: 120px; }
	#button-weapons-inverted { left: 120px; }
	
	
	#button-profile, #button-profile-invert {
		bottom: 190px;
		border-radius: 5px;
		padding: 0;
		position: absolute;
		transform: translate(2px, 0);
	}
	#button-profile { left: 10px; }
	#button-profile-invert { right: 10px; }
	
	
	#button-resize-plus, #button-resize-minus {
		border-radius: 5px;
		top: 10px;
		padding: 0;
		position: absolute;
		transform: translate(2px, 0);
		background: rgba(190, 190, 190, 0.6);
		width: 30px;
		line-height: 30px;
		height: 30px;
	}
	#button-resize-plus {
		right: 10px;
	}
	#button-resize-minus {
		right: 40px;
	}
	
	.img-icon {
		margin: 10px;
		width: calc(100% - 20px);
		height: calc(100% - 20px);
	}
	
	#leaderboard {
		position: absolute;
		top: 45px;
		left: 50px;
		padding: 0 5px;
		line-height: normal;
	}
	@keyframes border {
		0% {
  border-radius: 50% 50% 50% 70%/50% 50% 70% 60%;
		}

		33% {
  border-radius: 80% 30% 50% 50%/50%;
		}
		
		66% {
  border-radius: 40% 40% 50% 40%/30% 50% 50% 50%;
		}
		
		100% {
  border-radius: 50% 50% 50% 70%/50% 50% 70% 60%;
		}
	}
	.animated-random-border {
		background: black;
		animation-name: border;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: steps(3, ease-in-out);;
	}
</style>