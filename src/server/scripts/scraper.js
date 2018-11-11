#!/usr/bin/env node

//destructing the command line argumentsn
const [,,...args]= process.argv
 
let scraper

switch(args[0]) {
  case '--only=users':
    scraper = require('../services/scraper/users')
  break;
  case '--only=repos':
    scraper = require('../services/scraper/repos')
  break;
  default:
    scraper = require('../services/scraper')
}

(async () => {
  try {
    await scraper.scrape()
    process.exit(0)
  } catch(error) {
    console.error(error)
    process.exit(1)
  }
})()