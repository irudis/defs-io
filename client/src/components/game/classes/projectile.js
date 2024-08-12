import * as PIXI from 'pixi.js'
import * as Decorator from "../helpers/decorators.js"

export default class Projectile {
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
	
	// get rotation(){
	// 	return this.spriteContainer.rotation
	// }
	// set rotation(v){
	// 	if (v < -Math.PI) v += Math.PI * 2
	// 	else if (v > Math.PI) v -= Math.PI * 2
	// 	this.spriteContainer.rotation = v
	// }
	
	constructor(projectile, assets, particleContainer){
		this.container = new PIXI.Container()
		this.container.eventMode = "none"
		
		if (projectile.angle === null) console.log(projectile)
		
		this.spriteContainer = new PIXI.Container();
		
		this.sprite = new PIXI.Sprite(assets.projectiles["proj" + (projectile.bType - 1)])
		this.sprite.width = projectile.radius * 2
		this.sprite.height = projectile.radius * 2
		this.sprite.rotation = Math.atan2(projectile.angle.y, projectile.angle.x)
		this.spriteContainer.addChild(this.sprite)
		this.container.addChild(this.spriteContainer)
		
		if (projectile.bType === 4){
			this.particles = Decorator.createParticles(particleContainer, assets.particles, {proj: "frozen"})
		}
		
		this.x = projectile.position.x
		this.y = projectile.position.y
		
		this.id = projectile.id
		
		this.sprite.anchor.x = 0.5
		this.sprite.anchor.y = 0.5
		
		let t = this.sprite.texture
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
		
		// if (params.angle){
		// 	let angle = Math.atan2(params.angle.y, params.angle.x)
		// 	to.rotation = angle
			
		// 	let cur = Math.abs( to.rotation - this.rotation )
			
		// 	if (cur > Math.PI) to.rotation = (this.rotation > 0 ? "+" : "-") + 
		// 			(Math.PI * 2 - cur)
		// }
		
		tween
			.to(to, 120)
			.start()
		
	}
}