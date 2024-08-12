import * as PIXI from 'pixi.js'

export default class Obstacle {
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
	
	constructor(obstacle, assets){
		this.container = new PIXI.Container()
		this.container.eventMode = "none"
		
		this.spriteContainer = new PIXI.Container();
		
		this.sprite = new PIXI.Sprite(assets.obstacles[
			["tree", "stone"][obstacle.bType - 1]
		])
		this.sprite.width = obstacle.radius * 2.3
		this.sprite.height = obstacle.radius * 2.3
		this.container.addChild(this.spriteContainer)
		this.spriteContainer.addChild(this.sprite)
		
		this.x = obstacle.position.x
		this.y = obstacle.position.y
		
		this.id = obstacle.id
		
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
	}
	
	
	
	update(params){
			
		if (params.damageBy){
			if (this.__tween){
				this.x = this.__tween._valuesEnd.x[2]
				this.y = this.__tween._valuesEnd.y[2]
				this.__tween.stop()
			}
			const tween = new TWEEN.Tween(this)
			
			let offset = new PIXI.Point(this.x - params.damageBy.x, this.y - params.damageBy.y)

			offset.normalize()
			offset.multiplyScalar(20)
			
			let to = {
				x: [offset.x + this.x, this.x],
				y: [offset.y + this.y, this.y]
			}
			
			tween
				.to(to, 200)
				.onComplete(() => {
					delete this.__tween
				})
				.delay(50)
				
			this.__tween = tween
				
			tween.start()
		}
		
	}
}