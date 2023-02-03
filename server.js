require('module-alias/register')

const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.json({ success: true })
})

app.get('/health', (req, res) => {
	res.json({ success: true })
})

const senseRouter = require('@routes/sense.js')
app.use('/sense', senseRouter)

app.listen(port, () => {
	console.log(process.env?.XXX)
	console.log(`raspberry-sense running at ${port}`)
})
