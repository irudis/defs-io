<template>
	<v-card
		variant="flat"
		color="rgba(255, 255, 255, 0.2)"
		style="transition-duration: 1000ms;"
		:ripple="false"
		v-on:click="showLeaderboard = !showLeaderboard"
		id="leaderboard">
		<p class="text-overline">Лидеры</p>
		<v-expand-transition>
			<div v-show="showLeaderboard">
				<table style="width: 200px">
					<tbody>
						<p
							class="text-caption">
							<td style="width: 100%; text-align: left;">
								Имя
							</td>
							<td>
								Волна
							</td>
						</p>
					
						<tr
							v-for="(player) in computedPlayers">
							<p
								class="text-caption"
								:style="'margin: -4px 0; font-weight: ' + (self === player ? 'bold' : 'normal')">
								<td style="width: 100%; text-align: left;">
									{{player.place + ": " + player.name}}
								</td>
								<td>
									{{player.wave}}
								</td>
							</p>
						</tr>
					</tbody>
				</table>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
	export default{
		data() {
			return {
				showLeaderboard: false
			}
		},
		
		computed: {
			computedPlayers () {
				let players = this.players.sort((a, b) => {
					return b.wave- a.wave
				})
				console.log("Sort", players.length)
				for (let i = 0; i < players.length; i++){
					players[i].place = i+1
				}
				players = players.slice(0,4)
				if (this.self && !players.find(p => p ===this.self)){
					players.push(this.self)
				}
				return players
			}
		},
		
		props: {
			players: Array,
			self: Object
		}
	}
</script>

<style>
</style>