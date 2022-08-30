const controller = require("./controller");
const socketProcess = (socket,io) =>{
    socket.on("JobCreate",async (data)=>{
        const message = await controller.postCreateMessage(data);
        //console.log(message);
    })
    socket.on("JobUpdateRobot",(data) => {
        io.sockets.emit("JobUpdate",data);
    })

    setInterval(()=>{
        let minute = new Date().getMinutes();
        let battery = Number(minute - 59) / 59 * 100;
        battery = Math.abs(Math.ceil(battery));
        io.sockets.emit("BatteryInfo",{batteryLevel : Number(battery)});
    },2000)
}

module.exports = socketProcess;