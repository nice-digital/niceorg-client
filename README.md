# niceorg-client

> Implementation of the [NICE Design System](https://github.com/nice-digital/nice-design-system) for www.nice.org.uk

## What is it?

This repository houses the client code (CSS and JS) for the new niceorg front-end. _New_ means pages implemented with the Design System from around May 2018 onwards as part of journey mapping, starting with the topic page.

Niceorg-client augments the [NICE Design System](https://github.com/nice-digital/nice-design-system) with nice.org-specific components, including styling of old [NICE.Bootstrap](https://github.com/nice-digital/NICE.Bootstrap) components. We support using NICE.Bootstrap components with their existing markup as re-writing all the markup for the whole of niceorg and guidance would be a _massive_ job. So instead, we style them using the Design System, so at least we get consistent foundations like typography, spacing and colour.

This also has the benefit that comms and content teams can continue to use the existing markup they know to produce pages. But allows them to gradually start using the new Design System components.

niceorg-client is a separate repository from the core niceorg codebase because:

- it allows front-end developers to work on it in an IDE (or OS) of their choice, without Visual Studio
- the CSS and JS is referenced by both [niceorg](https://github.com/nice-digital/niceorg) and [Guidance-Web](https://github.com/nice-digital/guidance-web) so makes sense to live on its own
- we deploy it to the CDN so doesn't live on a niceorg/Guidance-Web server.

## Technical stack

- [NICE Design System](https://github.com/nice-digital/nice-design-system)
- [SASS](https://sass-lang.com/) for CSS preprocessing
- [PostCSS](http://postcss.org/) for post processing
- [Grunt](https://gruntjs.com/) as a task runner
- [Webpack](https://webpack.js.org/) for JS module bundling

## Development

We recommend using vscode as the IDE when developing with the NICE Design System. We have a set of [recommended extensions](.vscode/extensions.json) you should install to make development easier. You should be prompted to install these when opening the folder in vscode.

## Usage

Niceorg-client is designed to be used within both niceorg and Guidance-Web:

### Niceorg

To use niceorg-client within niceorg, set the `StylesheetNICEDesignSystem` AppSetting in [Orchard.Web/Web.config](https://github.com/nice-digital/niceorg/blob/master/src/Orchard.Web/Web.config) (or the Octo variable) to point to one of the [environments](#environments) listed below.

E.g. to point locally, for develoment:

```xml
<add key="StylesheetNICEDesignSystem" value="http://localhost:8087/app.css" />
```

Or to point to the minified verison on the live CDN:

```xml
<add key="StylesheetNICEDesignSystem" value="//cdn.nice.org.uk/niceorg/css/app.min.css" />
```

### Guidance-Web

To use niceorg-client within Guidance-Web, set the `NiceorgDesignSystemCSSURL` and `NiceorgDesignSystemJSURL` AppSetting in [Guidance.Web/appsettings.json](https://github.com/nice-digital/guidance-web/blob/master/Guidance.Web/appsettings.json#L106-L107) to point to one of the [environments](#environments) listed below.

E.g. to point locally, for develoment:

```json
"NiceorgDesignSystemCSSURL": "http://localhost:8087/app.css",
"NiceorgDesignSystemJSURL": "http://localhost:8087/app.js"
```

or:

```json
"NiceorgDesignSystemCSSURL": "//cdn.nice.org.uk/niceorg/css/app.min.css",
"NiceorgDesignSystemJSURL": "//cdn.nice.org.uk/niceorg/js/app.min.js"
```

## Development

To develop locally, make sure you have [Node 10.13.0+](https://nodejs.org/en/download/).

Run `node -v` in a terminal to log the currently Node version. If it's less than 10.13 then [download and install the latest LTS (Long Term Support) version of Node](https://nodejs.org/en/download/) or use nvm (Node Version Manager) to install it (`nvm install 10.13.0 && nvm use 10.13.0` in a terminal). 

> Note: our supported version of Node is dictated by [webpack's supported Node version](https://webpack.js.org/concepts/#environment).

Once Node is installed 

1. Run `npm i` in a terminal to install dependencies
2. Run `npm start` to run the project
3. Open http://localhost:8087/ in a browser.

### Bookmarklets

To test the local version of niceorg-client against the [NICE.Bootstrap guide](http://nice-digital.github.io/NICE.Bootstrap/index.html), create a bookmarklet with the following link:

```
javascript:$('link[href*="NICE.bootstrap.css"]').replaceWith('<link href="http://localhost:8087/app.css" rel="stylesheet" type="text/css" />')
```

And to test the local version of niceorg-client against www.nice.org, use the following bookmarklet:

```
javascript:$('link[href*="NICE.bootstrap.updated.brand.css"]').remove(),$('link[href*="fontawesome.css"]').remove(),$('link[href*="NICE.glyphs.css"]').remove(),$('link[href*="NICE.base"]').remove(),$("head").append('<link href="http://localhost:8087/app.css" rel="stylesheet" type="text/css" />')
```

> Note: we can't actually create bookmarklets here because GitHub strips them from markdown.

## Environments

TODO: Add JS URLs

| Environment   | Dev CSS                                           | Min CSS                                               |
| ------------- | :------------------------------------------------ | :---------------------------------------------------- |
| Localhost dev | http://localhost:8087/css/app.css                 | n/a                                                   |
| Alpha CDN     | https://alpha-cdn.nice.org.uk/niceorg/css/app.css | https://alpha-cdn.nice.org.uk/niceorg/css/app.min.css |
| Live CDN      | https://cdn.nice.org.uk/niceorg/css/app.css       | https://cdn.nice.org.uk/niceorg/css/app.min.css       |
