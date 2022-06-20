const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
	{
		titre : {
			type : String,
			required : true,
		}, 
		body : {
			type : String,
			required : true,
		},
		img : String,
	},

	{ timestamps: true }
);

module.exports = mongoose.model("article", articleSchema);
