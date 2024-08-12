const SAT = require("sat");
const Pl = require("planck-js")
const { Actions } = require("../engine/configs");

module.exports = class Entity {
    _lastAttackTime = 0;
    stunned = 0

	/**
	 * @type {Pl.Body}
	 */
	body

    constructor ({id}){
        this.id = id

        this.moving = false
        this.movingVector = new Pl.Vec2()
    }

    move (vector) {
        if (!this.moving && !vector) return;

        if (!vector) vector = this.movingVector
        this.position.add(vector)
    }

    attack(entity){
        if (entity.undamagable) return;
        
        this.actions.push({
            type: Actions.damage,
            target: entity
        })
        this._lastAttackTime = +new Date()
    }
    
    // return 1 if die
    damage(damage){
        this.health -= damage
        if (this.health <= 0){
            return 1
        }
        return 0
    }
    
    isAttackAvaliable(){
        return false;
    }
}