const path = require("path");
const JobMessage = require("../model/JobMessage");
exports.getManagement = async (req,res,next) =>{
    const viewPath = path.join(__dirname,"../views/index.html");
    
    return res.sendFile(viewPath);
}

exports.postCreateMessage = async (message) =>{
    const jobMessage = await JobMessage.create({
        ...message,
    });
    return jobMessage;
}