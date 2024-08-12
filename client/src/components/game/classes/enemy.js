import * as PIXI from 'pixi.js'
import * as Decorator from "../helpers/decorators.js"

export default class Enemy {
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
	
	constructor(enemy, assets){
		this.container = new PIXI.Container()
		this.container.eventMode = "none"
		
		this.spriteContainer = new PIXI.Container();
		
		this.sprite = new PIXI.Sprite(assets.enemies["style" + enemy.style])
		this.sprite.width = enemy.radius * 2
		this.sprite.height = this.sprite.width
		
		
		
		this.container.addChild(this.spriteContainer)
		this.spriteContainer.addChild(this.sprite)
		
		this.x = enemy.position.x
		this.y = enemy.position.y
		
		this.id = enemy.id
		
		this.maxHealth = enemy.health
		
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		
		
		let hands = new PIXI.Sprite(assets.enemies["hands" + enemy.style])
		this.sprite.addChild(hands)
		hands.anchor.x = 0.5
		hands.anchor.y = 0.5
		hands.x = this.sprite.width / this.sprite.transform.scale.x * 0.41
		
		hands.weaponType = 0
		
		console.log(enemy.bType)
		if (enemy.bType === 1){
			this.hat = Decorator.createHat(this.spriteContainer, assets.enemies, {style: "boss"}, enemy.radius)
		}
		
		this.weapon = hands
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
	}
	
	attack(){
		if (this.__attackTween){
			this.__attackTween.stop()
		}
		
		// this.weaponSprite.rotation = -Math.PI / 2
		const tween = new TWEEN.Tween(this.weapon)
		this.__attackTween = tween
		
		tween.to({
			x: "+" + this.sprite.width / this.sprite.transform.scale.x * 0.3
		}, 150).onComplete(() => {
			this.__attackAnimation = false
			delete this.__attackTween
		}).repeat(1).yoyo(true).start()
	}
	
	update(params){
		// console.log(params)
		// this.x = params.position.x
		// this.y = params.position.y
		const tween = new TWEEN.Tween(this)
		
		let to = {}
		
		if (params.position){
			to.x = params.position.x;
			to.y = params.position.y
		}
		if (params.angle){
			let angle = Math.atan2(params.angle.y, params.angle.x)
			to.rotation = angle
			
			let cur = Math.abs( to.rotation - this.rotation )
			
			if (cur > Math.PI) to.rotation = (this.rotation > 0 ? "+" : "-") + 
					(Math.PI * 2 - cur)
		}
		if (params.health){
			to.health = params.health
		}
		
		if (params.isAttack){
			this.attack()
		}
		
		tween
			.to(to, 120)
			.start()
		
	}
}