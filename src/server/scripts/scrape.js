#!/usr/bin/env node

const args = process.argv.slice(2)
console.log(process.argv)
const parameters = {
	['only']: {
		user: require('../services/scraper/users'),
		repo: require('../services/scraper/repos')
	}
}

console.log('arg', args)
if (args.length === 0) {
	require('../services/scraper').scrape()
}
else {
	const [param,option] = args[0].split('=')
	const key = parameters[param] || {}
	const fn = key[option]
	if (fn) fn.scrape()
	else console.log('Invalid arguments')
}

