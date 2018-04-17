var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
	title:String,
	image_url:String,
	cat:String,
	name:String,
	desc:String,
	date:{
		type: Date,
		default:Date.now
	},

});
module.exports=mongoose.model('posts',blogSchema);