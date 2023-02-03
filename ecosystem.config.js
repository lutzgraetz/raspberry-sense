require("dotenv").config();

module.exports = {
	apps: [
		{
			name: "raspberry-sense",
			script: "./server.js",
			env: {
				...process.env,
			},
		},
	],
};
