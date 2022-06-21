const Article = require("../model/Article");
const fs = require("fs");

exports.getHome = async (req, res) => {
	try {
		const articles = await Article.find();

		res.render("../views/home.ejs", { articles: articles, pageName: "home" });
	} catch (err) {
		console.error(err);
	}
};

exports.getArticle = async (req, res) => {
	try {
		const { id } = req.params;
		const article = await Article.findById(id);
		res.render("../views/article.ejs", { article, pageName: "article" });
	} catch (err) {
		console.error(err);
	}
};

exports.getCreate = async (req, res) => {
	try {
		res.render("../views/create.ejs", { pageName: "create" });
	} catch (err) {
		console.error(err);
	}
};

exports.postCreate = async (req, res) => {
	try {
		const { titre, body } = req.body;
		let file = req.file?.filename ?? "";

		const article = new Article({
			titre,
			body,
			img: file,
		});

		await article.save();

		res.redirect("/");
	} catch (err) {
		console.error(err);
	}
};

exports.editPage = async (req, res) => {
	try {
		const { id } = req.params;
		const article = await Article.findById(id);
	
		res.render("../views/edit.ejs", { article, pageName: "edit" });
	} catch (err) {
		console.error(err);
	}
};

exports.updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { titre, body } = req.body;
		let file = req.file?.filename;

		const toUpdate = {
			titre,
			body,
		};

		// Delete old image if new image is uploaded
		if (file !== undefined) {
			const article = await Article.findById(id);
			const oldImage = article.img;
			const imageExist = fs.existsSync(`public/upload/${oldImage}`);
			toUpdate.img = file;
			// Delete old image if it exists
			if (imageExist && oldImage !== "") {
				fs.unlinkSync(`public/upload/${oldImage}`);
			}
		}

		// Update article
		await Article.updateOne({_id : id},toUpdate);

		res.redirect("/");
	} catch (err) {
		res.send(err);
		console.error(err);
	}
};

exports.deletePost = async (req, res) => {
	try {
		const { id } = req.params;


		const article = await Article.findById(id);
		const oldImage = article.img;

		if(oldImage !== ""){
			const imageExist = fs.existsSync(`public/upload/${oldImage}`);
			// Delete old image if it exists
			if (imageExist && oldImage !== "") {
				fs.unlinkSync(`public/upload/${oldImage}`);
			}
		}

		await Article.deleteOne({ _id: id });

		res.send("post deleted");

		// const articleUpdate = await Article.updateOne(toUpdate)
	} catch (err) {
		console.error(err);
	}
};
