# niceorg-client (NOC)

> Implementation of the [NICE Design System](https://design-system.nice.org.uk/) for www.nice.org.uk

[:rocket: Jump to usage](#usage) | [:pencil2: Jump to developing locally](#developing-locally)

<details>
<summary><strong>Table of contents</strong></summary>

- [What is it?](#what-is-it)
- [Technical stack](#technical-stack)
- [IDE](#ide)
- [Usage](#usage)
	- [Niceorg](#niceorg)
	- [Guidance-Web](#guidance-web)
- [Developing locally](#developing-locally)
	- [Proxy to niceorg](#proxy-to-niceorg)
	- [Bookmarklets](#bookmarklets)
- [Environments](#environments)

</details>

## What is it?

This repository houses the client code (CSS and JS) shared between the front-end of Orchard and Guidance Web.

NOC augments the [NICE Design System](https://design-system.nice.org.uk/) with nice.org-specific components, including styling of old [NICE.Bootstrap](https://github.com/nice-digital/NICE.Bootstrap) components. We support using NICE.Bootstrap components with their existing markup as re-writing all the markup for the whole of niceorg and guidance would be a _massive_ job. So instead, we style them using the Design System, so at least we get consistent foundations like typography, spacing and colour.

This also has the benefit that comms and content teams can continue to use the existing markup they know to produce pages. But allows them to gradually start using the new Design System components.

NOC is a separate repository from the core niceorg codebase because:

- it allows front-end developers to work on it in an IDE (or OS) of their choice, without Visual Studio
- the CSS and JS is referenced by both [niceorg](https://github.com/nice-digital/niceorg) and [Guidance-Web](https://github.com/nice-digital/guidance-web) so makes sense to live on its own
- we deploy it to the CDN so doesn't live on a niceorg/Guidance-Web server.

## Technical stack

- [Visual Studio Code](https://code.visualstudio.com/) as an IDE
- [NICE Design System](https://design-system.nice.org.uk/)
  - And [NICE Icons](https://github.com/nice-digital/nice-icons)
- [Webpack](https://webpack.js.org/) for module bundling
  - Using [Babel](https://babeljs.io/) for ES6 transpilation
- [Jest](https://jestjs.io/) for unit testing
- [ESLint](https://eslint.org/) for JavaScript linting
- [Prettier](https://prettier.io/) for code style/formatting
- [stylelint](https://stylelint.io/) for SCSS linting
- [SASS](https://sass-lang.com/) for CSS preprocessing
- [PostCSS](http://postcss.org/) for post processing
  - With [Autoprefixer](https://github.com/postcss/autoprefixer)
    - Using [browserslist](https://github.com/browserslist/browserslist) and our [shared browserslist config](https://github.com/nice-digital/browserslist-config#readme)

## IDE

We recommend using [Visual Studio Code](https://code.visualstudio.com/) as the IDE for development. We have a set of [recommended extensions](.vscode/extensions.json) you should install to make development easier. You should be prompted to install these when opening the folder in VS Code.

## Usage

Add the following `link` and `script` tags into your page source to use NOC:

```diff
<head>
+	<link rel="preconnect" href="https://fonts.gstatic.com">
+	<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
+	<link href="http://localhost:8087/niceorg/css/app.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<main>
	</main>
+	<script src="http://localhost:8087/niceorg/js/app.js" async></script>
</body>
```

> This example is using http://localhost:8087/ for local development. See the [environments](#environments) listed below for the CDN URLs for use in production.

NOC is designed to be used within both niceorg (Orchard front-end) and Guidance-Web:

### Niceorg

To use NOC within niceorg, set the `StylesheetNICEDesignSystem` AppSetting in [Orchard.Web/Web.config](https://github.com/nice-digital/niceorg/blob/master/src/Orchard.Web/Web.config) (or the Octo variable) to point to one of the [environments](#environments) listed below.

TODO: Add niceorg JS url once NOC JS has been added

E.g. to point locally, for develoment:

```xml
<add key="StylesheetNICEDesignSystem" value="http://localhost:8087/niceorg/css/app.css" />
```

Or to point to the verison on the live CDN:

```xml
<add key="StylesheetNICEDesignSystem" value="//cdn.nice.org.uk/niceorg/css/app.css" />
```

### Guidance-Web

To use NOC within Guidance-Web, set the `NiceorgDesignSystemCSSURL` and `NiceorgDesignSystemJSURL` AppSettings in [Guidance.Web/appsettings.json](https://github.com/nice-digital/guidance-web/blob/master/Guidance.Web/appsettings.json#L121-L123) to point to one of the [environments](#environments) listed below.

E.g. to point to the local dev server:

```json
"NiceorgDesignSystemCSSURL": "http://localhost:8087/niceorg/css/app.css",
"NiceorgDesignSystemJSURL": "http://localhost:8087/niceorg/js/app.js"
```

or, to point to the live CDN:

```json
"NiceorgDesignSystemCSSURL": "//cdn.nice.org.uk/niceorg/css/app.css",
"NiceorgDesignSystemJSURL": "//cdn.nice.org.uk/niceorg/js/app.js"
```

## Developing locally

To develop locally, make sure you have [Node 10.13.0+](https://nodejs.org/en/download/).

Run `node -v` in a terminal to log the currently Node version. If it's less than 10.13 then [download and install the latest LTS (Long Term Support) version of Node](https://nodejs.org/en/download/) or use nvm (Node Version Manager) to install it (`nvm install 10.13.0 && nvm use 10.13.0` in a terminal). 

> Note: our supported version of Node is dictated by [webpack's supported Node version](https://webpack.js.org/concepts/#environment).

Once Node is installed do the following to run NOC locally:

1. Run `npm ci` in a terminal to install npm dependencies
2. Run `npm start` to run the project

This runs a dev server and opens http://localhost:8087/niceorg/playground.html in a browser. This page is a dev playground for testing out components, see _server/playground.ejs for the source.

This dev server also proxies requests to niceorg:

### Proxy to niceorg

Running the dev server via `npm start` sets up a proxy to live niceorg on www.nice.org.uk. This means, for example if you view http://localhost:8087/ it will make a request for the HTML response from https://www.nice.org.uk/ behind the scenes, process the HTML to make links relative etc, and inject the NOC CSS and JS.

Run one of these commands to run against a different environment:

- local (http://niceorg) `npm run dev:local`
- dev `npm run dev:dev`
- test `npm run dev:test`
- alpha `npm run dev:alpha`

### Bookmarklets

To test the local version of NOC against the [NICE.Bootstrap guide](http://nice-digital.github.io/NICE.Bootstrap/index.html), create a bookmarklet with the following link:

```
javascript:$('link[href*="NICE.bootstrap.css"]').replaceWith('<link href="http://localhost:8087/niceorg/css/app.css" rel="stylesheet" type="text/css" />')
```

And to test the local version of NOC against www.nice.org, use the following bookmarklet:

```
javascript:$('link[href*="NICE.bootstrap.updated.brand.css"]').remove(),$('link[href*="fontawesome.css"]').remove(),$('link[href*="NICE.glyphs.css"]').remove(),$('link[href*="NICE.base"]').remove(),$("head").append('<link href="http://localhost:8087/niceorg/css/app.css" rel="stylesheet" type="text/css" />')
```

> Note: we can't actually create bookmarklets here because GitHub strips them from markdown.

## Environments

The CSS is available at */niceorg/css/app.css* and the JS at */niceorg/js/app.js* on each of the following environments:

| Environment      | CSS                                               | JavaScript                                      |
| ---------------- | :------------------------------------------------ | :---------------------------------------------- |
| Local dev server | http://localhost:8087/niceorg/css/app.css         | http://localhost:8087/niceorg/js/app.js         |
| Alpha CDN        | https://alpha-cdn.nice.org.uk/niceorg/css/app.css | https://alpha-cdn.nice.org.uk/niceorg/js/app.js |
| Live CDN         | https://cdn.nice.org.uk/niceorg/css/app.css       | https://cdn.nice.org.uk/niceorg/js/app.js       |

> Note: we used to have separate minified CSS URLs (e.g. https://cdn.nice.org.uk/niceorg/css/app.min.css). Those are now 'deprecated' because we have full sourcemaps. However, we still deploy a copy of the CSS there for backwards compatibility.
