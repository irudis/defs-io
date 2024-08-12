
import * as PIXI from 'pixi.js'


PIXI.modu

import { reactive } from 'vue'

import TWEEN from "@tweenjs/tween.js"

import Player from '/src/components/game/classes/player.js'
import Enemy from "/src/components/game/classes/enemy.js"
import Joystick from '/src/components/game/joystick.js'
import Projectile from '/src/components/game/classes/projectile.js'
import Obstacle from '/src/components/game/classes//obstacle.js'
import Building from '/src/components/game/classes/building.js'
import BuildZoneBorder from "/src/components/game/helpers/buildZoneBorder.js"
import {Cannon, GoldMine, MeleeCannon} from '/src/components/game/classes/building.js'
// import Clock from "/src/components/game/clock.js"

import joytickOuter from '/src/assets/joystick/1.png';
import joytickInner from '/src/assets/joystick/2.png';

import okAsset from "/src/assets/ui/icons/ok.png" 

import axeAsset from "/src/assets/weapons/axe.png"
import swordAsset from "/src/assets/weapons/sword.png"

async function postImport(obj){
	await Promise.all(Object.keys(obj).map(async k => {
		let url = (await obj[k]()).default
		delete obj[k]
		let _arr = url.split("/")
		let name = _arr[_arr.length - 1].split(".")[0]
		obj[name] = url
	}))
	
	return obj
}

import protobuf from "/message.js"
import { XBow } from './classes/building'
const serverPB = protobuf.ServerMessage
const clientPB = protobuf.ClientMessage

let scale = 1

window.TWEEN = TWEEN

let playerAssets,
	enemiesAssets,
	buildingsAssets,
	particlesAssets,
	hatsAssets,
	projectilesAssets,
	obstaclesAssets
	

export default class Game {
	loaded = false
	particles = []
	constructor({gameVue, disableGpu}) {
		this.gameVue = gameVue
		this.assets = {
			enemies: {},
			player: {},
			buildings: {},
			particles: {},
			hats: {},
			projectiles: {},
			obstacles: {}
		}
		this.world = {
			players: {},
			buildings: {},
			entities: {},
			container: null,
			tileSize: 0,
			tiles: {
				width: 0,
				height: 0
			},
			scale: 10
		}
		this.disableGpu = disableGpu
	}
	
	async loadResources(){
		[
			playerAssets, enemiesAssets, buildingsAssets,
			particlesAssets, hatsAssets, projectilesAssets,
			obstaclesAssets
		] = await Promise.all([
			postImport(import.meta.glob("/src/assets/player/*.png", {as: "url"})),
			postImport(import.meta.glob("/src/assets/enemies/*.png", {as: "url"})),
			postImport(import.meta.glob("/src/assets/buildings/*/*.png", {})),
			postImport(import.meta.glob("/src/assets/particles/*.png", {})),
			postImport(import.meta.glob("/src/assets/hats/*.png", {})),
			postImport(import.meta.glob("/src/assets/projectiles/*.png", {})),
			postImport(import.meta.glob("/src/assets/obstacles/*.png", {}))
		])

		this.assets.joystick = {
			inner: await PIXI.Assets.load(joytickInner),
			outer: await PIXI.Assets.load(joytickOuter)
		}
		
		this.assets.ui = {
			icons: {
				ok: await PIXI.Assets.load(okAsset)
			}
		}
		this.assets.weapons = {
			axe: await PIXI.Assets.load(axeAsset),
			sword: await PIXI.Assets.load(swordAsset)
		}
		
		let assets = await PIXI.Assets.load([
			...Object.values(playerAssets),
			...Object.values(enemiesAssets),
			...Object.values(buildingsAssets),
			...Object.values(particlesAssets),
			...Object.values(hatsAssets),
			...Object.values(projectilesAssets),
			...Object.values(obstaclesAssets)
			])
			
		let _ind = 0;
		for (let a in playerAssets){
			console.log(a, playerAssets[a])
			this.assets.player[a] = assets[playerAssets[a]]
		}
		for (let a in enemiesAssets){
			this.assets.enemies[a] = assets[enemiesAssets[a]]
		}
		for (let a in buildingsAssets){
			this.assets.buildings[a] = assets[buildingsAssets[a]]
		}
		for (let a in particlesAssets){
			this.assets.particles[a] = assets[particlesAssets[a]]
		}
		for (let a in hatsAssets){
			this.assets.hats[a] = assets[hatsAssets[a]]
		}
		for (let a in projectilesAssets){
			this.assets.projectiles[a] = assets[projectilesAssets[a]]
		}
		for (let a in obstaclesAssets){
			this.assets.obstacles[a] = assets[obstaclesAssets[a]]
		}
		
		this.loaded = true
	}
	
	onMouseDown(){
		
	}
	
	onMouseUp(){
		
	}
	
	resize(arg){
		let width = this.app.renderer.width
		let height = this.app.renderer.height
		
		this.world.scale = Math.max(6, Math.min(14, this.world.scale - arg))
		
		this.worldContainer.scale.set(this.world.scale / 10)
	}
	
	async init({server, name}){
		if (this.disableGpu){
			await import("./helpers/canvasImports.js")
		}
		
		this.app = new PIXI.Application({
			transparent: true,
			antialias: true,
			forceCanvas: this.disableGpu
		})
		
		this.camera = null;
		
		this.self = null;
		
		this.buildings = Building.buildings
		this.buildingNow = null
		
		this.app.ticker.add(this.onRender.bind(this));
		
		await this.loadResources()
		
		this.app.stage.eventMode = "static"
		
		this.camera = new PIXI.Container();
		this.worldContainer = new PIXI.Container();
		
		this.worldContainer.sortableChildren = true
		
		this.background = new PIXI.Graphics();
		this.worldContainer.addChild(this.background)
		this.background.eventMode = "static"
		
		this.particleContainer = new PIXI.ParticleContainer()
		this.worldContainer.addChild(this.particleContainer)
		
		this.foreground = new PIXI.Graphics();
		this.worldContainer.addChild(this.foreground)
		this.foreground.eventMode = "none"
		this.foreground.zIndex = 9
		this.foreground.blendMode = PIXI.BLEND_MODES.MULTIPLY 
		this.foreground.alpha = 0
		
		this.camera.addChild(this.worldContainer)
		this.app.stage.addChild(this.camera)
		
		this._resize()
		this.camera.a
		
		const joystick = new Joystick(this.assets.joystick, {
			startPosition: {
				x: 70,
				y: this.app.renderer.height - 70,
			},
			width: this.app.renderer.width,
			gameVue: this.gameVue
		})
		joystick.on("move", "end", (vector) => {
			this.emit({
				direction: vector
			})
		})
		
		this.app.stage.on("pointerdown", (e) => {
			joystick.down(e.global)
		})
		this.app.stage.on("pointermove", (e) => {
			joystick.move(e.global)
		})
		this.app.stage.on("pointerup", (e) => {
			joystick.up(e.global)
		})
		
		this.background.on("tap", (e) => {
			if (this.buildingNow){
				let position = this.background.toLocal(e.global)
				this.buildingNow.move(position.x, position.y)
			}
		})
		
		this.joystick = joystick
		
		this.app.stage.addChild(joystick)
		
		// this.addPlayer({id: 0})
		
		this._init_ws(server, {name})
		
		this.gameVue.weapons = [axeAsset, swordAsset]
	}
	
	_resize(){
		this.app.renderer.resize(window.innerWidth, window.innerHeight)
		this.app.stage.hitArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight)

		// this.camera.width = window.innerWidth
		// this.camera.height = window.innerHeight
		this.camera.pivot.x = -window.innerWidth /2
		this.camera.pivot.y = -window.innerHeight /2
		
	}
	
	_init_ws(server, params){
		this.ws = new WebSocket(
			`${server.domain}:${server.port}/${window.location.search}&name=${params.name}`
		)
		
		this.ws.onopen = () => {
			console.log("WebSocket connected")
			this.gameVue.loading = false
		}

		this.ws.onmessage = (e) => {
			let data = JSON.parse(e.data)
			if (data.status !== 'ok') return;
			
			for (let bStat of data.buildings){
				Building.buildings.push({
					asset: buildingsAssets[bStat.code + "0"],
					...bStat
				})
			}
			Building.buildings.reverse()
			
			this.ws.binaryType = "arraybuffer";
			this.ws.onmessage = (e) => {
				this.processServerMessage(e.data)
			}
		}

		this.ws.onerror = function(error) {
			console.error("WebSocket connection error")
		};
		
		this.ws.onclose = (e) => {
			this.gameVue.closed = e.reason || true
			console.log("WebSocket connection close")
			console.log(e)
		}
	}
	
	async processServerMessage(data) {
		let message
		try {
			
			message = serverPB.decode(new Uint8Array(data))
			// console.log(message)
			
			if (message.map && !this.world.created){
				scale = message.map.scale
				this.world.created = true
				this.world.tiles.width = message.map.tiles.width
				this.world.tiles.height = message.map.tiles.height
				this.world.tileSize = Math.round(message.map.tileSize * scale)
				this.world.maxTime = message.map.maxTime
				
				let worldWidth = this.world.tiles.width * this.world.tileSize
				let worldHeight = this.world.tiles.height * this.world.tileSize
				
				this.background.beginFill(0x438e4c);
				this.background.lineStyle(2, 0x499c53, 1)
				
				this.background.drawRect(0, 0, worldWidth, worldHeight)
						
				
				this.foreground.beginFill(0x252850);
				this.foreground.drawRect(0, 0, 
						this.world.tiles.width * this.world.tileSize,
						this.world.tiles.height * this.world.tileSize)
						
				
				for (let i = 0; i <= this.world.tiles.width; i++){
					this.background.moveTo(0, i * this.world.tileSize)
					this.background.lineTo(this.world.tiles.height * this.world.tileSize, i * this.world.tileSize)
				}
				for (let i = 0; i <= this.world.tiles.height; i++){
					this.background.moveTo(i * this.world.tileSize, 0)
					this.background.lineTo(i * this.world.tileSize, this.world.tiles.height * this.world.tileSize)
				}
				
				this.world.border = new BuildZoneBorder(worldWidth, worldHeight, this.world.tileSize * 15)
				this.worldContainer.addChild(this.world.border.container)
			}
			
			this.world.time = message.map.time
			
			let timeExpired = this.world.time / this.world.maxTime
			this.gameVue.timeExpired = -timeExpired
			
			if (!this.world.night && timeExpired < .33){
				const tween = new TWEEN.Tween(this.foreground)
				tween.to({
					alpha: 0.5
				}, 3000).start()
				this.world.night = true
			} else if (this.world.night && timeExpired >= .33){
				const tween = new TWEEN.Tween(this.foreground)
				tween.to({
					alpha: 0
				}, 3000).start()
				this.world.night = false
			}
			
			for (let ent of message.entities){
				if (ent.position){
					ent.position.x *= scale
					ent.position.y *= scale
				}
				if (ent.radius){
					ent.radius *= scale
				}
				
				if (!this.world.entities[ent.id] && ent.removed) continue
				
				if (!this.world.entities[ent.id]){
					switch(ent.type){
						case 1:
							this.addPlayer(ent)
							break;
						case 2:
							this.addBuilding(ent)
							break;
						case 3:
							this.addEnemy(ent)
							break;
						case 4:
							this.addProjectile(ent)
							break;
						case 5:
							this.addObstacle(ent)
							break;
					}
					
					if (!this.world.entities[ent.id]){
						console.log(ent)
					}
					if (this.world.entities[ent.id].particles){
						this.particles.push({
							id: ent.id,
							time: +new Date(),
							container: this.world.entities[ent.id].container,
							p: this.world.entities[ent.id].particles,
						})
						// this.world.entities[ent.id].particles.parent = this.container
					}
				}
				
				if (ent.removed){
					this.removeEntity(ent)
					continue
				}
				
				if (ent.damageBy){
					ent.damageBy = this.world.entities[ent.damageBy]
				}
				
				let curEnt = this.world.entities[ent.id];
				curEnt.update(ent, this.gameVue);
				
				if (this.gameVue.buildingMenu && this.gameVue.buildingMenu.id === ent.id){
					let _ = this.gameVue.buildingMenu
					this.gameVue.buildingMenu = false
					this.gameVue.buildingMenu = _
					// А как иначе это сделать?
				}
			}
		} catch (e) {
			console.error(e)
			return;
		}
	}
			
	addPlayer(params){
		let player = new Player(params, this.assets, this.particleContainer)
		this.gameVue.players.push(player)

		this.world.entities[params.id] = player
		this.worldContainer.addChild(player.container)
		
		
		if (params.self){
			this.self = this.world.entities[params.id]
			this.self.self = true
		}
		//  console.log(this.self)
	}
	
	addObstacle(params){
		let obstacle = new Obstacle(params, this.assets)
		
		this.world.entities[params.id] = obstacle
		this.worldContainer.addChild(obstacle.container)
	}
	
	selectBuildingClass(bType){
		switch(bType){
			case 7:
				return XBow
			case 6:
				return MeleeCannon
			case 5:
				return Cannon
			case 2: 
				return GoldMine
			default:
				return Building
		}
	}
	
	addBuilding(params){
		const bClass = this.selectBuildingClass(params.bType)
		
		const building = new bClass(params.bType, this.assets, {
			level: params.level,
			id: params.id,
			ownerId: params.ownerId,
			radius: params.radius,
			position: {
				x: Math.round(params.position.x),
				y: Math.round(params.position.y)
			},
			tileSize: this.world.tileSize,
			onTap: (b, event) => {
				if (this.buildingNow) return
				if (this.self.id !== b.ownerId) return
				if (this.gameVue.buildingMenu) this.gameVue.buildingMenu.onClose()
				b.onOpen()
				this.gameVue.buildingMenu = b
				this.gameVue.buildingMenuOnClose = () => {
					this.gameVue.buildingMenu = false
					this.gameVue.buildingMenuOnClose = null
					b.onClose()
				}
			},
			health: params.health,
			maxHealth: params.maxHealth
		})
		
		this.world.entities[params.id] = building
		this.worldContainer.addChild(building.container)
		
		this.gameVue.__crutch++ // todo fix may cause lags
		
		if (this.buildingNow && Object.values(this.world.entities).filter(b => {
			return b.type === this.buildingNow.type && b.ownerId === this.self.id
		}).length >= this.buildingNow.max) this.stopBuilding()
	}
	
	addProjectile(p){
		let projectile = new Projectile(p, this.assets, this.particleContainer)

		this.world.entities[p.id] = projectile
		this.worldContainer.addChild(projectile.container)
	}
	
	addEnemy(e){
		let enemy = new Enemy(e, this.assets)

		this.world.entities[e.id] = enemy
		this.worldContainer.addChild(enemy.container)
	}
	
	removeEntity(ent){
		this.gameVue.players = this.gameVue.players.filter(p => p.id !== ent.id)
		let eCont = this.world.entities[ent.id].container
		const tween = new TWEEN.Tween(eCont)
		tween.to({
			alpha: 0
		}, 150).onComplete(() => {
			this.worldContainer.removeChild(eCont)
			let particles = this.particles.find(p => p.id === ent.id)
			
			if (particles){
				particles.p.emit = false;
				particles.p.cleanup()
				this.particleContainer.removeChild(particles.p)
				this.particles = this.particles.filter(p => p.id !== ent.id)
			}
			delete this.world.entities[ent.id]
		}).start()
	}
	
	emit(data){
		if (!this.ws) return
		let buffer = clientPB.encode(clientPB.fromObject(data)).finish()
		this.ws.send(buffer)
	}
	
	onRender(delta){
		TWEEN.update(performance.now())
		
		if (!this.self) return;
		
		if (this.__startBuilding){
			this.startBuilding(this.__startBuilding)
			delete this.__startBuilding
		}
		
		for (let p of this.particles){
			let time = +new Date()
			p.p.updateOwnerPos(p.container.x, p.container.y)
			p.p.update(0.001 * (time - p.time))
			p.time = time
		}
		
		this.camera.x = -this.self.x * this.worldContainer.scale.x
		this.camera.y = -this.self.y * this.worldContainer.scale.y
	}
	
	startBuilding(ind){
		this.joystick.up()
		this.joystick.disable()
		
		if (this.buildingNow){
			this.stopBuilding()
		}
		
		const bClass = this.selectBuildingClass(ind)
		
		const building = new bClass(ind, this.assets, {
			selectingPlace: true,
			level: 1,
			position: {x: this.self.x, y: this.self.y},
			tileSize: this.world.tileSize,
			onTap: (id, position) => {
				// this.stopBuilding()
				this.emit({
					build: {
						id, position
					}
				})
			}
		})
		building.updateSprite()
		
		this.buildingNow = building
		this.worldContainer.addChild(building.container)
		this.world.border.visible = true
		
		let base = Object.values(this.world.entities).find(b => b.ownerId === this.self.id && b._bStat.id === 1)
		if (base){
			let zone = this.__allowedBuildingZone = new PIXI.Graphics()
			zone.beginFill(0x22FF22)
			let centerX = base.x + base.sprite.width / 2
			let centerY = base.y + base.sprite.height / 2
			zone.drawRect(
				centerX - base.radius, centerY - base.radius,
				base.radius * 2, base.radius * 2
			)
			zone.endFill()
			zone.alpha = 0.1
			zone.zIndex = 5
			zone.eventMode = "none"
			this.worldContainer.addChild(zone)
		}
	}
	
	stopBuilding(){
		this.joystick.enable()
		
		this.gameVue.selectedBuilding = null
		this.worldContainer.removeChild(this.buildingNow.container)
		this.buildingNow.container.destroy()
		this.world.border.visible = false
		if (this.__allowedBuildingZone){
			this.worldContainer.removeChild(this.__allowedBuildingZone)
			this.__allowedBuildingZone.destroy()
			delete this.__allowedBuildingZone
		}
		delete this.buildingNow
	}
}