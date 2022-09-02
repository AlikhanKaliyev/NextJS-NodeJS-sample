const express = require("express");
const router = express.Router();

router.use(require("./blogs"));
router.use(require("./categories"));
router.use(require("./comments"));
router.use(require("./users"));
module.exports = router;
