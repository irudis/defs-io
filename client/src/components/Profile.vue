<template>
	<v-card
		theme="dark">
		<v-toolbar
			density="comfortable">
			<v-progress-linear
				v-if="!profile.id"
				indeterminate
				absolute
				bottom
				color="amber"/>
			<v-toolbar-title
				class="ml-16">
				Профиль
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
		<v-container
			v-if="profile.id">
			<v-card
				color="teal-darken-4">
				<v-card-text>
					<v-row>
						<v-col
							align-self="center"
							:image="vkUser.avatar"
							class="me-auto"
							cols="auto">
							<v-avatar
								color="teal-accent-4"/>
						</v-col>
						<v-col
							align-self="center">
							<p>{{vkUser.name ? vkUser.name : `@id${profile.id}`}}</p>
							<p>{{profile.role.toUpperCase()}}</p>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
			<br/>
			<v-card
				color="teal-darken-4"
				subtitle="Основная информация">
				<v-card-text>
					<p>DCoins: {{profile.dCoins}}<DCoinIcon/></p>
					<p>Количество игр: {{profile.gamesCount}}</p>
				</v-card-text>
			</v-card>
		</v-container>
		
		<v-container
			v-if="profile.id">
			<v-list>
				<v-list-item
					v-for="category of categories">
					<p class="text-overline text-medium-emphasis" style="padding-left: 20px;">
						{{category.name}} ➔
					</p>
					<div
						style="overflow-x: scroll"
						class="collection-grid">
						<ItemCard
							v-for="item in profile.collection.filter(c => c.category === category.code)"
							:buyItem="buyItem"
							:canBuy="true"
							place="collection"
							@select="() => selectItem(item)"
							:selected="profile[category.code] == item.id"
							:item="item"/>
					</div>
				</v-list-item>
			</v-list>
		</v-container>
	</v-card>
</template>

<script>
	import bridge from "@vkontakte/vk-bridge"
	
	import ItemCard from "/src/components/ItemCard.vue"
	import IconClose from "/src/components/icons/Close.vue"
	import DCoinIcon from "/src/components/icons/DCoin.vue"
	
	export default {
		data (){
			return {
				loading: true,
				vkUser: {
					avatar: null,
					name: null
				},
				categories: [{
					name: "Шляпы",
					code: "hat"
				}, 
				{
					name: "Следы",
					code: "track"
				}]
			}
		},
		
		async mounted(){
			const unwatch = this.$watch("profile", async () => {
				const vkUser = ( await bridge.send('VKWebAppCallAPIMethod', {
					method: 'users.get',
					params: {
						user_ids: this.profile.id,
						v: bridge.apiV,
						fields: "photo_100",
						access_token: bridge.token
					}
				}) ).response[0]
				
				this.vkUser = {
					name: `${vkUser.first_name} ${vkUser.last_name}`,
					avatar: vkUser.photo_100
				}
				
				unwatch()
			})
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
			},
			
			async selectItem(item){
				try {
					let res = (await (await fetch(this.host + "/api/select-item?id=" + item.category + "." + item.id)).json()).status
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
			profile: Object
		},
		
		components: {
			ItemCard, IconClose, DCoinIcon
		}
	}
</script>

<style>
	.collection-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
		grid-auto-flow: column;
		grid-auto-columns: minmax(160px,1fr);
		gap: 10px;
	}
</style>