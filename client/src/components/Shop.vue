<template>
	<v-card
		theme="dark">
		<v-toolbar
		class="align-end"
			density="comfortable">
			<v-progress-linear
				v-if="loading"
				indeterminate
				absolute
				bottom
				color="amber"/>
			
			<v-toolbar-title
				class="ml-16">
				Магазин
			</v-toolbar-title>
			<v-spacer />
			
			<v-btn
				icon
				@click="close">
				<IconClose
					size="x-small"
					color="white"/>
			</v-btn>
		</v-toolbar>
		<v-container>
			<p class="text-medium-emphasis text-right">
				Баланс: {{dCoins}}<DCoinIcon />
			</p>
		</v-container>
		
		<v-container>
			<v-list>
				<div
					v-for="category in categories">
					<p class="text-overline text-medium-emphasis" style="padding-left: 20px;">
						{{category.name}}
					</p>
					<div
						class="shop-grid">
						<ItemCard
							v-for="item in category.items"
							:buyItem="buyItem"
							:canBuy="true"
							place="shop"
							:isInCollection="Boolean(collection.find(c => c.category === item.category && c.id === item.id))"
							:item="item"/>
					</div>
				</div>
			</v-list>
		</v-container>
	</v-card>
</template>

<script>
	import ItemCard from "/src/components/ItemCard.vue"
	import IconClose from "/src/components/icons/Close.vue"
	import DCoinIcon from "/src/components/icons/DCoin.vue"
	
	export default {
		data (){
			return {
				loading: true,
				categories: {}
			}
		},
		
		async mounted(){
			this.categories = (await (await fetch(this.host + "/api/get-shop")).json()).shop
			
			// Magic
			let ids = [].concat.apply([], Object.entries(this.categories).map(c => {
				return c[1].items.map(i => Object.assign({category: c[0]}, i))
			})).map(i => i.category + "." + i.id)
			
			let items = (await (await fetch(this.host + "/api/get-items-info?ids=" + ids.join(","))).json()).items.map((item, index) => {
				item.id = ids[index].split(".")[1]
				item.category = ids[index].split(".")[0]
				return item
			})
			
			for (let item of items){
				Object.assign(this.categories[item.category].items.find(i => i.id == item.id), item)
			}
			
			this.loading = false
		},
		
		methods: {
			async buyItem(item){
				try {
					let res = (await (await fetch(this.host + "/api/buy-item?id=" + item.category + "." + item.id)).json()).status
					console.log(res)
				} catch (e) {
					console.log("err")
				}
				
				this.$emit("updateData")
			}
		},
		
		props: {
			host: String,
			close: Function,
			dCoins: Number,
			collection: Array
		},
		
		components: {
			ItemCard, IconClose, DCoinIcon
		}
	}
</script>

<style>
	.shop-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 10px;
		justify-items: center;
	}
</style>