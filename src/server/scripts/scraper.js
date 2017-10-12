#!/usr/bin/env node

//destructing the command line arguments
const [,,...args]=process.argv;

switch(args[0]){
	case '--only=users':
	  console.log('fetching only users repos ===============');	
	  require('../services/scraper/users').scrape();
	break;
	case '--only=repos':
	  console.log('fetching only repos ===============');	
	  require('../services/scraper/repos').scrape();
	break;
	default:
	  console.log("fetching all repos ===============");	
	  require('../services/scraper').scrape();	

}

