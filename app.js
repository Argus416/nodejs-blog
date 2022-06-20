const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const expressListRoutes = require("express-list-routes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const mainRouter = require("./router/main");

app.use("/", mainRouter);

app.listen(PORT, () => {
	expressListRoutes(app);
	console.log(`Server running at http://localhost:${PORT}`);
});
