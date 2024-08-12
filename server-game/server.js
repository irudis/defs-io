const WebSocket = require("ws")
const fetch = require("node-fetch")

const Player = require("./game-objects/player.js")
const Game = require("./engine/engine.js")

const config = require("./config.json")
const Building = require("./game-objects/building.js")

const port = Math.floor(Number(process.argv[2]))
const domain = process.argv[3]

if (!domain || Number.isNaN(port)) throw new Error();

const game = new Game()
game.start()

const server = new WebSocket.WebSocketServer({port})
server.on("connection", async (socket, req) => {
    let res
    try {
        res = await fetch(`${config.backend}/server/player-join`, {
            body: JSON.stringify({
                url: req.url
            }),
            method: "post",
            headers: {'Content-Type': 'application/json'}
        })
        res = await res.json()
    } catch (e) {
        console.error(e)
        return socket.close()
    }
    if (!res.accepted) return socket.close()
    socket.send(JSON.stringify({
        status: "ok",
        buildings: Building.buildings
    }))

    console.log("open")

    socket.onerror = (e) => {
        console.log(e)
    }

    socket.onclose = (e) => {
        console.log("close", e)
    }

    game.addPlayer({socket, state: res.urlParams})
})

server.on("listening", async () => {
    console.log(`Launched on port ${port}.`)
    setInterval(async () => {
        fetch(`${config.backend}/server/update-server`, {
            method: "post",
            body: JSON.stringify({
                port,
                domain,
                maxPlayers: game.maxPlayers,
                players: game.players.length
            }),
            headers: {'Content-Type': 'application/json'}
        }).catch(e => {})
    }, 2000)
})



Object.defineProperties(Array.prototype, {
    count: {
        value: function (callback) {
            let count = 0;
            for(let i=0; i<this.length; i++)
                if (callback(this[i]))
                    count++;
            return count;
        }
    }
});