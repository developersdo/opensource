#!/usr/bin/env node

//destructing the command line argumentsn
const [,,...args]= process.argv
 
switch(args[0]) {
	case '--only=users':
	  require('../services/scraper/users').scrape()
	break;
	case '--only=repos':
	  require('../services/scraper/repos').scrape()
	break;
	default:
	  require('../services/scraper').scrape();

}

