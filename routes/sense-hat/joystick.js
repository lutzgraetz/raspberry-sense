const JoystickLib = require('node-sense-hat').Joystick

JoystickLib.getJoystick().then((joystick) => {
	joystick.on('press', (direction) => {
		console.log(`Joystick pressed in ${direction} direction`)
	})
	joystick.on('release', (direction) => {
		console.log(`Joystick released in ${direction} direction`)
	})
	joystick.on('hold', (direction) => {
		console.log(`The joystick is being held in the ${direction} direction`)
	})
})
