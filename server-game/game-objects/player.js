const protobuf = require("protobufjs")
const pb = protobuf.loadSync("./message.proto")
const SAT = require("sat")

const Entity = require("./entity.js")
const {Actions} = require('../engine/configs.js')

const serverPB = pb.lookupType("ServerMessage")
const clientPB = pb.lookupType("ClientMessage")


const Pl = require("planck-js")

class Player extends Entity {
    type = 1;
    /**
     * @type {Pl.Body}
     */
    body
    isAttack = false

    constructor ({socket, x, y, name, id, engine, onDie, onDamage, world}) {
        super({x, y, id, onDie, onDamage})

        /**
         * @type {WebSocket}
         */
        this.socket = socket
        this.name = name

        this.wave = 0

        this._uid = 0 // todo

        this.speed = 2
        this.direction = new Pl.Vec2()
        this.actions = []

        this.actions.push({
            type: Actions.spawn
        })

        this.buildings = []
        this.inventory = {
            gold: 100,
            stone: 0,
            wood: 0
        }

        this.engine = engine

        this.maxHealth = 10000
        this.health = this.maxHealth

        this.weapons = {
            axe: {
                id: 1,
                mine: 4,
                level: 1,
                damage: 50
            },
            sword: {
                id: 2,
                mine: 1,
                level: 1,
                damage: 200
            }
        }

        // PLANCK

        this.body = engine.world.createDynamicBody({
            linearDamping: 0,
            angularDamping: 0,
            fixedRotation: true,
            position: new Pl.Vec2(x, y),
            userData: this
        })

        this.body.createFixture({
            shape: new Pl.Circle(0.14),
            filterGroupIndex: -this.id
        })

        this.weapon = 1
    }

    set weapon(v){
        if (v < 1 || v > 2) return
        if (this._weapon){
            this.body.destroyFixture(this.body.getFixtureList())
        }

        this._weapon = this.weapons[
            ["axe", "sword"][v - 1]
        ]

        let vertices = [
            Pl.Vec2(0.15, 0.32),
            Pl.Vec2(0.28, 0.28),
            Pl.Vec2(0.39, 0.0),
            Pl.Vec2(0.28, -0.28),
            Pl.Vec2(0.15, -0.32),
            Pl.Vec2(0,0)
        ];

        this.body.createFixture({
            shape: Pl.Polygon(vertices),
            isSensor: true,
            userData: {isWeapon: true}
        });

        this.actions.push({
            type: Actions.update,
            weapon: v
        })
    }

    getDamage(){
        return this.weapon.damage
    }

    get weapon(){
        return this._weapon
    }

    get position(){
        return this.body.getPosition()
    }

    emit (message) {
        let buffer = serverPB.encode(serverPB.fromObject(message)).finish()
        this.socket.send(buffer)
    }

    processMessage (buffer){
        let message;
        try {
            message = clientPB.decode(buffer)
            // console.log(message)
        } catch (e) {
            console.log(player, e)
            this.socket.close()
        }

        if (message.direction){

            if (message.direction.x !== 0 || message.direction.y !== 0){
                this.direction.set(message.direction.x, message.direction.y)

                this.direction.normalize()
                this.direction.mul(this.speed)
                this.moving = true
            } else {
                this.moving = false
            }

            // console.log(this.direction)
        }

        if (message.build){
            let res = this.engine.build(this, message.build.id, message.build.position)
        }

        if (message.upgradeBuilding){
            let building = this.buildings.find(b => b.id === message.upgradeBuilding)
            if (!building) return
            let res = building.canUpgrade(this.inventory)
            if (!res) return
            this.actions.push({
                type: Actions.upgrade,
                target: building
            })
            this.actions.push({
                type: Actions.inventory
            })
        }

        if (message.hasOwnProperty("attack")){
            this.isAttack = message.attack
            if (message.attack){
                this.actions.push({
                    type: Actions.attack
                })
            }
        }

        if (message.weapon){
            this.weapon = message.weapon
        }
    }

    move (_rate){
        if (this.direction.x === 0 && this.direction.y === 0) return;

        let spd = this.speed * _rate
        // this.position.add(this.direction.clone().scale(spd, spd))
        
        this.actions.push({
            type: Actions.move
        })
    }

    attack(target){
        switch (target.type){
            case 5:
                this.inventory[target.resource] += this.weapon.mine

                this.actions.push({
                    type: Actions.update,
                    inventory: this.inventory
                })
                break
        }
        super.attack(target)
    }
}

module.exports = Player
