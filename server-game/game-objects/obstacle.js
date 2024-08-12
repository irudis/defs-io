const Entity = require("../game-objects/entity.js")
const Pl = require("planck-js")

class Obstacle extends Entity{
    type = 5;

    // bType    | resource
    // 1        | wood
    // 2        | stone
	
    constructor ({x, y, id, type, tileSize, engine}) {
        super({id})

        this.bType = type || Math.floor(Math.random() * 2) + 1
        this.radius = 0.4

        this.actions = []
		// PLANCK 

        this.body = engine.world.createBody({
			type: "static",
            position: new Pl.Vec2(x, y),
            userData: this
        })

        this.resource = ["wood", "stone"][this.bType - 1]

        this.body.createFixture({
            shape: new Pl.Circle(this.radius)
        })
    }

	get position(){
		return this.body.getPosition()
	}

    damage(){}
}

module.exports = Obstacle