const needle = require("needle"),
	querystring = require("needle/lib/querystring"),
	cheerio = require("cheerio");

const nocProxyMiddlewareFactory =
	(niceorgBaseUrl) => async (req, res, next) => {
		// Assume any URL with a dot is a file (not a page) so we don't want to proxy these to niceorg
		if (req.path.includes(".")) return next();

		const niceorgUrl =
			niceorgBaseUrl + req.path + "?" + querystring.build(req.query);

		let niceorgResponse;
		try {
			niceorgResponse = await needle("get", niceorgUrl);
		} catch {
			console.error(`Error getting page ${niceorgUrl}`);
			return next();
		}

		if (niceorgResponse.statusCode != 200) {
			console.warn(
				`Got ${niceorgResponse.statusCode} status from ${niceorgUrl}`
			);
			return next();
		}

		if (typeof niceorgResponse.body === "string")
			res.send(prepareResponse(niceorgResponse.body, niceorgBaseUrl));
		else res.json(niceorgResponse.body);
	};

const prepareResponse = (body, niceorgBaseUrl) => {
	// Make absolute links relative. Some are hardcoded to live:
	body = body.replace(/href="https:\/\/www.nice.org.uk/g, `href="`);
	// And some are hardcoded to that specific environment
	body = body.replace(new RegExp(`href="${niceorgBaseUrl}`, "g"), `href="`);

	// Make Orchard paths absolute
	body = body.replace(/="\/Themes\//gi, `="${niceorgBaseUrl}/Themes/`);
	body = body.replace(/="\/Modules\//gi, `="${niceorgBaseUrl}/Modules/`);
	body = body.replace(/="\/Media\//gi, `="${niceorgBaseUrl}/Media/`);

	// Make Guidance-Web paths absolute
	body = body.replace(/="\/css\//g, `="${niceorgBaseUrl}/css/`);
	body = body.replace(/="\/js\//g, `="${niceorgBaseUrl}/js/`);

	const $ = cheerio.load(body);

	// Remove old CSS
	$(`link[href*="/Themes/NICE.Bootstrap/Styles/nice/NICE.base-"]`).remove();
	$(`link[href*="NICE.bootstrap.updated.brand.css"]`).remove();
	$(`link[href*="fontawesome.css"]`).remove();
	$(`link[href*="NICE.glyphs.css"]`).remove();

	// Remove CDN NOC so we can use local CSS
	$(`link[href="https://cdn.nice.org.uk/niceorg/css/app.min.css"]`).remove();
	$(`link[href="https://cdn.nice.org.uk/niceorg/css/app.css"]`).remove();

	// Add in our new, local CSS
	$("head").append(
		`<link href="/niceorg/css/app.css" rel="stylesheet" type="text/css" />`
	);
	// ...and our new, local JS
	$("body").append(`<script src="/niceorg/js/app.js" async></script>`);

	return $.html();
};

module.exports = { nocProxyMiddlewareFactory };
