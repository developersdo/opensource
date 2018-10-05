[Dominican Open Source - Discover the open source ecosystem related to the Dominican Republic!](https://github.com/developersdo/opensource/.github/banner.svg)
<h1 align=center>
<a href="https://developersdo.github.io/opensource">Dominican Open Source</a>
</h1>

**Dominican Open Source** is an initiative to gather all possible public data about projects and their contributors related to the Dominican Republic in GitHub using the [GraphQL API](https://developer.github.com/v4/).

## Want to join?

There are different ways to participate in this local effort:

 - You can include your GitHub users by adding the term “Dominican” to your profile's location. (Note: Dominicana is also accepted)
 - You can improve the code of the [public website](src/client) or [the scraper](src/server).
 - And if you don't code you can check the grammar, the UX, the graphic design, [report bugs](https://github.com/developersdo/opensource/issues/new) - it is up to you ;)
 
## Development
 
If you want to run this project locally you will need: [NodeJS 8+](https://nodejs.org/en/). After git-cloning this project do:

**Note:** If you just want to develop the website then skip step 3 and 4.

 1. `npm install`
 2. Copy `config/default.json` to `config/development.json`.
 3. [Generate a GitHub personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
 4. Add your GitHub personal access token to `config/development.json` (this file is [git-ignored](.gitignore)).
 5. `npm run serve` and open http://localhost:8080/opensource

That's it! Happy coding.

### Scripts

 - `npm run scrape` – scrape for all GitHub users and repos as configured.
   - `npm run scrape -- --only=users` – scrape for all GitHub repos.
   - `npm run scrape -- --only=repos` – scrape for all GitHub users.
 - `npm run generate-data` – generate GitHub users and repos for front-end usage.
   - `npm run generate-data -- --only users` – generate JSON data for users.
   - `npm run generate-data -- --only repos` – generate JSON data for repos.
 - `npm run sequelize` – to use sequelize, pass cli args as follow: `npm run sequelize -- db:migrate`.
   - `npm run sequelize -- db:migrate` – Run all pending database migrations.
   - `npm run sequelize -- db:migrate:undo` – Rollback last database migration.
   - `npm run sequelize -- db:migrate:undo:all` – Rollback all database migrations.
 - `npm run sequelize:debug` – to use sequelize in debug mode.
 - `npm run refresh` – to run the scraper and generate frontend data.
 - `npm run build` – to run static assets for production usage.

### Deployment

The deployment is done by [Travis](https://travis-ci.org/developersdo/opensource) which listen to pushes in [`master`](https://github.com/developersdo/opensource/tree/master) branch, then build website assets and finally pushes the site into [`gh-pages`](https://github.com/developersdo/opensource/tree/gh-pages) branch. All details are specified at [.travis.yml](.travis.yml).

<div align=center>
With ♥︎ from <a href="https://github.com/developersdo/opensource/graphs/contributors">all contributors</a>.
</div>
