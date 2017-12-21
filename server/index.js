var express = require("express"),
	path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;
app.set("port", PORT);

// Avoid 404 error in console
app.get("/setgtmdatalayer", function (req, res) {
	res.setHeader("Content-Type", "application/javascript");
	res.send("var dataLayer = [{\"uid\":null,\"persona\":null}]");
});

app.use("/fonts", express.static(path.join(__dirname, "./../node_modules/@nice-digital/icons/dist")));
app.use("/css", express.static(path.join(__dirname, "../temp")));
app.use(express.static(path.join(__dirname, "./../pages")));

app.listen(app.get("port"), function(){
	console.log("Express server listening on port " + app.get("port"));
});

module.exports = app;
