#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))
const parameters = {
	only: {
		user: require('../services/scraper/users'),
		repo: require('../services/scraper/repos')
	}
}

const key = Object.keys(args)[1]
if (!key) {
	require('../services/scraper').scrape()
}
else {
	const param = parameters[key] || {}
	const fn = param[args[key]]
	if (fn) fn.scrape()
	else console.log('Invalid arguments')
}

