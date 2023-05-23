const express = require('express')
const app = express()

const PORT = 3000

const { dbConnection } = require('./config/config')
app.use(express.json())

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))

dbConnection()

app.listen(PORT, () => console.log(`server open at port ${PORT}`))