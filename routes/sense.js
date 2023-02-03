const express = require("express");
const router = express.Router();

router.get("/api/:id", async (req, res) => {
	res.json(responses.success("hello"));
});

module.exports = router;
