const createRedisClient = require("redis").createClient
const express = require('express')
const http = require("http")
const httpProxy = require('http-proxy-middleware')

const Utils = require("./utils.js")

const config = require("./config.json")

const proxy = httpProxy.createProxyMiddleware({
    ws: true,
    target: 'ws://192.168.0.10:20000'
});


// REDIS

const redis = createRedisClient({
    url: config.redis.url,
    password: config.redis.password
});
redis.connect();
redis.on('error', err => console.log('Redis Client Error', err));


// HTTP

const app = express()
app.use(express.json())

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
    proxy.upgrade(req, socket, head);
    console.log("proxy", req.url)
});

server.listen(config.http.port);

// VARIABLES

let serverList = []
let lastServerName = 1


// CLIENT LOGIC

app.get("*", async (req, res, next) => {
    console.log("here")
    next()
})

app.get("/api/*", async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next()
})

app.get('/api/server-list', async (req, res) => {
    res.json(serverList)
})
app.get('/', async (req, res) => {
    
})


// SERVER LOGIC


app.post("/server/*", async (req, res, next) => {
    // SERVER CHECKER TODO
    next()
})

app.post("/server/player-join", async (req, res) => {
    let urlParams = Utils.checkToken(req.body.url)
    console.log(urlParams)
    // let player = redis.json.get("user" + req.body.userId)

    res.json({
        accepted: true,
        urlParams
    })
})

app.post("/server/player-left", async (req, res) => {

})

app.post("/server/update-server", async (req, res) => {
    let serv = serverList.find(s => s.domain === req.body.domain && s.port === req.body.port)
    if (!serv){
        serv = {
            domain: req.body.domain,
            port: req.body.port,
            maxPlayers: req.body.maxPlayers,
            name: "Server #" + lastServerName++
        }
        serverList.push(serv)
    }
    serv.players = req.body.players
    serv.lastUpdate = +new Date()
})