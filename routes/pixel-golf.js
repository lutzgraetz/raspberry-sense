const xbox = require('xbox-controller-node')

const sense = require('sense-hat-led').sync
sense.rotation = 180

const LED_COLORS = {
	off: [0, 0, 0],
	ball: [255, 255, 255],
	hole: [0, 255, 0],
	text: [229, 56, 79],
	background: [4, 173, 121],
}

let ball = { x: 3, y: 4, color: LED_COLORS.ball }
let hole = { x: 6, y: 6, color: LED_COLORS.hole }

let iron = 1
let shots = 0

const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)

	return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomPoint = () => {
	return {
		x: getRandomInt(0, 7),
		y: getRandomInt(0, 7),
	}
}

const comparePoints = (one, two, delta = 0) => {
	if (delta) {
		return (one.x - two.x) % delta || (one.y - two.y) % delta // FIXME
	}

	return one.x == two.x && one.y == two.y
}

const switchIron = () => {
	const ironColors = {
		1: [255, 255, 255],
		2: [255, 200, 200],
		3: [255, 150, 150],
		4: [255, 100, 100],
		5: [255, 0, 0],
	}

	ball.color = ironColors[iron]

	sense.setPixel(ball.x, ball.y, ball.color)
}

const move = (x = 0, y = 0) => {
	sense.setPixel(ball.x, ball.y, LED_COLORS.off)

	ball.x = (ball.x + x) % 8
	ball.y = (ball.y + y) % 8

	shots++

	let color = ball.color
	if (comparePoints(ball, hole)) {
		color = [255, 0, 255]

		sense.showMessage(`  ${shots} shots!`, 0.1, LED_COLORS.text, LED_COLORS.background)
	}

	sense.setPixel(ball.x, ball.y, color)
}

const restart = () => {
	sense.clear()

	let ballPoint = getRandomPoint()
	ball.x = ballPoint.x
	ball.y = ballPoint.y

	let holePoint = getRandomPoint()
	// TODO: comparePoints() with delta 3 and handle same position in this way
	hole.x = holePoint.x
	hole.y = holePoint.y

	shots = 0
	iron = 1

	sense.setPixel(ball.x, ball.y, ball.color)
	sense.setPixel(hole.x, hole.y, hole.color)

	console.log('new round')
}

xbox.on('a:release', () => {
	move(0, iron)
})
xbox.on('y:release', () => {
	move(0, iron * -1)
})

xbox.on('b:release', () => {
	move(iron, 0)
})
xbox.on('x:release', () => {
	move(iron * -1, 0)
})

xbox.on('start', () => {
	restart()
})
xbox.on('back', () => {
	sense.clear()
	console.clear()
})

xbox.on('rb', () => {
	if (shots) {
		iron = iron
	} else {
		const maxIron = 5

		iron = iron >= maxIron ? maxIron : iron + 1
	}

	console.log(iron)
	switchIron()
})
xbox.on('lb', () => {
	iron = iron < 2 ? 1 : iron - 1

	console.log(iron)
	switchIron()
})

xbox.on('leftstickpress', () => {
	console.log(`iron ${iron} selected`)
	switchIron()
})

restart()
