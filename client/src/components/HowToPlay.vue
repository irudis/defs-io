<template>
		<v-card>
			<v-window
				v-model="model">
				<v-window-item>
					<v-img
						src="/howtoplay0.png"></v-img>
					<v-card-title>
						Цель игры
					</v-card-title>
					<v-card-text>
						Построить базу, которая сможет отбить как можно больше волн врагов.
						Добывайте ресурсы и улучшайте постройки, чтобы достичь высот!
						<br />
						<br />
						<p
							class="font-weight-light">Листай вправо!</p>
					</v-card-text>
				</v-window-item>
				
				<v-window-item>
					<v-img
						src="/howtoplay1.png"></v-img>
					<v-card-title>
						Ресурсы
					</v-card-title>
					<v-card-text>
						Камень и дерево можно получить оружием из деревьев и скал на карте, а золото 
						добывается самостоятельно из построенных Вами золотых шахт
					</v-card-text>
				</v-window-item>
				
				<v-window-item>
					<v-img
						src="/howtoplay2.png"></v-img>
					<v-card-title>
						Враги
					</v-card-title>
					<v-card-text>
						Каждую игровую ночь на Вашу базу идут враги - тем сильнее, чем выше Ваша волна.
						Вы можете положиться на свою базу или помочь в отбивании нечисти своим оружием.
					</v-card-text>
				</v-window-item>
				
				<v-window-item>
					<v-img
						src="/howtoplay3.png"></v-img>
					<v-card-title>
						Оффлайн и таймеры (1)
					</v-card-title>
					<v-card-text>
						Если Вы построили базу, в надежности которой в ближайшие волны уверены, то можете спокойно
						закрыть игру - Ваш персонаж останется на сервере (который в меню будет выделен), а на базу продолжат идти враги.
					</v-card-text>
				</v-window-item>
				
				<v-window-item>
					<v-img
						src="/howtoplay4.png"></v-img>
					<v-card-title>
						Оффлайн и таймеры (2)
					</v-card-title>
					<v-card-text>
						Но не оставляйте персонажа слишком долго! При этом можно взять таймер,
						который на определенное количество ночей защитит базу от врагов.
					</v-card-text>
				</v-window-item>
				
				<v-window-item>
					<v-img
						src="/howtoplay5.png"></v-img>
					<v-card-title>
						Внеигровые механики
					</v-card-title>
					<v-card-text>
						Как только база будет уничтожена, Вы получите на свой счет <DCoinIcon/> DCoin - игровую валюту
						<br/><br/>
						Ее вы можете потратить на игровые декораторы, либо же <s>купить усиления</s> (В РАЗРАБОТКЕ)
					</v-card-text>
				</v-window-item>
			</v-window>
		</v-card>
</template>

<script>
	import DCoinIcon from "/src/components/icons/DCoin.vue"
	
	export default {
		data (){
			return {
				model: 0
			}
		},
		
		props: {
			host: String
		},
		
		components: {
			DCoinIcon
		}
	}
</script>

<style>
</style>