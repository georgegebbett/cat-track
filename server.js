const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const catState = {
    "catState": [
        {
            "name": "Estragon",
            "in": true
        },
        {
            "name": "Vlad",
            "in": false
        }
    ]
}

app.use(express.static('public'))

app.get("/api/cats", (req, res) => {
    res.json(catState)
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index2.html');
})

app.get("/clientScript", (req, res) => {
    res.sendFile(__dirname + '/client.js');
})

app.post("/api/cats", (req, res) => {
    console.log(req.query);

    if (req.query.cat && req.query.in) {
        io.emit('cat movement', {name: req.query.cat, in: (req.query.in === "true" ? true : false)});
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }


})

io.on('connection', (socket) => {
    console.log("A user connected");
    io.emit('cat state', catState);
})


server.listen(3000, () => {
    console.log("listening on port 3000");
})
