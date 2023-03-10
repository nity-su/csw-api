const express = require("express");
const router = express.Router();
const property = require("../controller/property.controller");

router.post("/register", property.create);
router.get("/getAddressAll", property.findAddressAll);
router.post("/getName", property.getName);
router.post("/getAddOfOwner", property.getAddressOfowner);

module.exports = router;
