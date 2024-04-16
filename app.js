const express=require("express");
const app=express();
const port=process.env.port || 5000;
const mongoose  = require("mongoose");
const {mongoUrl} = require("./keys");
const cors=require('cors');
const path=require("path")

app.use(cors()) ;


require('./models/model')    //userschema update
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))    //import router for run middleware function
app.use(require("./routes/Createpost"))
app.use(require("./routes/user"))

mongoose.set('strictQuery', true);

mongoose.connect(mongoUrl)


mongoose.connection.on("connected" , ()=>{
    console.log("sucessfully connected to mongo")
})
mongoose.connection.on("error" , ()=>{
    console.log("not connected to mongo")
})

//serveing the frontend
// app.use(express.static(path.join(__dirname , "./frontend/build")))

// app.get("*", (req,res)=>{
//     res.sendFile(
//         path.join(__dirname , "./frontend/build/index.html"),
//         function(err){
//             res.status(500).send(err)
//         }
//     )
// })
// Serving the frontend
const frontendPath = path.join(__dirname, "./frontend/build");
app.use(express.static(frontendPath));

// Catch-all route to serve index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"), err => {
        if (err) {
            console.error("Error serving index.html:", err);
            res.status(500).send(err);
        }
    });
});

app.listen(port , ()=>{
    console.log("server is running on port " + port);
})