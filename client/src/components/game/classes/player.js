import * as PIXI from 'pixi.js'
import {reactive} from "vue"
import * as particles from '@pixi/particle-emitter'
import * as Decorator from "../helpers/decorators.js"
		
export default class Player {
	self = false
	get x(){
		return this.container.x
	}
	set x(v){
		this.container.x = v;
	}
	get y(){
		return this.container.y
	}
	set y(v){
		this.container.y = v;
	}
	
	get rotation(){
		return this.spriteContainer.rotation
	}
	set rotation(v){
		if (v < -Math.PI) v += Math.PI * 2
		else if (v > Math.PI) v -= Math.PI * 2
		this.spriteContainer.rotation = v
	}
	
	get health() {
		return this.__health
	}
	
	set health(v) {
		this.__health = v
		
		this.healthFill.clear()
		this.healthFill.beginFill(0xB32821)
		this.healthFill.drawRoundedRect(
			0, 0,
			this.__healthBarMaxWidth * (this.__health / this.maxHealth), 8,
			5
		);
	}
	
	get weapon (){
		return this.__weapon
	}
	set weapon(v){
		this.__weapon = v
		this.weaponSprite.texture = this.weaponAssets[
			["axe", "sword"][v - 1]
		]
	}
	
	constructor(player, assets, particleContainer){
		this.container = new PIXI.Container()
		this.container.eventMode = "none"
		
		this.spriteContainer = new PIXI.Container();
		
		this.container.addChild(this.spriteContainer)
		
		this.x = player.position.x
		this.y = player.position.y
		
		// ============
		
		this.sprite = new PIXI.Sprite(assets.player.style)
		this.sprite.width = (player.radius || 14) * 2.4
		this.sprite.height = this.sprite.width
		
		this.spriteContainer.addChild(this.sprite)
		
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		
		let hands = new PIXI.Sprite(assets.player.hands)
		this.sprite.addChild(hands)
		hands.anchor.x = 0.5
		hands.anchor.y = 0.5
		hands.x = this.sprite.width / this.sprite.transform.scale.x * 0.38
		
		// ===============
		
		if (player.track){
			this.particles = Decorator.createParticles(particleContainer, assets.particles, player.track)
		}
		if (player.hat){
			this.hat = Decorator.createHat(this.spriteContainer, assets.hats, player.hat, player.radius)
		}
		
		// ===============
		
		this.id = player.id
		
		this.maxHealth = player.health
		
		this.score = player.score
		
		// NAME
		
		this.name = player.name
		const text = new PIXI.Text(""/* player.name */, {
			fontFamily: 'Arial',
			fontSize: 12,
			fill: "white",
			align: 'center',
		});
		text.y = -26
		text.x = 0
		text.anchor.x = 0.5
		text.anchor.y = 0.5

		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		this.container.addChild(text)
		
		// HEALTH

		this.__healthBarMaxWidth = 50

		this.healthContainer = new PIXI.Container()
		this.healthContainer.y = 34
		
		this.healthOutline = new PIXI.Graphics()
		this.healthOutline.lineStyle(1, 0xAFAFAF);
		this.healthOutline.drawRoundedRect(
			0, 0,
			this.__healthBarMaxWidth, 8,
			5
		);
		this.healthOutline.pivot.x = this.healthOutline.width / 2
		this.healthOutline.pivot.y = this.healthOutline.height / 2
		
		this.healthFill = new PIXI.Graphics()
		
		this.healthFill.pivot.x = this.healthOutline.width / 2
		this.healthFill.pivot.y = this.healthOutline.height / 2
		
		this.healthContainer.addChild(this.healthFill)
		this.healthContainer.addChild(this.healthOutline)
		this.container.addChild(this.healthContainer)
		
		this.health = this.maxHealth
		
		this.weaponAssets = assets.weapons
		
		this.weaponSprite = new PIXI.Sprite()
		this.weaponSprite.anchor.x = 0.1
		this.weaponSprite.anchor.y = 0.9
		this.weaponSprite.width = 60
		this.weaponSprite.height = 60
		this.weaponSprite.x = 15
		this.weaponSprite.y = 17
		this.weaponSprite.rotation = -Math.PI * 0.1
		
		this.weapon = player.weapon
		
		this.spriteContainer.addChild(this.weaponSprite)
	}
	
	attack(){
		if (this.__attackTween){
			this.__attackTween.stop()
		}
		if (this.__rotation){
			this.spriteContainer.rotation = this.__rotation
			delete this.__rotation
		}
		
		// this.weaponSprite.rotation = -Math.PI / 2
		const tween1 = new TWEEN.Tween(this.spriteContainer)
		const tween2 = new TWEEN.Tween(this.spriteContainer)
		const tween3 = new TWEEN.Tween(this.spriteContainer)
		this.__attackTween = tween1
		this.__attackAnimation = true
		
		tween1.to({
			rotation: this.spriteContainer.rotation - Math.PI * 0.3
		}, 50).chain(tween2)
		
		tween2.to({
			rotation: this.spriteContainer.rotation + Math.PI * 0.7
		}, 200).chain(tween3)
		
		tween3.to({
			rotation: this.spriteContainer.rotation
		}, 150).onComplete(() => {
			this.__attackAnimation = false
			delete this.__attackTween
		})
		
		tween1.start()
	}
	
	update(params, gameVue){
		// console.log(params)
		// this.x = params.position.x
		// this.y = params.position.y
		const tween = new TWEEN.Tween(this)
		
		let to = {}
		
		if (params.position){
			to.x = params.position.x;
			to.y = params.position.y
		}
		
		if (params.wave){
			this.wave = params.wave
		}
		
		if (params.score){
			this.score = params.score
		}
		
		if (params.angle){
			let angle = Math.atan2(params.angle.y, params.angle.x)
			if (this.__attackAnimation){
				this.__rotation = angle
			} else {
				if (this.__rotation) delete this.__rotation
				to.rotation = angle
				
				let cur = Math.abs( to.rotation - this.rotation )
				
				if (cur > Math.PI) to.rotation = (this.rotation > 0 ? "+" : "-") + 
						(Math.PI * 2 - cur)
			}
		}
		if (params.health){
			to.health = params.health
			console.log(params.health, this.maxHealth)
		}
		
		if (params.isAttack){
			this.attack()
		}
		
		if (params.weapon){
			this.weapon = params.weapon
		}
		
		if (params.weapons && params.weapons.length){
			this.weapons = params.weapons
		}
		
		if (params.timers && params.timers.length){
			this.timers = params.timers
		}
		
		if (this.self && params.inventory){
			console.log(params.inventory)
			gameVue.inventory = params.inventory
		}
		
		tween
			.to(to, 120)
			.start()
		
	}
}