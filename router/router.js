const router = require("express").Router();
const controller = require("../controller/controller");

router.get("/",controller.getManagement);
router.post("/create",controller.postCreateMessage);

module.exports = router;