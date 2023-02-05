const express = require('express')
const router = express.Router()
const responses = require('@utils/responses.js')

//const matrix = require('node-sense-hat').Leds
const sense = require('sense-hat-led').sync
sense.rotation = 180

router.get('/single', async (req, res) => {
	const red = [255, 0, 0]
	const green = [0, 255, 0]
	const blue = [0, 0, 255]

	sense.setPixel(0, 0, red)
	sense.setPixel(1, 1, green)
	sense.setPixel(2, 2, blue)

	res.json(responses.success())
})

router.get('/matrix', async (req, res) => {
	const X = [255, 0, 0]
	const O = [255, 255, 255]

	// prettier-ignore
	const questionMark = [
		O, O, O, X, X, O, O, O,
		O, O, X, O, O, X, O, O,
		O, O, O, O, O, X, O, O,
		O, O, O, O, X, O, O, O,
		O, O, O, X, O, O, O, O,
		O, O, O, X, O, O, O, O,
		O, O, O, O, O, O, O, O,
		O, O, O, X, O, O, O, O,
	]

	sense.setPixels(questionMark)

	res.json(responses.success())
})

router.get('/clear', async (req, res) => {
	// clear with color
	// sense.clear(255, 255, 255)

	sense.clear()

	res.json(responses.success())
})

router.get('/text', async (req, res) => {
	// sense.showMessage('One small step for Pi!')
	// or
	sense.showMessage('One giant leap for Pikind!', 0.2, [255, 0, 0], [0, 255, 0])

	res.json(responses.success())
})

router.get('/image', async (req, res) => {
	sense.loadImage('lion.png')

	res.json(responses.success())
})

module.exports = router
