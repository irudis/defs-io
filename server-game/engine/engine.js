const SAT = require("sat")

const Pl = require('planck-js');

const tickFrame = require("./tick-frame.js");

const Player = require("../game-objects/player.js");
const Building = require("../game-objects/building.js");
const Enemy = require("../game-objects/enemy.js");
const Obstacle = require("../game-objects/obstacle.js");

const {LocalVariables, Actions} = require("./configs.js");
const WaveController = require("./wave-controller.js");

const ZERO_VEC2 = Pl.Vec2(0, 0)


class Game {
    constructor (props = {}) {
        this.__scale = 0.01
        this.__HZ = 15
        this.__RATE = 1 / this.__HZ;
        this.__RATE_TIMEOUT = this.__RATE * 1000

        this.players = []
        this.enemies = []
        this.buildings = []
        this.projectiles = []
        this.resources = []
        this.obstacles = []

        this.changed = {}

        this.maxPlayers = props.maxPlayers || 10
        this.lastObjectID = 1

        this.tileSize = 30 * this.__scale
        this.tiles = {
            width: props.size && props.size.width || 100,
            height: props.size && props.size.height || 100
        }
        this.size = {
            width: this.tiles.width * this.tileSize,
            height: this.tiles.height * this.tileSize
        }

        this._tick = tickFrame.bind(this)

        this.maxTime = 300
        this.time = 0

        
        
        // PLANK 


        this.world = new Pl.World({
            gravity: Pl.Vec2(0, 0)
        })

        this.world.on("pre-solve", (contact) => {
            // console.log(contact)

            let e1 = contact.getFixtureA().getBody().getUserData()
            let e2 = contact.getFixtureB().getBody().getUserData()

            if (!e1 || !e2) return

            if (e2.type === 3 && e1.type !== 3) [e1, e2] = [e2, e1]

            if (e1.type !== 3) return
            if (e2.type === 3) return
            if (!e1.isAttackAvaliable()) return

            e1.attack(e2)
        })

        this.world.on("begin-contact", (contact) => {
            // console.log(contact)

            let e1 = contact.getFixtureA().getBody().getUserData()
            let e2 = contact.getFixtureB().getBody().getUserData()

            if (!e1 || !e2) return

            if (e2.type === 4) [e1, e2] = [e2, e1]

            if (e1.type !== 4) return
            
            e1.process(e2)
        })

        let border = this.world.createBody();
        border.createFixture(Pl.Edge(Pl.Vec2(0, 0), Pl.Vec2(0, this.tileSize * this.tiles.height)));
        border.createFixture(Pl.Edge(Pl.Vec2(0, 0), Pl.Vec2(this.tileSize * this.tiles.width, 0)));
        border.createFixture(Pl.Edge(
            Pl.Vec2(this.tileSize * this.tiles.width, this.tileSize * this.tiles.height),
            Pl.Vec2(this.tileSize * this.tiles.width, 0)));
        border.createFixture(Pl.Edge(
            Pl.Vec2(this.tileSize * this.tiles.width, this.tileSize * this.tiles.height),
            Pl.Vec2(0, this.tileSize * this.tiles.height)));

        for (let i = 0; i < 20; i++){
            let obstacle = new Obstacle({
                x: Math.random() * this.tileSize * this.tiles.width,
                y: Math.random() * this.tileSize * this.tiles.height,
                id: this.lastObjectID++,
                engine: this
            })

            this.obstacles.push(obstacle)
        }
    }

    /**
     * 
     * @param {Player} player 
     */
    addPlayer ({socket, state}) {
        let x, y;
        do {
            x = Math.random() * this.size.width;
            y = Math.random() * this.size.height;
        } while(this.buildings.find(b => {
            return Math.abs(b.position.x - x) <= 400 * this.__scale || Math.abs(b.position.y - y) <= 400 * this.__scale;
        }));

        let player = new Player({
            socket,
            x, y, 
            name: state.name,
            id: this.lastObjectID++,
            engine: this,
            onDie: this.onEntityDie,
            onDamage: this.onEntityDamage
        })
        this.players.push(player)
        this.emitWorld(player)
        
        // EVENT LISTENERS
        socket.onclose = () => {
            console.log("close")
        }

        socket.onerror = (e) => {
            console.log("error", e)
        }

        socket.onmessage = (e) => player.processMessage(e.data)
    }

    build(player, id, position){
        // todo checks

        let bStat = Building.buildings.find(b => b.id === id)
        if (!bStat) return

        if (player.buildings.count(b => b.bType === id) >= bStat.max) return

        let bClass

        switch(bStat.id){
            case 3:
                bClass = Building.Cannon
                break;
            case 4:
                bClass = Building.Door;
                break
            case 5:
                bClass = Building.GoldMine
                break;
            default:
                bClass = Building
        }

        const building = new bClass({
            x: position.x * this.__scale, 
            y: position.y * this.__scale,
            type: id,
            id: this.lastObjectID++,
            tileSize: this.tileSize,
            owner: player,
            engine: this
        })

        let bSAT = new SAT.Box(
            new SAT.Vector(building.position.x, building.position.y),
            building.width, building.height).toPolygon()

        let maxOverlap2 = 0
        let res = new SAT.Response()

        this.world.queryAABB(building.body.getFixtureList().getAABB(0), (r) => {
            if (!r.getBody().getUserData()) return true;
            
            if (r !== building.body.getFixtureList()){
                if (r.getType() === "polygon"){
                    let b2SAT = new SAT.Box(
                        new SAT.Vector().copy(r.getBody().getUserData().position),
                        r.getBody().getUserData().width, r.getBody().getUserData().height).toPolygon()
                    SAT.testPolygonPolygon(bSAT, b2SAT, res)
                } else {
                    let b2SAT = new SAT.Circle(
                        new SAT.Vector().copy(r.getBody().getUserData().position),
                        r.getShape().getRadius())
                    SAT.testPolygonCircle(bSAT, b2SAT, res)
                }
                maxOverlap2 = Math.max(maxOverlap2, res.overlapV.len2())
                res.clear()
            }
            return true
        })

        if (maxOverlap2 > 0.000001){
            this.world.destroyBody(building.body)
            return
        }

        this.buildings.push(building)
        this.addChanged(Object.assign({
            position: building.position
        }, building))

        player.buildings.push(building)

        return building
    }

    preProcessEntities (){
        for (let entity of [...this.players, ...this.enemies, ...this.projectiles]){
            if (entity.type === 3){
                entity.updateDirection()
            }

            if (entity.moving && !entity.isAttack && entity.stunned < +new Date())
                entity.body.setLinearVelocity(entity.direction)
            else
                entity.body.setLinearVelocity(ZERO_VEC2)

			let angle = Math.atan2(entity.direction.y, entity.direction.x)
            entity.body.setAngle(angle)
        }
    }
    processEntities (){
        for (let entity of [...this.players, ...this.enemies, ...this.projectiles]){
            if (entity.isAttack){
                entity.actions.push({
                    type: Actions.attack
                })
            }

            for (let action of entity.actions){
                switch (action.type){
                    case Actions.update:
                        delete action.type
                        this.addChanged({
                            id: entity.id,
                            ...action
                        })
                        break
                    case Actions.spawn:
                        this.addChanged(Object.assign({
                            position: entity.position,
                            weapon: entity.weapon && entity.weapon.id
                        }, entity))
                        break;
                    case Actions.damage:
                        let res = action.target.damage(entity.getDamage())

                        this.addChanged({
                            id: action.target.id,
                            health: action.target.health,
                            damageBy: entity.id
                        })

                        if (res) {
                            this.entityDie(action.target, entity)
                        }

                        console.log(entity.type + ":", action.target.type, action.target.health + "/" + action.target.maxHealth)
                        break;
                    case Actions.upgrade:
                        action.target.upgrade()
                        this.addChanged(action.target)
                        break
                    case Actions.inventory:
                        this.addChanged({
                            id: entity.id,
                            inventory: entity.inventory
                        })
                        break
                    case Actions.attack:
                        if (entity.stunned >= +new Date()) break;
                        entity.stunned = +new Date() + 450
                        this.addChanged({
                            id: entity.id,
                            isAttack: true
                        })
                        /**
                         * @type {Pl.Contact}
                         */
                        let contact = entity.body.getContactList()
                        if (contact) contact = contact.contact
                        while(contact){
                            let bodyA = contact.getFixtureA().getBody()
                            let bodyB = contact.getFixtureB().getBody()

                            let userDataA = contact.getFixtureA().getUserData()
                            let userDataB = contact.getFixtureB().getUserData()

                            if (
                                contact.isTouching() && // есть коллизия
                                bodyA.getUserData() && bodyB.getUserData() && // задето игровое тело
                                (userDataA && userDataA.isWeapon) && (!userDataB || !userDataB.isWeapon) // не задето оружие
                            ){
                                if (bodyB.getUserData() === entity) [bodyA, bodyB] = [bodyB, bodyA]

                                console.log(bodyA.getUserData().type, bodyB.getUserData().type)

                                let target = bodyB.getUserData()
                                
                                entity.attack(target)

                            }

                            contact = contact.getNext()
                        }
                        break;
                }
    
            }
    
            entity.actions = []
        }
    }

    tickFrame () {
        this.time++

        if (this.maxTime <= this.time){
            this.time = 0
            console.log("New day")
            for (let player of this.players){

                let base = player.buildings.find(b => b.bType === 1)

                if (!base) continue;

                player.wave++

                this.addChanged({
                    id: player.id,
                    wave: player.wave
                })

                WaveController.start(player, base)
            }
        }

        let spawn = WaveController.update(this.time)

        for (let e of spawn){
            let enemy = new Enemy(Object.assign({
                id: this.lastObjectID++,
                engine: this,
            }, e))
            this.enemies.push(enemy)
            this.addChanged(enemy)
        }

        for (let building of this.buildings){
            building.process(this)
        }

        // console.log(this.time)

        this.preProcessEntities()

        this.world.step(this.__RATE)

        this.processEntities()


        for (let ent of [...this.enemies, ...this.players, ...this.projectiles]){
            if (ent.postProcess) ent.postProcess(this)
            this.addChanged({
                id: ent.id, 
                position: ent.position,
                angle: ent.direction
            })
        }
        for (let ent of this.buildings){
            ent.postProcess(this)
        }

        for (let p of this.players){
            p.emit({
                entities: Object.values(this.changed).map(c => {
                    let obj = {}
                    for (let key of Object.keys(c)){
                        if (!LocalVariables.includes(key) || c.id === p.id){
                            obj[key] = c[key]
                        }
                    }
                    return obj
                }),
                map: {
                    time: this.time
                }
            })
        }

        this.changed = {}
    }

    emit (message) {
        for (let p of this.players){
            p.emit(message)
        }
    }

    addChanged (obj){
        let ev = this.changed[obj.id]
        if (!ev){
            this.changed[obj.id] = {
                id: obj.id
            }
            ev = this.changed[obj.id]
        }

        for (let k of Object.keys(obj)){
            ev[k] = obj[k]
        }
    }

    start () {
        if (this.timeout !== undefined) return false;

        let delta = 0;

        const _tick = () => {
            this.timeout = setTimeout(() => {
                let time = +new Date()
                this.tickFrame(this.__RATE)
                delta = +new Date() - time

                _tick(this.__RATE)
            }, this.__RATE_TIMEOUT - delta)
        }

        _tick()
    }

    stop () {
        if (this.timeout === undefined) return false;

        clearTimeout(this.timeout)

        delete this.timeout

    }

    emitWorld(p) {
        p.emit({
            entities: [...this.players, ...this.buildings, ...this.enemies, ...this.projectiles, ...this.obstacles].map(c => {
                let obj = {}
                for (let key of Object.keys(c)){
                    if ((!LocalVariables.includes(key) || c.id === p.id) && key[0] !== '_'){
                        obj[key] = c[key]
                    }
                }
                if (c.id === p.id) obj.self = true;
                obj.position = c.position
                obj.weapon = c.weapon && c.weapon.id
                return obj
            }),
            map: {
                tiles: this.tiles,
                tileSize: this.tileSize,
                time: this.time,
                maxTime: this.maxTime,
                scale: 1 / this.__scale
            }
        })
    }

    entityDamage(entity, damagedBy){
        // console.log("damage", entity, damagedBy)
        // console.log(this)
        this.addChanged({
            id: entity.id,
            health: entity.health
        })
    }

    entityDie(entity, damagedBy){
        if (entity.removed) return;

        if (entity.type === 1){
            this.enemies.forEach(e => {
                if (e.player === entity) this.entityDie(e)
            })

            entity.buildings.forEach(b => {
                this.entityDie(b)
            })
            delete entity.buildings

            entity.socket.close()
        } else if (entity.type === 2){
            let owner = this.players.find(p => p.id === entity.ownerId)
            owner.buildings = owner.buildings.filter(e => e.id !== entity.id)

            if (entity.bType === 1){
                this.entityDie(this.players.find(p => p.id === entity.ownerId))
            }
        }

        let typeName = [
            "players", "buildings", "enemies", "projectiles"
        ][entity.type - 1];
        
        this.addChanged({
            id: entity.id, 
            removed: true
        })
        
        this.world.destroyBody(entity.body)
        entity.removed = true
        this[typeName] = this[typeName].filter(e => e.id !== entity.id)
    }
}

module.exports = Game