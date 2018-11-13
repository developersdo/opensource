#!/usr/bin/env node
const generator = require('../services/generator')

const args = process.argv.slice(2)

if (args.length === 0) {
  generator.generate()
} else if (args.length === 2) {

  if ( args[0] === '--only') {

    switch (args[1]) {
      case 'users':
        generator.generateUsers()
        break;
      case 'repos':
        generator.generateRepos()
        break;
      default:
        console.log('Unexpected argument, --only accepts users or repos')
        process.exit(1)

    }
  } else {
    console.log('Unexpected option, this script only accepts --only as option')
    process.exit(1)
  }
}
