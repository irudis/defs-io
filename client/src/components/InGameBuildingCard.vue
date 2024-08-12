<template>
	<v-card
				v-if="buildingMenu"
		:id="id" 
		class="elevation-0">
		
		<v-toolbar
			density="compact"
			color="rgba(0, 0, 0, 0)">

			<p class="text-button">
				{{buildingMenu._bStat.name}}
			</p>

			<template v-slot:append>
				<v-btn
					icon
					size="x-small"
					@click="buildingMenuOnClose()">
					<ClsoeIcon />
				</v-btn>
			</template>
		</v-toolbar>
				  
		
		
		<div id="upgrading-info">
			<div style="position: relative;">
				<v-row no-gutters style="padding: 3px;">
					<v-col>
						<p class="text-body-2">
							Уровень {{buildingMenu.level}}
						</p>
					</v-col>
					<v-col>
						<p class="text-body-2"> 
							<div v-if="buildingMenu.level < buildingMenu._bStat.maxLevel">
								Уровень {{buildingMenu.level+1}}
							</div>
							<div v-else>
								MAX
							</div>
						</p>
					</v-col>
				</v-row>
				<ArrowRightIcon class="arrow-right-upgrade" />
			</div>
			<div
				style="position: relative;"
				v-for="param in Object.keys(buildingMenu._bStat.upgrade)">
				<v-row no-gutters style="padding: 3px;">
					<v-col>
						<p class="text-body-2"> {{ 
							getParamName(param) + ": " +
							getShortNumber(buildingMenu
								._bStat
								.upgrade[param][buildingMenu.level-1])
						}} </p>
					</v-col>
					<v-col>
						<p class="text-body-2"> 
							<div v-if="buildingMenu.level < buildingMenu._bStat.maxLevel">
								{{
									getParamName(param) + ": " +
									getShortNumber(buildingMenu
										._bStat
										.upgrade[param][buildingMenu.level])
								}}
							</div>
							<div v-else>
								MAX
							</div>
						</p>
					</v-col>
				</v-row>
				<ArrowRightIcon class="arrow-right-upgrade" />
			</div>
		</div>
		<v-btn
			block
			size="small"
			class="text-none"
			variant="flat"
			:disabled="!canUpgrade"
			color="success"
			@click="upgradeBuilding()"
			style="margin-bottom: 5px;">
			Улучшить <div v-if="buildingMenu._bStat.maxLevel > buildingMenu.level "> ({{
				Object.keys(buildingMenu
					._bStat
					.upgradeCost)
					.map(k => {
						return getShortNumber(buildingMenu
								._bStat
								.upgradeCost[k][buildingMenu.level - 1]) +
							" " + getParamName(k)
					}).join(", ")
				}}) </div>
		</v-btn>
		<v-btn
			block
			class="text-none"
			size="small"
			variant="flat"
			@click="sellBuilding()"
			:disabled="buildingMenu._bStat.id === 1"
			color="red">
			Продать
		</v-btn>
	</v-card>
</template>

<script>
	import ClsoeIcon from '/src/components/icons/Close.vue'
	import ArrowRightIcon from '/src/components/icons/ArrowRight.vue'
	
	export default {
		methods: {
			getParamName(param){
				switch(param){
					case "maxHealth": return "HP";
					case "power": return "Урон";
					case "minePerSecond": return "Добыча";
					case "gold": return "зол."
					case "wood": return "дер."
					case "stone": return "кам."
					default: return param;
				}
			}
		},
		
		computed: {
			canUpgrade(){
				if (!this.buildingMenu) return false
				
				let required = []
				if (this.buildingMenu.level + 1 > this.buildingMenu._bStat.maxLevel) return false
				for (let key of Object.keys(this.buildingMenu._bStat.upgradeCost)){
					let cost = this.buildingMenu._bStat.upgradeCost[key][this.buildingMenu.level - 1]
					if (this.inventory[key] < cost) return false
				}
				
				if (
					this.buildingMenu._bStat.id !== 1 && // само здание не база
					Object.values(this.entities)
					.find(b => {
						return b._bStat && // сущность - здание?
							b.ownerId === this.self.id && // принадлежит самому игроку?
							b._bStat.id === 1 // база?
					}).level <= this.buildingMenu.level
				) return false
				
				return true 
			}
		},
		
		props: {
			buildingMenu: Object | Boolean,
			self: Object,
			getShortNumber: Function,
			entities: Object,
			inventory: Object,
			getCountOfBuilding: Function,
			buildingMenuOnClose: Function | null,
			upgradeBuilding: Function,
			sellBuilding: Function,
			id: String
		},
		
		components: {
			ClsoeIcon, ArrowRightIcon
		}
	}
</script>

<style>
</style>