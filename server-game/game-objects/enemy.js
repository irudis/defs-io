const protobuf = require("protobufjs")
const pb = protobuf.loadSync("./message.proto")

const Entity = require("./entity.js")
const {Actions} = require('../engine/configs.js')

const Pl = require("planck-js")

class Enemy extends Entity {
    type = 3;

    #attackCD = 2000

    player;
    base;
    style;

    constructor ({x, y, id, level, type, engine, base, player, style}) {
        super({id})

        this.direction = Pl.Vec2(0, 0)
        this.actions = []

        this.level = level
        this.bType = type
        this.base = base
        this.player = player
        this.style = style

        let stat = stats[{
            1: "boss",
            2: "small",
            3: "medium",
            4: "large"
        }[this.bType]];

        this.radius = stat.radius
        this.speed = stat.speed
        this.maxHealth = stat.maxHealth[this.level]
        this.power = stat.power[this.level]

        this.health = this.maxHealth

        // PLANCK

        this.body = engine.world.createDynamicBody({
            linearDamping: 0,
            angularDamping: 0,
            fixedRotation: true,
            position: Pl.Vec2(x, y),
            userData: this
        })

        this.body.createFixture({
            shape: new Pl.Circle(this.radius),
            friction: 0
        })

        this.moving = true
    }

    attack(target){
        super.attack(target)
        this.actions.push({
            type: Actions.update,
            isAttack: true
        })
    }

    static ENEMY_TYPE = {
        BOSS: 1,
        COMMON_SMALL: 2,
        COMMON_MEDIUM: 3,
        COMMON_LARGE: 4
    }

    get position(){
        return this.body.getPosition()
    }

    getDamage(){
        return this.power
    }

    isAttackAvaliable(){
        return this._lastAttackTime + this.#attackCD < +new Date()
    }
    
    updateDirection(){
        this.direction.set(this.base.center)
        // this.direction.set(this.player.position)
        this.direction.sub(this.position)
        this.direction.normalize()
        this.direction.mul(this.speed)
    }

    move (_rate){
        if (this.direction.x === 0 && this.direction.y === 0) return;

        let spd = this.speed * _rate
        this.position.add(this.direction.clone().scale(spd, spd))

        this.actions.push({
            type: Actions.move
        })
    }
}


const stats = {
    small: {
        speed: 2,
        radius: 0.15,
        maxHealth: [600, 800, 1600],
        power: [100, 300, 600]
    },
    medium: {
        speed: 1.7,
        radius: 0.2,
        maxHealth: [900, 1400, 2700],
        power: [100, 300, 600]
    },
    large: {
        speed: 1.2,
        radius: 0.27,
        maxHealth: [1000, 1800, 4000],
        power: [100, 300, 600]
    },
    boss: {
        speed: .5,
        radius: 0.4,
        maxHealth: [9000, 16000, 40000],
        power: [500, 1000, 2000]
    }
}


module.exports = Enemy
