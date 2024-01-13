const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/dbconnect')
const initRoutes = require("./routes")
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8888

app.use(cors())
app.use(express.json({ limit: '10mb' })); // Sử dụng express.json() thay vì body-parser.json()
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Sử dụng express.urlencoded() thay vì body-parser.urlencoded()

dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log('server running on the port: ' + port);
})