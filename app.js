require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const expressListRoutes = require("express-list-routes");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const fs = require('fs');

app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use(cors());

app.use(cookieParser());

// app.use(async function (req, res, next) {
// 	res.locals.success_msg = req.flash("success_msg");
// 	res.locals.error_msg = req.flash("error_msg");

// 	next();
// });

const mainRouter = require("./router/main");

app.use("/", mainRouter);

app.use("*", (req, res) => {
	res.status(404).render("../views/errors/404.ejs", { pageName: "404" });
});
mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			expressListRoutes(app);
			console.log(`Server is running on port http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err);
		console.error(err);
	});
