const express  = require("express");
const { envConfig,logger,dbConfig } = require("./config");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json({exteded : true}))
app.use(express.urlencoded())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.json({
        message : "Test",
        data : [],
        error : []
    })
})

// sc/v1/user/login
// sc/v1/user/signup
app.use("/sc",require("./routes"));

// sc/v1/item




dbConfig.connectDb()
.then(()=>{
    app.listen(envConfig.PORT,()=>{
    console.log(`Server is running on port : http://localhost:${envConfig.PORT}/`);
    logger.info(`Server is running fine!!`)
    });
})
.catch((e)=>{
    console.log('Unable to start Server : from index.js');
    logger.info(`Unable to start Server : from index.js`)
})



