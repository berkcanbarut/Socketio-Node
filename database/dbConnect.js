const mongoose = require("mongoose");

const databaseConnect = () => {
    mongoose.connect(process.env.DB_CONNECT_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(()=>{
            console.log("Connect to DB : Success");
        })
        .catch((err)=>{
            console.log("Connect to DB : Failed ");
            console.log(err);
        })
}
module.exports = databaseConnect;