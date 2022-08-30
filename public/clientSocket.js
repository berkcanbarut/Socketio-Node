const addTaskBtn = document.getElementById("addTask");
const taskListDiv = document.getElementById("taskList");
const createMessageBtn = document.getElementById("createMessage");
const updateMessageBtn = document.getElementById("updateMessage");
var socket = io();

addTaskBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const count = Array.from(taskListDiv.children).length;
    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "row mt-2";
    newTaskDiv.innerHTML = `
        <div class="col-6">
            <label for="actionName${count}" class="form-label">Action Name ${count}:</label>
            <input type="word" class="form-control" name="actionName${count}" id="actionName${count}">
        </div>
        <div class="col-6">
            <label for="locationId${count}" class="form-label">Location ID ${count}:</label>
            <input type="word" class="form-control" name="locationId${count}" id="locationId${count}">
        </div>
    `
    taskListDiv.appendChild(newTaskDiv);
})

createMessageBtn.addEventListener("click",(e) =>{
    e.preventDefault();
    const messageType = document.getElementById("messageType");
    const externalReferenceId = document.getElementById("externalReferenceId");
    const jobStatus = document.getElementById("jobStatus");
    let taskList = [];
    const count = Array.from(taskListDiv.children).length;
    for(let i=1; i<count;i++){
        let actionName = document.getElementById(`actionName${i}`).value;
        let locationId = document.getElementById(`locationId${i}`).value;
        taskList.push({
            actionName,
            locationId,
        });
    }
    
    socket.emit("JobCreate",{
        messageType : messageType.value,
        externalReferenceId : externalReferenceId.value,
        taskList : taskList,
        jobStatus : jobStatus.value,
    });
    crateMessageClearInput();
})

function crateMessageClearInput(){
    document.getElementById("messageType").value = "";
    document.getElementById("externalReferenceId").value = "";
    document.getElementById("jobStatus").value = "";

    Array.from(taskListDiv.children).forEach((element,index) => {
        if(index != 0){
            element.remove();
        }
    });
    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "row";
    newTaskDiv.innerHTML = `
        <div class="col-6">
            <label for="actionName1" class="form-label">Action Name 1:</label>
            <input type="word" class="form-control" name="actionName1" id="actionName1">
        </div>
        <div class="col-6">
            <label for="locationId1" class="form-label">Location ID 1:</label>
            <input type="word" class="form-control" name="locationId1" id="locationId1">
        </div>
    `
    taskListDiv.appendChild(newTaskDiv);

}

updateMessageBtn.addEventListener("click",(e) =>{
    e.preventDefault();
    const messageType = document.getElementById("messageType1");
    const externalReferenceId = document.getElementById("externalReferenceId1");
    const jobStatus = document.getElementById("jobStatus1");
    const actionName = document.getElementById("actionUpdate");
    const locationId = document.getElementById("loactionUpdate");

    socket.emit("JobUpdateRobot",{
        messageType : messageType.value,
        externalReferenceId : externalReferenceId.value,
        lastCompletedTask : {
            actionName : actionName.value,
            locationId : locationId.value,

        },
        jobStatus : jobStatus.value,
    });

    messageType.value = "";
    externalReferenceId.value = "";
    jobStatus.value = "";
    actionName.value = "";
    locationId.value = "";
})

socket.on("JobUpdate",(data)=>{
    const messageType = document.getElementById("msgType");
    const externalReferenceId = document.getElementById("extRef");
    const jobStatus = document.getElementById("jobSts");
    const actionName = document.getElementById("action");
    const locationId = document.getElementById("location");

    messageType.textContent = data.messageType;
    externalReferenceId.textContent = data.externalReferenceId;
    jobStatus.textContent = data.jobStatus;
    actionName.textContent = data.lastCompletedTask.actionName;
    locationId.textContent = data.lastCompletedTask.locationId;
})

socket.on("BatteryInfo",(data) => {
    const batterySpan = document.getElementById("battery");

    batterySpan.textContent = data.batteryLevel;
})