require('module-alias/register')

const express = require('express')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	res.json({ success: true, message: 'Hello World!' })
})

/* Sense Hat Module */
require('@routes/sense-hat/joystick.js')

const ledsRouter = require('@routes/sense-hat/leds.js')
app.use('/sense/leds', ledsRouter)

const imuRouter = require('@routes/sense-hat/imu.js')
app.use('/sense/imu', imuRouter)

/* Pixel Golf Game */
require('@routes/pixel-golf.js')

app.listen(port, () => {
	console.log(`raspberry-sense running at ${port}`)
})
