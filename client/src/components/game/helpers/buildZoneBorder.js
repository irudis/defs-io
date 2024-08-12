import * as PIXI from "pixi.js"

class BuildZoneBorder {
	constructor (width, height, borderWidth){
		this.container = new PIXI.Container()
		let graphics = new PIXI.Graphics()
		graphics.beginFill(0xFF0000)
		graphics.drawRect(0, 0, width, height)
		
		graphics.endFill()
		
		graphics.beginFill(0x000000, 0);
		graphics.beginHole()
		
		graphics.drawRect(borderWidth, borderWidth, width - borderWidth * 2, height - borderWidth * 2)
		
		graphics.endHole()
		graphics.endFill();
		
		this.container.addChild(graphics)
		
		this.container.alpha = 0.2
		this.container.eventMode = "none"
		
		this.visible = false
	}
	
	set visible(v){
		this.container.visible = v
	}
}

export default BuildZoneBorder