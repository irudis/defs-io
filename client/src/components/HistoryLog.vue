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
				История игр
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
		<v-list
            v-if="history.length">
            <v-list-item
                v-for="(log, i) in history">
                <v-container>
					<p class="text-body">
						Ник: {{log.name}}
					</p>
					<p class="text-body d-flex">
						Волна: {{log.wave}}
						<div style="width: 8px" />
						<p class="text-medium-emphasis">
							(награда: {{log.reward}} <DCoinIcon/>)
						</p>
					</p>
					
					<p class="text-right text-caption text-medium-emphasis">
						{{log.time}}
					</p>
				</v-container>
				<v-divider
					v-if="i < history.length - 1"/>
            </v-list-item>
        </v-list>
        <p
            v-else
            class="text-h6 text-center fill-height d-flex justify-center align-center center">
            Игр пока нет
        </p>
    </v-card>
</template>

<script>
    import IconClose from "/src/components/icons/Close.vue"
	import DCoinIcon from "/src/components/icons/DCoin.vue"

    export default {
        data () {
            return {
                loading: true,
                history: []
            }
        },

        async mounted(){
			this.history = (await (await fetch(this.host + "/api/get-history")).json()).history
			this.history.reverse()
			
			for (let h of this.history) {
				let time = new Date(h.time)
				h.time = `${time.getDate()} ${time.toLocaleString('default', { month: "short" })} ${time.getFullYear()}, ` + 
						`${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}`
			}

            this.loading = false
        },

        props: {
            host: String,
            close: Function
        },

        components: {
            IconClose, DCoinIcon
        }
    }
</script>

<style>

</style>