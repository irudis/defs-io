import { Tween } from '@tweenjs/tween.js';
import * as PIXI from 'pixi.js'

class Building {
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
	
	constructor (type, assets, props) {
		// props.level = 1 // TODO
		
		this.assets = assets
		this.container = new PIXI.Container()
		this.tileSize = props.tileSize

		this.spriteContainer = new PIXI.Container();

		let bStat = Building.buildings.find(b => b.id === type)
		this._bStat = bStat
		// console.log(bStat, props)

		this.sprite = new PIXI.Sprite()
		
		this.sprite.width = props.tileSize * bStat.size.x
		this.sprite.height = props.tileSize * bStat.size.y

		this.container.addChild(this.spriteContainer)
		this.spriteContainer.addChild(this.sprite)
		
		this.id = props.id || 0
		this.ownerId = props.ownerId
		this.type = bStat.id
		this.max = bStat.max
		this.level = props.level || 1
		
		this.radius = props.radius
		
		this.move(props.position.x, props.position.y)
		
		if (props.selectingPlace){
			this.spriteContainer.eventMode = "none"
			this.spriteContainer.sortableChildren = true
			this.sprite.alpha = 0.5
			this.helper = new PIXI.Sprite(PIXI.Texture.WHITE);
			this.helper.width = this.sprite.width;
			this.helper.height = this.sprite.height;
			this.helper.tint = 0xFFFF00;
			this.helper.alpha = 0.2
			this.helper.zIndex = 10
			
			this.spriteContainer.addChild(this.helper)
			
			
			// this.okButton = new PIXI.Sprite(assets.ui.icons.ok)
			// this.okButton.width = 25
			// this.okButton.height = 25
			// this.okButton.anchor.x = 0.5
			// this.okButton.anchor.y = 0.5
			// this.okButton.x = -20
			// this.okButton.y = -20
			// this.container.addChild(this.okButton)
			
			// this.okButton.eventMode = "static"
			// this.okButton.on("tap", () => {
			// 	console.log("here")
			// 	props.onTap(bStat.id, {x: this.x, y: this.y})
			// })
			this.container.zIndex = 11
			// this.onOpen()
		} else {
			this.container.eventMode = "static"
			this.container.on("tap", (event) => {
				props.onTap(this, event)
			})
			
			// HEALTH 
			
			this.maxHealth = props.maxHealth
			
			this.__healthBarMaxWidth = this.sprite.width - 2
			
			this.healthContainer = new PIXI.Container()
			this.healthContainer.x = (this.sprite.width - this.__healthBarMaxWidth) / 2
			this.healthContainer.y = 10
			// this.healthContainer.x = this.sprite.width / 2
			
			this.healthOutline = new PIXI.Graphics()
			this.healthOutline.lineStyle(1, 0xAFAFAF);
			// this.healthOutline.beginFill(0x666666);
			this.healthOutline.drawRoundedRect(
			    0, 0,
			    this.__healthBarMaxWidth, 8,
			    5
			);
			// this.healthOutline.pivot.x = this.healthOutline.width / 2
			this.healthOutline.pivot.y = this.healthOutline.height / 2
			
			this.healthFill = new PIXI.Graphics()
			
			// this.healthFill.pivot.x = this.healthOutline.width / 2
			this.healthFill.pivot.y = this.healthOutline.height / 2
			
			this.healthContainer.addChild(this.healthFill)
			this.healthContainer.addChild(this.healthOutline)
			this.container.addChild(this.healthContainer)
			
			this.__checker = 1
			this.health = props.health
			this.healthContainer.alpha = 0
		}
	}
	
	updateSprite(){
		this.sprite.texture = this.assets.buildings[this._bStat.code + (this.level - 1)]
	}
	
	onOpen(){
		if (this.__helper) return
		
		this.__helper = new PIXI.Sprite(PIXI.Texture.WHITE);
		this.container.addChild(this.__helper)
		this.__helper.width = this.sprite.width;
		this.__helper.height = this.sprite.height;
		this.__helper.tint = 0xFFFF00;
		this.__helper.alpha = 0.2
		this.__helper.zIndex = 10
		
		if (!this.radius || this._bStat.id === 1) return
		
		this.__circle  =new PIXI.Graphics()
		this.container.addChild(this.__circle)
		this.__circle.eventMode = "none"
		this.__circle.beginFill(0xffff00)
		this.__circle.alpha = 0.1
		this.__circle.drawCircle(0, 0, this.radius)
		this.__circle.x = 0.5 * this.sprite.width
		this.__circle.y = 0.5 * this.sprite.height
	}
	
	onClose(){
		if (!this.__helper) return;
		this.container.removeChild(this.__helper)
		this.__helper.destroy()
		delete this.__helper
		if (!this.__circle) return;
		this.container.removeChild(this.__circle)
		this.__circle.destroy()
		delete this.__circle
	}
	
	get health() {
		return this.__health
	}
	
	set health(v) {
		this.__health = v
		
		this.healthFill.clear()
		this.healthFill.beginFill(0xBB0000)
		this.healthFill.drawRoundedRect(
		    0, 0,
		    this.__healthBarMaxWidth * (this.__health / this.maxHealth), 8,
		    5
		);
		
		if (this.__checker !== 1 && this.health === this.maxHealth) {
			this.__checker = 1
			const tween = new TWEEN.Tween(this.healthContainer)
			
			tween
				.to({
					alpha: 0
				}, 120)
				.start()
		} else if (this.__checker !== 0 && this.health !== this.maxHealth){
			this.__checker = 0
			
			this.healthContainer.alpha = 1
		}
	}
	
	move (x, y){
		this.x = Math.floor(x / this.tileSize) * this.tileSize
		this.y = Math.floor(y / this.tileSize) * this.tileSize
	}
	
	static _init(assets) {
		for (let i = 0; i < assets.length; i++){
			this.buildings[i] = {
				id: i + 1,
				asset: assets[i]
			}
		}
		
		this.buildings.reverse()
	}
	
	static buildings = []
	
	update(params) {
		const tween = new TWEEN.Tween(this)
		
		let to = {}
		
		if (params.health){
			to.health = params.health
		}
		
		if (params.level){
			this.level = params.level
			this.maxHealth = params.maxHealth
			this.updateSprite()
		}
		
		tween
			.to(to, 120)
			.start()
	}
}


class Cannon extends Building {
	constructor (type, assets, props){
		super(type, assets, props)
		
		this.sprite.width = props.tileSize * this._bStat.size.x
		this.sprite.height = props.tileSize * this._bStat.size.y
		
		this.cannon = new PIXI.Sprite()
		this.cannon.width = props.tileSize * this._bStat.size.x
		this.cannon.height = props.tileSize * this._bStat.size.y
		
		this.cannon.anchor.x = 0.5
		this.cannon.anchor.y = 0.5
		
		this.cannon.x = this.cannon.width / 2
		this.cannon.y = this.cannon.height / 2
		
		this.cannon.eventMode = "none"
		
		this.spriteContainer.addChild(this.cannon)
	}
	
	updateSprite(){
		this.sprite.texture = this.assets.buildings[this._bStat.code + "-base" + (this.level - 1)]
		this.cannon.texture = this.assets.buildings[this._bStat.code + "-top"]
	}
	
	get rotation(){
		return this.cannon.rotation
	}
	set rotation(v){
		if (v < -Math.PI) v += Math.PI * 2
		else if (v > Math.PI) v -= Math.PI * 2
		this.cannon.rotation = v
	}
	
	update(params){
		super.update(params)
		if (params.angle) this.rotation = Math.atan2(params.angle.y, params.angle.x)
	}
}

class XBow extends Cannon {
	constructor (type, assets, props){
		super(type, assets, props)
		this.cannon.width *= 1.15
		this.cannon.height *= 1.15
	}
}

class MeleeCannon extends Building {
	constructor (type, assets, props){
		super(type, assets, props)
		
		this.sprite.width = props.tileSize * this._bStat.size.x
		this.sprite.height = props.tileSize * this._bStat.size.y
		
		this.cannon = new PIXI.Sprite()
		
		this.cannon.anchor.x = 0.5
		this.cannon.anchor.y = 0.5
		
		this.cannon.eventMode = "none"
		
		this.sprite.addChild(this.cannon)
	}
	
	updateSprite(){
		this.sprite.texture = this.assets.buildings[this._bStat.code + "-base" + (this.level - 1)]
		this.cannon.texture = this.assets.buildings[this._bStat.code + "-top"]
		
		this.cannon.x = this.sprite.width / this.sprite.transform.scale.x / 2
		this.cannon.y = this.sprite.height / this.sprite.transform.scale.y / 2
	}
	
	attack(){
		if (this.__tween){
			this.__tween.stop()
			this.cannon.scale.x = 1
			this.cannon.scale.y = 1
		}
		
		const tween = new TWEEN.Tween(this.cannon.scale)
		tween.to({
			x: [2, 1],
			y: [2, 1]
		}, 200).start()
		
		this.__tween = tween
	}
	
	update(params){
		super.update(params)
		if (params.isAttack){
			this.attack()
		}
	}
}

class GoldMine extends Building {
	constructor (type, assets, props){
		super(type, assets, props)
		
		this.sprite.width = props.tileSize * this._bStat.size.x
		this.sprite.height = props.tileSize * this._bStat.size.y
		
		this.mine = new PIXI.Sprite()
		this.mine.width = props.tileSize * this._bStat.size.x
		this.mine.height = props.tileSize * this._bStat.size.y
		
		this.mine.anchor.x = 0.5
		this.mine.anchor.y = 0.5
		
		this.mine.x = this.mine.width / 2
		this.mine.y = this.mine.height / 2
		
		this.mine.eventMode = "none"
		
		this.spriteContainer.addChild(this.mine)
		
		const tween = new TWEEN.Tween(this.mine)
		tween
			.to({
				rotation: +Math.PI * 2
			}, 4000)
			.onRepeat(() => {
				this.mine.rotation = 0
			})
			.repeat(Infinity)
			.start()
	}
	
	updateSprite(){
		this.sprite.texture = this.assets.buildings[this._bStat.code + "-base" + (this.level - 1)]
		this.mine.texture = this.assets.buildings[this._bStat.code + "-top"]
	}
	
	update(params){
		super.update(params)
	}
}


export default Building
export {Cannon, GoldMine, MeleeCannon, XBow}