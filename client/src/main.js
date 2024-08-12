import { createApp } from 'vue'
import App from './App.vue'
import * as PIXI from "pixi.js"

window.PIXI = PIXI

import bridge from '@vkontakte/vk-bridge'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

let params = new URLSearchParams(window.location.search)
let token = params.get('access_token')

if (token) {
	bridge.token = token
	bridge.apiV = "5.131"
}
bridge.send("VKWebAppInit")

const Point = PIXI.Point

Point.prototype.len = function() {
	return (this.x * this.x + this.y * this.y) ** 0.5
}
Point.prototype.lenTo = function(c) {
	let _scale = c / this.len()
	this.x *= _scale;
	this.y *= _scale;
}
Point.prototype.normalize = function() {
	let length = this.len()
	//Then divide the x and y by the length.
	this.x /= length;
	this.y /= length;
}
Point.prototype.multiplyScalar = function(s) {
	this.x *= s
	this.y *= s
}
// ==== //
let __fetch = window.fetch
window.fetch = async function (url, params) {
	if (!params) params = {}
	if (!params.headers) params.headers = {}
	params.headers["X-Url-Params"] = location.search
	return __fetch(url, params)
}

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "light"
	}
})

createApp(App).use(vuetify).mount('#app')

// window.screen.lockOrientation('landscape')

// console.log(screen.orientation)