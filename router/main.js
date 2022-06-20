const express = require("express");
const mainController  = require("../controller/main");
const router = express.Router();
const multer = require("../middleware/multer");
router.get("/", mainController.getHome);
router.get("/create", mainController.getCreate);
router.post("/create",multer, mainController.postCreate);

router.get("/view/:id", mainController.getArticle);
router.get("/edit/:id", mainController.editPage);
router.put("/edit/:id",multer, mainController.updatePost);


module.exports = router;
