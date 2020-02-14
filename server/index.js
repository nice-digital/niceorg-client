var express = require("express"),
	path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;
app.set("port", PORT);

// Allow cross origin requests for font files
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/css", express.static(path.join(__dirname, "../temp/css")));
app.use("/fonts", express.static(path.join(__dirname, "./../node_modules/@nice-digital/icons/dist")));
app.use("/js/nice-design-system", express.static(path.join(__dirname, "./../node_modules/@nice-digital/design-system/dist/javascripts")));
app.use(express.static(path.join(__dirname, "./../pages")));

app.use(function (req, res, next) {
	res.status(404).sendFile(path.join(__dirname, "./../pages/404.html"));
})

app.listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port"));
});

module.exports = app;
