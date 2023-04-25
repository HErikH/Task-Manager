const { log } = console;
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, log(`Server is listening on port ${port}...`))
    } catch(error) {
        log(error)
    }
}

start()
