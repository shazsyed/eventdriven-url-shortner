const express = require("express")
const router = express.Router()
const ShortLinKController = require("../controllers/ShortLinkController")
const validation = require("../validators/schemas")
const schemaValidater = require("../middlewares/schemaValidater")

router.post("/short", schemaValidater(validation.createLinkSchema), ShortLinKController.createLink)
router.get("/:slug", ShortLinKController.viewLink)

module.exports = router
