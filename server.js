const express = require('express')
const cors = require('cors')
const connectDB = require('./connectionDb')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// call db
connectDB()

// require routes
const taskRoutes = require('./routes/task.route')
const employeeRoutes = require('./routes/employee.route')
// express use routes
app.use('/tasks', taskRoutes)
app.use('/employees', employeeRoutes)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
