import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from "socket.io";
const io = new Server(server);
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


import {Low, JSONFile} from "lowdb";
const file = join(__dirname, 'db.json');
const adaptor = new JSONFile(file);
const db = new Low(adaptor);

await db.read();

class Cat {
    constructor(name, isInside) {
        this.name = name;
        this.isInside = isInside;
        this.updatedTime = new Date();
    }
}

const vlad = new Cat("Vlad", true);
const estragon = new Cat("Estragon", false);

const cats = [vlad, estragon];

db.data ||= cats;

await db.write();

app.use(express.static('public'))

app.get("/api/cats", (req, res) => {
    db.read().then(() => res.json(db.data));
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index2.html');
})

app.get("/clientScript", (req, res) => {
    res.sendFile(__dirname + '/client.js');
})

app.post("/api/cats", (req, res) => {
    console.log(req.query);

    if (req.query.cat && (req.query.in === "true" || req.query.in === "false")) {
        switch (req.query.cat) {
            case "Vlad":
            case "Estragon":
                updateDatabase(req.query.cat, req.query.in === 'true').then(() => {
                    io.emit('cat state', {catState: db.data});
                    res.sendStatus(200)
                });
                break;
            default:
                res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }


})

async function updateDatabase(cat, isInside) {
    await db.read();
    for (let dbCat of db.data) {
        if (dbCat.name === cat) {
            dbCat.isInside = isInside;
            dbCat.updatedTime = new Date();
            break;
        }
    }
    await db.write();
}

io.on('connection', () => {
    console.log("A user connected");
    io.emit('cat state', {catState: db.data});
})


server.listen(3000, () => {
    console.log("listening on port 3000");
})
