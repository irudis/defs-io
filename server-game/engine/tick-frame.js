const SAT = require("sat")

const {Actions} = require("./configs.js")

function  processEntities (){
    for (let entity of [...this.players, ...this.enemies]){
        if (entity.type === 3){
            entity.updateDirection()
        }
        entity.move(this.__RATE)

        // todo check collisions

        for (let action of entity.actions){

            switch (action.type){
                case Actions.spawn:
                    this.addChanged(Object.assign({
                        type: entity.type
                    }, entity))
                    break;
                case Actions.move:
                    this.addChanged({
                        id: entity.id,
                        position: entity.position,
                        angle: entity.direction
                    })
                    // console.log(player.position)
                    break;
                case Actions.damage:
                    let res = action.target.damage(entity.getDamage())
                    if (res){
                        // tdod
                    }
                    // console.log(action.target)
                    this.addChanged({
                        id: action.target.id,
                        health: action.target.health,
                        removed: res
                    })
                    break;
            }

        }

        entity.actions = []
    }
}

const _offsetVector = new SAT.Vector()
const res = new SAT.Response()
let updated = false;

function collide () {
    let _entities = [...this.players, ...this.enemies]

    for (let p = 0; p < 10; p++){

        for (let i = 0; i < _entities.length; i++){
            for (let j = i + 1; j < _entities.length; j++){
                updated = false
    
                if (!SAT.testCircleCircle(_entities[i].body, _entities[j].body, res)) continue
    
                // console.log(_entities[i].type, _entities[j].type, _entities[i].isAttackAvaliable())
    
                let player, enemy
                if (_entities[i].type === 1 && _entities[j].type === 3){
                    player = _entities[i]
                    enemy = _entities[j]
                } else if (_entities[i].type === 3 && _entities[j].type === 1){
                    player = _entities[j]
                    enemy = _entities[i]
                } else {
                    continue
                }
    
                if (enemy && enemy.isAttackAvaliable()){
                    let distance = (_entities[i].position.x - _entities[j].position.x) ** 2 +
                                        (_entities[i].position.y - _entities[j].position.y) ** 2
    
                    if (enemy._distance > distance){
                        enemy._distance = distance
                        enemy._attack = player
                    }
                }
    
    
                res.overlapV.scale(0.2)
                _entities[i].collideOffset.sub(res.overlapV)
                _entities[j].collideOffset.add(res.overlapV)
                res.clear()
            }
        }
    
        for (let ent of _entities){
            _offsetVector.x = 0
            _offsetVector.y = 0
            updated = false
    
            for (let b of this.buildings){
                if (!SAT.testCirclePolygon(ent.body, b.body, res)) continue
    
                
                if (ent.type === 3 && ent.isAttackAvaliable()){
                    let distance = (ent.position.x - b.body.center.x) ** 2 +
                                        (ent.position.y - b.body.center.y) ** 2
                    if (ent._distance > distance){
                        ent._distance = distance
                        ent._attack = b
                    }
                }
    
                ent.collideOffset.add(res.overlapV)
                res.clear()
            }
    
            if (ent.collideOffset.x !== 0 || ent.collideOffset.y !== 0){
                ent.position.sub(ent.collideOffset)
                ent.collideOffset.scale(0, 0)
                this.addChanged({
                    id: ent.id,
                    position: ent.position
                })
            }
    
            if (ent.position.x - ent.body.r < 0) ent.position.x = ent.body.r
            else if (ent.position.x + ent.body.r > this.size.width) ent.position.x = this.size.width - ent.body.r
            if (ent.position.y - ent.body.r < 0) ent.position.y = ent.body.r
            else if (ent.position.y + ent.body.r > this.size.height) ent.position.y = this.size.height - ent.body.r
    
            ent._distance = Infinity
            if (ent._attack){
                // console.log(ent)
                ent.attack(ent._attack)
                delete ent._attack
                // console.log(ent._attack)
            }
        }
    }
}

module.exports = function () {
    (processEntities.bind(this))();
    (collide.bind(this))();
}