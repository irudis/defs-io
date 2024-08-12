<template>
	<div
		class="item-card">
		<v-fade-transition>
			<div
				class="item-card__back"
				v-on:click="openCard"
				v-show="open" />
		</v-fade-transition>
		<div
			v-on:click="() => !open && openCard()"
			ref="card"
			:style="'height: 100%; background-image:' + (item.background || 'grey')"
			:class="'border item-card__animate text-center bg-teal-darken-4 flex-1-0 overflow-hidden rounded-lg' + (open ? ' item-card__open' : '')">
			<div
				class="item-card__content">
				
				
				<div
					:style="`max-width: ${open ? '100%' :  '90%'};`"
					class="item-card__image-container">
					<div
						class="item-card__image bg-grey-darken-4 rounded-b">
						<img
							:src="item.image"
							style="width: inherit; height: 100%; object-fit: cover; background-position: center center; position: absolute; top: 0; left: 0"
							class=""/>
					</div>
					<div
						v-if="place==='shop' && isInCollection"
						class="item-card__bought-text">
						<v-chip
							color="grey-darken-4"
							variant="flat"
							size="small">
							Куплено
						</v-chip>
					</div>
					<div
						v-if="place==='collection' && selected"
						class="item-card__bought-text">
						<v-chip
							color="light-green-darken-4"
							variant="flat"
							size="small">
							Активно
						</v-chip>
					</div>
					<v-fade-transition
						v-if="place==='shop'">
						<div
							v-show="!open"
							class="item-card__cost-minified">
							<v-chip
								size="small"
								color="grey-darken-4"
								variant="flat">
								{{cost.count}} <component :is="cost.icon" />
							</v-chip>
						</div>
					</v-fade-transition>
				</div>
				
				<div
					class="pa-2">
					<p class="text-subtitle-2">{{item.name || "имяя"}}</p>
					<p
						:class="`item-card__description text-body-2 text-medium-emphasis font-weight-light overflow-hidden ${!open && 'item-card__description__closed'}`">
						{{item.description || "Загрузка..."}}
					</p>
				</div>
				<v-fade-transition>
					<v-btn
						v-if="place==='shop'"
						v-show="open"
						class="item-card__buy-button"
						v-on:click="() => this.buyItem(item)"
						:disabled="!canBuy || isInCollection"
						block>
						Купить за {{cost.count}} <component :is="cost.icon" />
					</v-btn>
					<v-btn
						v-if="place==='collection'"
						v-show="open"
						:color="selected ? 'red-darken-4' : 'light-green-darken-3'"
						class="item-card__buy-button"
						v-on:click="() => $emit('select')"
						:disabled="!canBuy || isInCollection"
						block>
						{{selected ? 'Снять' : "Надеть"}}
					</v-btn>
				</v-fade-transition>
				
				
			</div>
		</div>
	</div>
</template>

<script>
	import DCoinIcon from "/src/components/icons/DCoin.vue"
	
	export default {
		data(){
			return {
				open: false,
				startState: null
			}
		},
		
		computed: {
			cost (){
				if (!this.item.cost) this.item.cost = {
					valute: "dCoins",
					count: 200
				}
				
				let icon = null
				if (this.item.cost.valute === "dCoins"){
					icon = DCoinIcon
				}
				
				return {
					icon,
					count: this.item.cost.count
				}
			}
		},
		
		methods: {
			openCard(){
				let elem = this.$refs.card
				let rect = elem.getBoundingClientRect()
				
				if (this.open){
					elem.style.left = this.startState.left
					elem.style.top = this.startState.top
					elem.style.right = this.startState.right
					elem.style.bottom = this.startState.bottom
					elem.style.transform = ""
					const listener = (event) => {
						if (!this.open){
							elem.style.left =""
							elem.style.top = ""
							elem.style.right =""
							elem.style.bottom = ""
							elem.style.height = "100%"
							
							elem.style.position = ""
							elem.style.zIndex = ""
							this.startState = null
						}
						elem.removeEventListener("transitionend", listener)
					}
					elem.addEventListener('transitionend', listener, false );
				} else {
					if (!this.startState){
						this.startState = {
							left: rect.left + "px",
							top: rect.top + "px",
							right: window.innerWidth - rect.right + "px",
							bottom: window.innerHeight- rect.bottom + "px"
						}
					} else  {
						console.log("Is here", this.startState)
					}
					
					elem.style.left = this.startState.left
					elem.style.top = this.startState.top
					elem.style.right = this.startState.right
					elem.style.bottom = this.startState.bottom
					elem.style.height = ""
					
					let newWidth = window.innerWidth > 300 ? "300px" : `${window.innerWidth}px`
					let newHeight = "400px"
					
					elem.style.position = "fixed"
					elem.style.zIndex = "3"
					
					setTimeout(() => {
						elem.style.left = `calc(50% - calc(${newWidth} / 2))`
						elem.style.right = `calc(50% - calc(${newWidth} / 2))`
						elem.style.top = `calc(50% - calc(${newHeight} / 2))`
						elem.style.bottom = `calc(50% - calc(${newHeight} / 2))`
					})
				}
				this.open = !this.open
			}
		},
		
		props: {
			item: Object,
			buyItem: Function,
			isInCollection: Boolean,
			canBuy: Boolean,
			place: {
				type: String,
				validator: function (value) {
					return ["collection", "shop"].includes(value)
				}
			},
			selected: Boolean
		},
		
		components: {
			DCoinIcon
		}
	}
</script>

<style>
	.item-card {
		height: 240px;
		grid-auto-flow: column;
		min-width: 120px;
		width: 100%;
		max-width: 160px;
		overflow: hidden;
		position: relative;
	}
	.item-card__animate, .item-card__image-container {
		transition: 0.2s ease-in-out;
	}
	
	.item-card__image-container {
		position: relative;
		margin: 10px auto 0 auto;
		width: 90%;
		padding: 0;
		border-radius: 8px;
		overflow: hidden;
	}
	.item-card__image {
		width: 100%;
		padding-bottom: 80%;
		position: relative;
	}
	
	.item-card__bought-text {
		position: absolute;
		top: 8px;
		right: -8px;
	}
	
	.item-card__cost-minified {
		position: absolute;
		bottom: 8px;
		left: -8px;
	}
	
	.item-card__open {
/* 		position: fixed;
		width: min(400px, 100%) !important;
		top: 50%;
		height: 400px;
		transform: translate(-50%, -50%);
		left: 50%; */
	}
	
	.item-card__content {
		position: relative;
		width: inherit;
		height: 100%;
		display: block;
	}
	
	.item-card__buy-button {
		position: absolute !important;
		bottom: 10px;
	}
	
	.item-card__description {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-pack: center;
	}
	
	.item-card__description__closed {
		-webkit-box-orient: vertical;
		-webkit-mask-image: linear-gradient(rgba(0,0,0,1) 70%, rgba(0,0,0,0));
		-webkit-line-clamp: 4;
		line-clamp: 4;
	}
	
	.item-card__back {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
</style>