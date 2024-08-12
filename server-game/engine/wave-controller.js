const Pl = require("planck-js")
const Enemy = require("../game-objects/enemy.js")

let waves = []
let waveId = 1

const BOSS_WAVE = 15

const waveGenerator = {
    position (center) {
        let side1 = Math.random() * 5 - 2.5
        let side2 = (Math.random() > 0.5 ? 1 : -1) * 2.5
        if (Math.random() > 0.5){
            return {x: side1 + center.x, y: side2 + center.y}
        } else {
            return {y: side1 + center.y, x: side2 + center.x}
        }
    },

    boss (wave, center) {
        let enemies = []

        let pos = this.position(center)

        enemies.push({
            level: Math.floor(wave / BOSS_WAVE),
            type: Enemy.ENEMY_TYPE.BOSS,
            x: pos.x,
            y: pos.y,
            time: 0
        })

        return enemies
    },

    simple (wave, center) {
        let enemies = []

        wave = wave % BOSS_WAVE

        for (let i = 0; i < 8 * wave; i++){
            let pos = this.position(center)
            enemies.push({
                level: Math.floor(wave / BOSS_WAVE),
                type: Enemy.ENEMY_TYPE.COMMON_SMALL,
                x: pos.x,
                y: pos.y,
                time: Math.floor(i / 5) * 10
            })
        }

        return enemies
    },

    medium (wave, center) {
        let enemies = []

        wave = wave % BOSS_WAVE

        for (let i = 0; i < 6 * wave; i++){
            let pos = this.position(center)
            enemies.push({
                level: Math.floor(wave / BOSS_WAVE),
                type: Math.random() > 0.5 ? Enemy.ENEMY_TYPE.COMMON_SMALL : Enemy.ENEMY_TYPE.COMMON_MEDIUM,
                x: pos.x,
                y: pos.y,
                time: Math.floor(i / 10) * 10
            })
        }

        return enemies
    },

    hard (wave, center) {
        let enemies = []

        wave = wave % BOSS_WAVE

        for (let i = 0; i < 6 * wave; i++){
            let pos = this.position(center)
            enemies.push({
                level: Math.floor(wave / BOSS_WAVE),
                type: Math.random() > 0.5 ? Enemy.ENEMY_TYPE.COMMON_MEDIUM : Enemy.ENEMY_TYPE.COMMON_LARGE,
                x: pos.x,
                y: pos.y,
                time: Math.floor(i / 10) * 10
            })
        }

        return enemies
    }
}


module.exports = {
    start: function(player, base) {
        let enemies = []

        let wave = player.wave % BOSS_WAVE
        if (wave === 0){
            enemies = waveGenerator.boss(player.wave, base.center)
        } else if (wave <= 5) {
            enemies = waveGenerator.simple(player.wave, base.center)
        } else if (wave <= 10) {
            enemies = waveGenerator.medium(player.wave, base.center)
        } else if (wave <= 14) {
            enemies = waveGenerator.hard(player.wave, base.center)
        }

        for (let e of enemies){
            e.base = base
            e.player = player
            e.style = Math.floor(player.wave / BOSS_WAVE) % 6 + 1
        }

        waves.push({
            player, enemies, id: waveId++
        })
        // console.log(waves)
    },

    update: function (time) {
        let spawn = []
        for (let wave of waves){
            for (let enemy of wave.enemies){
                if (enemy.time <= time){
                    spawn.push(enemy)
                    wave.enemies = wave.enemies.filter(e => e.id !== enemy.id)
                }
            }
            if (wave.enemies.length === 0){
                waves = waves.filter(w => w.id !== wave.id)
            }
        }
        return spawn
    },

    remove: (player) => {
        waves = waves.filter(w => w.player.id !== player.id)
    }
}