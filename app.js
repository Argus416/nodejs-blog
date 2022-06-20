const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const expressListRoutes = require("express-list-routes");
const path = require("path");
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.text())

app.use(cors());

app.set("view engine", "ejs");

const mainRouter = require("./router/main");

app.use("/", mainRouter);

mongoose
	.connect("mongodb://localhost:27017/blog")
	.then(() => {
		console.log("Connected to MongoDB");
		app.listen(PORT, () => {
			expressListRoutes(app);

			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB", err);
		console.error(err);
	});
