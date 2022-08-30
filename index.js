const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const dbConnet = require("./database/dbConnect");
const router = require("./router/router");
const socketProcess = require("./controller/socket");
dotenv.config({
    path : "./config/conf.env"
});

const io = new Server(server);

io.on("connection",(socket) =>socketProcess(socket,io));

dbConnet();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.use(router);

server.listen(process.env.PORT,() =>{
    console.log("Server Running | Port : " + process.env.PORT);
})
