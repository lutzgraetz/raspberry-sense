require("module-alias/register");

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ success: true });
});

app.get("/health", (req, res) => {
	res.json({ success: true });
});

const senseRouter = require("@routes/generic.js");
app.use("/sense", senseRouter);

appDb.connectToServer((err) => {
	app.listen(port, () => console.log(`raspberry-sense running at ${port}`));
});
