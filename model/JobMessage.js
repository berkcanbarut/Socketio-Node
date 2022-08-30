const mongoose = require("mongoose");

const JobMessage = mongoose.Schema({
    messageType : {
        type : String,
        require : true,
    },
    externalReferenceId : {
        type : String,
        require : true,
    },
    taskList : [
        {
            actionName: String,
            locationId : String,
        }
    ],
    jobStatus : {
        type : String,
    }
})

module.exports = mongoose.model("JobMessage",JobMessage);