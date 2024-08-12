const Entity = require("../game-objects/entity.js")
const Pl = require("planck-js")
const SAT = require("sat")
const Projectile = require("./projectile.js");

class Building extends Entity {
    type = 2;

	/**
	 * @type {Pl.Body}
	 */
	body
	lastDamagedTime = 0
	health = 0;
	maxHealth = 0
	
    constructor ({x, y, id, type, tileSize, owner, engine}) {
        super({x, y, id})

        let bStat = Building.buildings.find(b => b.id === type)

        this.bType = type
        this.ownerId = owner.id
        this.id = id
        this.level = 0

		this.bStat = bStat

		this.width = bStat.size.x * tileSize
		this.height = bStat.size.y * tileSize

        this.actions = []

		this.upgrade(1)

		this.health = this.maxHealth
		// PLANCK 



        this.body = engine.world.createBody({
			type: "static",
            linearDamping: 10,
            angularDamping: 0,
            fixedRotation: true,
            position: new Pl.Vec2(x, y),
			userData: this
        })

        this.body.createFixture({
            shape: new Pl.Box(
				this.width / 2,
				this.height / 2,
				Pl.Vec2(bStat.size.x * tileSize / 2, bStat.size.y * tileSize / 2))
        })
    }

	process(){

	}

	get position(){
		return this.body.getPosition()
	}

	get center(){
		return this.body.getPosition().clone().add(this.body.getFixtureList().getShape().m_centroid)
	}

	damage(dmg){
		let res = super.damage(dmg)
		this.lastDamagedTime = +new Date()
		return res
	}

	postProcess(engine){
		if (this.health < this.maxHealth && this.lastDamagedTime + 4000 < +new Date()){
			this.health = Math.min(this.maxHealth, this.health + engine.__RATE * this.health * 0.1)
			engine.addChanged({
				id: this.id,
				health: this.health
			})
		}
	}

	// returns resources need to upgrade
	canUpgrade(inventory){
		return true
	}

	upgrade(level){
		if (level) this.level = level
		else this.level++
		for (let key of Object.keys(this.bStat.upgrade)){
			this[key] = this.bStat.upgrade[key][this.level - 1]
		}
	}
	
	static buildings = [
		{
			id: 1,
			code: "base",
			name: "База",
			size: {
				x: 2, y: 2
			},
			max: 1,
			upgrade: {
				maxHealth: [1000, 2500, 7000, 16000],
			},
			upgradeCost: {
				gold: [10000, 50000, 240000]
			}
		},
		{
			id: 2,
			code: "wall",
			name: "Забор",
			size: {
				x: 1, y: 1
			},
			max: 50,
			needId: 1,
			upgrade: {
				maxHealth: [2000, 5000, 12000, 26000]
			},
			upgradeCost: {
				gold: [200, 1000, 4000]
			}
		},
		{
			id: 3,
			code: "cannon",
			name: "Пушка",
			size: {
				x: 2, y: 2
			},
			max: 6,
			needId: 1, 
			radius: 3,
			upgrade: {
				maxHealth: [1000, 2500, 7000, 16000],
				power: [200, 1000, 5000, 25000],
			},
			upgradeCost: {
				gold: [4000, 20000, 100000]
			}
		},
		{
			id: 4,
			code: "door",
			name: "Дверь",
			size: {
				x: 1, y: 1
			},
			max: 20,
			needId: 1,
			upgrade: {
				maxHealth: [1700, 5000, 9000, 20000],
			},
			upgradeCost: {
				gold: [200, 1000, 4000]
			}
		},
		{
			id: 5,
			code: "gold_miner",
			name: "Золотая шахта",
			size: {
				x: 2, y: 2
			},
			max: 8,
			upgrade: {
				minePerSecond: [10, 30, 90, 300],
				maxHealth: [1000, 2500, 7000, 16000],
			},
			upgradeCost: {
				gold: [10000, 50000, 240000]
			}
		}
	]
}

class Cannon extends Building {
	lastAttackTime = 0
	power;

	constructor (props){
		super(props)
		this.upgrade(1)
		this.projectileDamage = 300
		this.radius = this.bStat.radius
		this.radius2 = this.radius ** 2
	}

	isAttackAvaliable(){
		return this.lastAttackTime + 5000 <= +new Date()
	}

	attack(e, engine){
		this.lastAttackTime = +new Date()

		this.angle = e.position.clone().sub(this.center)
		this.angle.normalize()

		let bullet = new Projectile({
			x: this.center.x,
			y: this.center.y, 
			id: engine.lastObjectID++,
			engine,
			ownerId: this.ownerId,
			direction: this.angle.clone(),
			power: this.power,
			maxDistance: this.radius
		})
	}

	process(engine){
		super.process(engine)

		if (!this.isAttackAvaliable()) return;

		let target = {
			len2: Infinity,
			e: null
		}

		for (let e of engine.enemies){
			let len2 = this.center.sub(e.position).lengthSquared()
			if (len2 <= this.radius2 && len2 < target.len2){
				target.len2 = len2
				target.e = e
			}
		}

		if (target.e){
			this.attack(target.e, engine)
			engine.addChanged({
				id: this.id,
				angle: this.angle
			})
		}
	}
}

class Door  extends Building {
	constructor(props){
		super(props)

		this.body.getFixtureList().setFilterData({
			groupIndex: -this.ownerId,
			categoryBits: this.body.getFixtureList().getFilterCategoryBits(),
			maskBits: this.body.getFixtureList().getFilterMaskBits()
		})
	}
}

class GoldMine extends Building {
	constructor (props){
		super(props)
		this.upgrade(1)
		this.cd = 0
	}

	postProcess(engine){
		this.cd++
		if (this.cd >= engine.__HZ){
			this.cd = 0
			let player = engine.players.find(p => p.id === this.ownerId)
			player.inventory.gold += this.minePerSecond
			engine.addChanged({
				id: player.id,
				inventory: player.inventory
			})
		}
	}
}

module.exports = Building
module.exports.Cannon = Cannon
module.exports.Door = Door
module.exports.GoldMine = GoldMine