const needle = require("needle"),
	querystring = require("needle/lib/querystring"),
	cheerio = require("cheerio");

const nocMiddleware = async (req, res, next) => {
	if (req.path.includes(".")) return next();

	const url =
		"https://www.nice.org.uk" + req.path + "?" + querystring.build(req.query);

	let niceorgResponse;
	try {
		niceorgResponse = await needle("get", url);
	} catch {
		console.error(`Error getting page ${req.path}`);
		return next();
	}

	if (niceorgResponse.statusCode != 200) {
		console.warn(
			`Got ${niceorgResponse.statusCode} from ${req.path} ${niceorgResponse.headers.location}`
		);
		return next();
	}

	if (typeof niceorgResponse.body === "string")
		res.send(prepareResponse(niceorgResponse.body));
	else res.json(niceorgResponse.body);
};

const prepareResponse = (body) => {
	// Make absolute links relative
	body = body.replace(/href="https:\/\/www.nice.org.uk/g, `href="`);

	// Make Orchard paths absolute
	body = body.replace(/="\/Themes\//gi, `="https://www.nice.org.uk/Themes/`);
	body = body.replace(/="\/Modules\//gi, `="https://www.nice.org.uk/Modules/`);
	body = body.replace(/="\/Media\//gi, `="https://www.nice.org.uk/Media/`);

	// Make Guidance-Web paths absolute
	body = body.replace(/="\/css\//g, `="https://www.nice.org.uk/css/`);
	body = body.replace(/="\/js\//g, `="https://www.nice.org.uk/js/`);

	const $ = cheerio.load(body);

	// Remove old CSS
	$(`link[href*="/Themes/NICE.Bootstrap/Styles/nice/NICE.base-"]`).remove();
	$(`link[href*="NICE.bootstrap.updated.brand.css"]`).remove();
	$(`link[href*="fontawesome.css"]`).remove();
	$(`link[href*="NICE.glyphs.css"]`).remove();

	// Remove CDN NOC so we can use local CSS
	$(`link[href="https://cdn.nice.org.uk/niceorg/css/app.min.css"]`).remove();

	// Add in our new, local CSS
	$("head").append(
		`<link href="/niceorg/css/app.css" rel="stylesheet" type="text/css" />`
	);
	// ...and our new, local JS
	$("body").append(`<script src="/niceorg/js/app.js" async></script>`);

	return $.html();
};

module.exports = { nocMiddleware };
