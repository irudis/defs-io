<template>
	<v-card
		theme="dark">
		<v-toolbar
			density="comfortable">
			<v-progress-linear
				v-if="loading"
				indeterminate
				absolute
				bottom
				color="amber"/>
			
			<v-toolbar-title
				class="ml-16">
				Топ игроков
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
		<v-list>
			<div
				v-for="(player, index) in players">
				<p
					v-if="index === 0 || players[index].wave !== players[index - 1].wave"
					class="text-center text-overline">
					Волна: {{player.wave}}
				</p>
				<v-list-item
					:title="player.vkName"
					:subtitle="`Ник: ${player.name}`"
					@click="open(`https://vk.com/id${player.id}`)"
					class="leaderboard">
					<template v-slot:prepend>
						<v-avatar
							src=player.avatar>
							<v-img
								:src="player.avatar"
								alt=""/>
						</v-avatar>
					</template>
				</v-list-item>
			</div>
		</v-list>
	</v-card>
</template>

<script>
	import bridge from '@vkontakte/vk-bridge'
	import IconClose from "/src/components/icons/Close.vue"
	
	export default {
		data () {
			return {
				players: [],
				loading: true
			}
		},
		
		methods: {
			open(url){
				window.open(url)
			}
		},
		
		async mounted (){
			const players = (await (await fetch(this.host + "/api/get-top")).json()).players
			
			const vkUsers = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'users.get',
				params: {
					user_ids: players.map(p => p.id).join(","),
					v: bridge.apiV,
					fields: "photo_100",
					access_token: bridge.token
				}
			})
			
			this.players = players.map(p => {
				let vkUser = vkUsers.response.find(u => u.id == p.id)
				return Object.assign(p, {
					vkName: `${vkUser.first_name} ${vkUser.last_name}`,
					avatar: vkUser.photo_100
				})
			})
			
			this.loading = false
			// const res = await bridge.send("VKWebAppCallAPIMethod", {
			// 	method: 'users.get',
		},
		
		props: {
			host: String,
			close: Function
		},
		
		components: {
			IconClose
		}
	}
</script>

<style>
</style>