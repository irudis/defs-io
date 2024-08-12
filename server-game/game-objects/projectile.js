const SAT = require("sat");
const Pl = require("planck-js")
const { Actions } = require("../engine/configs");

module.exports = class Projectile {
    type = 4;
    undamagable = true
    stunned = 0

    constructor ({x, y, id, direction, speed, ownerId, maxDistance, maxTargets, power, engine, radius}){
        this.id = id

        this.moving = true

        this.speed = speed || 2.5

        this.direction = Pl.Vec2(direction)
        this.direction.mul(this.speed)

        this.targetsCount = 0
        this.maxTargets = maxTargets || Infinity

        this.maxDistance = (maxDistance || 1.5) ** 2

        this.ownerId = ownerId

        this.startPosition = Pl.Vec2(x, y)

        this.damaged = []
        this.actions = []

        this.power = power

        this.radius = radius || 0.16

        this.body = engine.world.createBody({
			type: "kinematic",
            linearDamping: 0,
            angularDamping: 0,
            fixedRotation: true,
            position: new Pl.Vec2(x, y),
			userData: this
        })

        this.body.createFixture({
            shape: new Pl.Circle(this.radius),
            isSensor: true
        })

        this.actions.push({
            type: Actions.spawn
        })

        engine.projectiles.push(this)
    }
    

    get position(){
        return this.body.getPosition()
    }

    attack(entity){
        this.damaged.push(entity.id)
        this.actions.push({
            type: Actions.damage,
            target: entity
        })
    }

    getDamage(){
        return this.power
    }
    
    // return 1 if die
    damage(damage, damagedBy){
        this.health -= damage
        if (this.health <= 0){
            // this.#onDieCallback(this, damagedBy)
            return 1
        }
    }

    process(entity, engine) {
        // console.log("process", entity)
        if (entity.id === this.ownerId || entity.ownerId === this.ownerId) return

        if (this.damaged.includes(entity.id)) return

        this.attack(entity)
    }

    postProcess(engine){
        if (this.startPosition.clone().sub(this.position).lengthSquared() >= this.maxDistance){
            engine.entityDie(this)
        }
    }
}