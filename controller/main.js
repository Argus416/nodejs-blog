const Article = require("../model/Article");
const fs = require("fs");

exports.getHome = async (req, res) => {
	try {
		const articles = await Article.find();
		res.render("../view/main.ejs", { articles });
	} catch (err) {
		console.error(err);
	}
};

exports.getArticle = async (req, res) => {
	try {
		const { id } = req.params;
		const article = await Article.findById(id);
		res.render("../view/article.ejs", { article });
	} catch (err) {
		console.error(err);
	}
}

exports.getCreate = async (req, res) => {
	try {

		res.render("../view/create.ejs", {});
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
		})

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

		res.render("../view/edit.ejs", {article});


	} catch (err) {
		console.error(err);
	}
};



exports.updatePost = async (req, res) => {
	console.log("*************************");
	try {
		const { id } = req.params;
		const { titre, body } = req.body;
		let file = req.file?.filename ?? "";

		const toUpdate = {
			titre,
			body,
		}

		if(file !== ""){
			toUpdate.file = file;

			console.log(fs.existsSync(`../upload/${file}`))
			// if(fs.existsSync(`../upload/${file}`)){
			// 	fs.unlinkSync(`./public/upload/${file}`);
			// }else{

			// }

			res.send("toto");
		}

		// const articleUpdate = await Article.updateOne(toUpdate)



	} catch (err) {
		console.error(err);
	}
};


exports.deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		await Article.deleteOne({_id: id});
		res.send('post deleted');
		
		// const articleUpdate = await Article.updateOne(toUpdate)

	} catch (err) {
		console.error(err);
	}
};

