const express = require('express')
const router = express.Router()
const responses = require('@utils/responses.js')

const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

router.get('/all', async (req, res) => {
	IMU.getValue((err, data) => {
		if (err !== null) {
			console.error('Could not read sensor data: ', err)
			res.json(responses.error(err))
			return
		}

		console.log('Accelleration is: ', JSON.stringify(data.accel, null, '  '))
		console.log('Gyroscope is: ', JSON.stringify(data.gyro, null, '  '))
		console.log('Compass is: ', JSON.stringify(data.compass, null, '  '))
		console.log('Fusion data is: ', JSON.stringify(data.fusionPose, null, '  '))

		console.log('Temp is: ', data.temperature)
		console.log('Pressure is: ', data.pressure)
		console.log('Humidity is: ', data.humidity)

		res.json(responses.success(data))
	})
})

module.exports = router
