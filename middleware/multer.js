const multer = require("multer");
const path = require("path");
const fs = require("fs");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/upload/");
	},
	filename: function (req, file, cb) {
		const name = file.originalname.split(" ").join("_");
		cb(null, name + "-" + Date.now() + path.extname(file.originalname));
		// cb(null, name);
	},
});

var upload = multer({
	storage: storage,
	limits: {
		fileSize: 20000000,
	},
	filefilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|webp/;
		let result = filetypes.test(path.extname(file.originalname));
		if (result) return cb(null, true);
		else return cb("extension not supported");
	},
}).single("file");


module.exports = upload;