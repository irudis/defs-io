import {Sprite, Container, Point} from "pixi.js"

export default class Joystick extends Container {
	constructor({inner, outer, scale}, {startPosition, gameVue, width}){
		super()
		this.enabled = true;
		this.inner = new Sprite(inner)
		this.outer = new Sprite(outer)
		
		this.inner.anchor.set(0.5, 0.5)
		this.outer.anchor.set(0.5, 0.5)
		
		this.gameVue = gameVue
		this.rendererWidth = width
		
		this.addChild(this.outer)
		this.addChild(this.inner)
		
		this.eventMode = "none"
		
		
		this.outer.width = 90
		this.outer.height = this.outer.width
		
		this.inner.width = this.outer.width / 2.5
		this.inner.height = this.inner.width
		
		this.alpha = 0.5
		
		this.visible = true;
		
		this.startPosition = startPosition
		
		this.actions = {
			move: null,
			end: null
		}
		
		this.up()
	}
	
	down(position){
		if (!this.enabled) return;
		
		this.alpha = 1
		this.position = position
	}
	
	move(position){
		if (!this.visible) return;
		let vector = new Point(
				position.x - this.position.x,
				position.y - this.position.y
		)
		let len = vector.len()
		if (len > this.outer.width / 2) vector.lenTo(this.outer.width / 2)
		this.inner.position = vector
		
		if (this.actions.move) this.actions.move(vector)
	}
	
	up(){
		this.alpha = 0.5;
		this.inner.position.set(0, 0)
		
		if (this.gameVue.invertControl){
			this.position.set(this.rendererWidth - this.startPosition.x, this.startPosition.y)
		} else {
			this.position.set(this.startPosition.x, this.startPosition.y)
		}
		
		if (this.actions.end) this.actions.end(new Point(0, 0))
	}
	
	on(...params){
		for (let i = 0; i < params.length - 1; i++){
			this.actions[params[i]] = params[params.length - 1]
		}
	}
	
	disable(){
		this.enabled = false;
		this.visible = false
	}
	
	enable(){
		this.enabled = true
		this.visible = true
	}
}