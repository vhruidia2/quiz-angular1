const express = require("express") 
const cors = require("cors") 

const app = express() 
const port = 5000 
require('./database') 
app.use(cors())
app.use(express.json())


app.get("/api", (req,res) => {
    res.status(200).json({msg: "Bit-shop API v1.0.0"})


})

app.use("/users", require("./routes/user.routes"))
app.use("/product",require("./routes/product.routes"))





app.listen(port,()=>{console.log("Api corriendo en el puerto", port)})