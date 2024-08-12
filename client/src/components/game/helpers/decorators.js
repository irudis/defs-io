import * as particles from "@pixi/particle-emitter"
import {Sprite} from "pixi.js"

const config1  = {"color":{"start":"#ff2a04","end":"#050505"},"alpha":{"start":0.67,"end":0},"scale":{"start":0.28,"end":0.01,"minimumScaleMultiplier":1},"speed":{"start":10,"end":0,"minimumSpeedMultiplier":1},"acceleration":{"x":0,"y":0},"maxSpeed":0,"startRotation":{"min":0,"max":360},"noRotation":false,"rotationSpeed":{"min":0,"max":0},"lifetime":{"min":2,"max":3},"blendMode":"normal","frequency":0.01,"emitterLifetime":-1,"maxParticles":100000,"pos":{"x":0,"y":0},"addAtBack":false,"spawnType":"circle","spawnCircle":{"x":0,"y":0,"r":20}}
const config2  = {"color":{"start":"#00FFFF","end":"#FFFFFF"},"alpha":{"start":0.67,"end":0},"scale":{"start":0.28,"end":0.01,"minimumScaleMultiplier":1},"speed":{"start":10,"end":0,"minimumSpeedMultiplier":1},"acceleration":{"x":0,"y":0},"maxSpeed":0,"startRotation":{"min":0,"max":360},"noRotation":false,"rotationSpeed":{"min":0,"max":0},"lifetime":{"min":2,"max":3},"blendMode":"normal","frequency":0.01,"emitterLifetime":-1,"maxParticles":100000,"pos":{"x":0,"y":0},"addAtBack":false,"spawnType":"circle","spawnCircle":{"x":0,"y":0,"r":20}}
const configSnow  = {"color":{"start":"#aaaaff","end":"#ffffff"},"alpha":{"start":0.67,"end":0},"scale":{"start":0.28,"end":0.01,"minimumScaleMultiplier":1},"speed":{"start":100,"end":0,"minimumSpeedMultiplier":1},"acceleration":{"x":0,"y":0},"maxSpeed":0,"startRotation":{"min":0,"max":360},"noRotation":false,"rotationSpeed":{"min":0,"max":0},"lifetime":{"min":0.7,"max":1},"blendMode":"normal","frequency":0.01,"emitterLifetime":-1,"maxParticles":100000,"pos":{"x":0,"y":0},"addAtBack":false,"spawnType":"circle","spawnCircle":{"x":0,"y":0,"r":20}}
const configPoop  = {"color":{"start":"#FFFFFF","end":"#FFFFFF"},"alpha":{"start":1,"end":0},"scale":{"start":0.28,"end":0.5,"minimumScaleMultiplier":1},"speed":{"start":140,"end":0,"minimumSpeedMultiplier":1},"acceleration":{"x":0,"y":0},"maxSpeed":0,"startRotation":{"min":0,"max":360},"noRotation":false,"rotationSpeed":{"min":0,"max":0},"lifetime":{"min":2,"max":4},"blendMode":"normal","frequency":0.4,"emitterLifetime":-1,"maxParticles":100000,"pos":{"x":0,"y":0},"addAtBack":false,"spawnType":"circle","spawnCircle":{"x":0,"y":0,"r":20}}

const createParticles = (container, assets, type) => {
	let config, asset
	
	if (typeof type === "number") {
		switch (type){
			case 1:
				config = config1;
				asset = assets.particle
				break;
			case 2:
				config = config2;
				asset = assets.particle
				break;
			case 3:
				config = configPoop;
				asset = assets["particle-poop"]
				break;
		}
	} else {
		if (type.proj === "frozen"){
			config = configSnow;
			asset = assets.particle
		}
	}
	
	console.log("Type: ", type)
	
	return new particles.Emitter(container, particles.upgradeConfig(config, asset))
}

const createHat = (container, assets, hatType, playerRadius) => {
	let asset
	if (typeof hatType === "number"){
		asset = assets["hat" + hatType]
	} else {
		if (hatType.style === "boss") asset = assets["hat-boss"]
	}
	
	let hat = new Sprite(asset)
	container.addChild(hat)
	hat.width = (playerRadius || 14) * 2.8
	hat.height = hat.width
	
	hat.anchor.x = 0.5;
	hat.anchor.y = 0.5
}

export {createParticles, createHat}