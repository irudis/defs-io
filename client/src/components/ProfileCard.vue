<template>
	<v-dialog
		:activator="activator"
		max-width="350px"
		class="__profile-card">
		<v-card
			color="rgba(0,0,0,0.7)"
			theme="dark"
			class="elevation-0 __profile-card__card">
			<v-tabs
				fixed-tabs
				v-model="tab"
				density="compact">
				<v-tab
					v-for="tab in tabs"
					:value="tab.id"
					min-width="0">
					<component
						:is="tab.icon"
						color="white" />
				</v-tab>
			</v-tabs>
			
			<!-- Tabs -->
			
			<v-window
				touchless 
				v-model="tab">
				<!--  WEAPONS -->
				<v-window-item
					value="weapons">
					<v-card-item>
						<div
							v-if="weapons"
							v-for="(weapon, i) in weapons">
							
							<p class="text-caption text-center">
								{{names[weapon.code]}} (уровень {{weapon.level}}) {{weapon.level >= weapon.maxLevel ? " MAX" : ""}}
							</p>
							
							<div
								style="display: flex; align-items: center; padding-top: 12px">
								<v-avatar
									:image="assets[weapon.code]"
									rounded="0"/>
									
								<p class="text-caption" style="line-height: 1em; flex: 1; margin-left: 10px">
									Урон: {{weapon.damage}} <br/>
									Добыча: {{weapon.mine}}
								</p>
								
								<div
									style="text-align: center;">
									<v-btn
										variant="tonal"
										@click="upgrade(weapon.id)"
										size="x-small">
										Улучшить
									</v-btn>
									<p
										class="text-caption text-medium-emphasis"
										style="font-size: 0.65em !important;">
										({{weapon.level < weapon.maxLevel ? getShortNumber(weapon.upgradeCost) : "- - -"}} зол.)
									</p>
								</div>
							</div>
							
							<br
								v-if="i + 1 !== weapons.length"/>
						</div>
						
					</v-card-item>
				</v-window-item>
				
				<!-- PETS -->
				<!-- <v-window-item
					value="pets">
					<p class="text-button text-center">coming soon</p>
				</v-window-item> -->
				
				<!-- TIMERS -->
				<v-window-item
					value="timer">
					<v-card-item>
						<div
							v-if="timers"
							v-for="(timer, i) in timers"
							:style="`opacity: ${getTimerStatus(timer)};`">
							
							<p class="text-caption text-center">
								{{timer.waves + (timer.waves === 1 ? " ночь" : " ночей")}} без врагов
							</p>
							
							<v-row
								style="padding-top: 4px"
								no-gutters>
								<v-col
									align-self="center"
									class=" flex-shrink-1 flex-grow-0">
									<p
										class="text-caption text-medium-emphasis"
										style="white-space: nowrap;;">
										Статус: {{timer.inUse ? 'активен' : timer.cd ? 'откат' : 'доступен'}} <br/>
										<p v-if="timer.inUse || timer.cd">
											Осталось волн: {{timer.inUse ? 
													timer.waves - timer.wavesPassed : 
													timer.cd}}
										</p>
									</p>
								</v-col>
								<v-col
									align-self="center"
									style="padding-left: 16px;"
									class="flex-grow-1 flex-shrink-0">
									<v-progress-linear
										v-if="timer.inUse || timer.cd"
										height="7"
										:model-value="timer.inUse ? 
													timer.waves - timer.wavesPassed : 
													timer.cd"
										:max="timer.inUse ? timer.waves : 0"
										:color="`hsl(${timer.waves * 70}deg 50% 50%)`"/>
									<div
										v-else>
										
										<v-btn
											block
											size="small"
											@click="buyTimer(timer.id)"
											:disabled="getTimerStatus(timer) !== 1"
											variant="tonal">
											Купить
										</v-btn>
										
										<p
											class="text-caption text-medium-emphasis text-center"
											style="font-size: 0.65em !important;">
											({{getShortNumber(timer.gold)}} зол.)
										</p>
									</div>
								</v-col>
							</v-row>
							<!-- 
							<div
								style="display: flex; align-items: center; padding-top: 12px">
								<v-avatar
									:image="assets[weapon.code]"
									rounded="0"/>
									
								<p class="text-caption" style="line-height: 1em; flex: 1; margin-left: 10px">
									Урон: {{weapon.damage}} <br/>
									Добыча: {{weapon.mine}}
								</p>
								
								<div
									style="text-align: center;">
									<v-btn
										variant="tonal"
										@click="upgrade(weapon.id)"
										size="x-small">
										Улучшить
									</v-btn>
									<p
										class="text-caption text-medium-emphasis"
										style="font-size: 0.65em !important;">
										({{weapon.level < weapon.maxLevel ? getShortNumber(weapon.upgradeCost) : "- - -"}} зол.)
									</p>
								</div>
							</div> -->
							
							<br
								v-if="i + 1 !== timers.length"/>
						</div>
						
					</v-card-item>
				</v-window-item>
				
				<v-window-item
					value="settings">
					<v-card-text
						style="line-height: normal;"
						class=" text-body">
						<p
							class="text-button text-medium-emphasis">
							Параметры
						</p>
						<v-row>
							<v-col
								cols="auto"
								class="flex-1-0"
								align-self="center">
								Инвертировать управление
							</v-col>
							<v-col
								align-self="center"
								cols="auto"
								class="me-auto">
								<v-switch
									color="amber"
									v-model="invertControl"
									hide-details
									density="compact"/>
							</v-col>
						</v-row>
						<v-divider
							thickness="2"></v-divider>
						<v-row
							class="ma-0">
							<v-col
								class="pa-1"
								align-self="center">
								<v-btn
									color="teal-darken-3"
									@click="reload"
									block>
									Выйти
								</v-btn>
							</v-col>
							<v-col
								align-self="center"
								class="pa-1">
								<v-btn
									color="red-darken-3"
									block>
									Сдаться
								</v-btn>
							</v-col>
						</v-row>
					</v-card-text>
				</v-window-item>
			</v-window>
		</v-card>
	</v-dialog>
</template>

<script>
	import { markRaw, watch } from "vue"
	import WeaponsIcon from "/src/components/icons/Weapons.vue"
	import PetsIcon from "/src/components/icons/Pets.vue"
	import SettingsIcon from "/src/components/icons/Settings.vue"
	import ShieldTimerIcon from "/src/components/icons/ShieldTimer.vue"

	import axeAsset from "/src/assets/weapons/axe.png"
	import swordAsset from "/src/assets/weapons/sword.png"
	
	export default {
		data (){
			return {
				tabs: [{
					id: "weapons",
					icon: markRaw(WeaponsIcon)
				}, /* {
					id: "pets",
					icon: markRaw(PetsIcon)
				}, */{
					id: "timer",
					icon: markRaw(ShieldTimerIcon)
				}, {
					id: "settings",
					icon: markRaw(SettingsIcon)
				}],
				tab: "weapons",
				
				assets: {
					axe: axeAsset,
					sword: swordAsset
				},
				names: {
					axe: "Топор",
					sword: "Меч"
				},
				
				invertControl: localStorage.getItem("invertControl") === "true"
			}
		},
		
		mounted(){
			const unwatch = this.$watch("invertControl", () => {
				this.$emit("invertControl", this.invertControl)
				localStorage.setItem("invertControl", String(this.invertControl))
			})
			
			this.$emit("invertControl", this.invertControl)
		},
		
		methods: {
			getTimerStatus(timer){
				let timerInUse = this.timers.find(t => t.inUse)
				if (timer.cd || timerInUse && timer !== timerInUse) return 0.45 
				return 1
			},
			
			reload(){
				window.location.reload()
			}
		},
		
		props: {
			activator: String,
			weapons: Array,
			timers: Array,
			upgrade: Function,
			buyTimer: Function,
			getShortNumber: Function
		}
	}
</script>

<style>
	.__profile-card {
		line-height: normal;
	}
</style>