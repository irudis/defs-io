import * as PIXI from "pixi.js"

export default class Clock {
	constructor (maxTime){
		this.maxTime = maxTime
		
		this.container = new PIXI.Container()
		this.container.eventMode = "none"
		
		const circle = new PIXI.Graphics()
		circle.draweCircle(0, 0, 50)
	}
	
	set time(){
		
	}
	
	get time(){
		
	}
}