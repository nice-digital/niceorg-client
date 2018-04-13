# niceorg-client

> Implementation of the [NICE Design System](https://github.com/nhsevidence/nice-design-system) for www.nice.org.uk

## What is it?
This repository houses the client code (CSS and JS) for the new niceorg front-end. *New* means pages implemented with the Design System from around April 2018 onwards as part of journey mapping, starting with the topic page.

Niceorg-client augments the [NICE Design System](https://github.com/nhsevidence/nice-design-system) with nice.org-specific components, including styling of old [NICE.Bootstrap](https://github.com/nhsevidence/NICE.Bootstrap) components. We support using NICE.Bootstrap components with their existing markup as re-writing all the markup for the whole of niceorg and guidance would be a *massive* job. So instead, we style them using the Design System, so at least we get consistent foundations like typography, spacing and colour.

This also has the benefit that comms and content teams can continue to use the existing markup they know to produce pages. But allows them to gradually start using the new Design System components.

Niceorg-client is a separate repository from the core niceorg codebase because:
- it allows front-end developers to work on it in an IDE (or OS) of their choice, without Visual Studio
- the CSS and JS is referenced by both [niceorg](https://github.com/nhsevidence/niceorg) and [Guidance-Web](https://github.com/nhsevidence/guidance-web) so makes sense to live on its own
- we deploy it to the CDN so doesn't live on a niceorg/Guidance-Web server.

## Technical stack

- [NICE Design System](https://github.com/nhsevidence/nice-design-system)
- [SASS](https://sass-lang.com/) for CSS preprocessing
- [PostCSS](http://postcss.org/) for post processing
- [Grunt](https://gruntjs.com/) as a task runner
- [Webpack](https://webpack.js.org/) for JS module bundling

## Usage

TODO

## Development

1. `npm i`
2. `npm start`
3. http://localhost:8087/

## Environments

| Environment |  URL  |
| ----------- | :---: |
| Alpha CDN   | TODO  |
| Live CDN    | TODO  |
