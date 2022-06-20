exports.error404 = (req, res) => {
	res.render("view/errors/404.ejs", { pageName: "404" });
};
