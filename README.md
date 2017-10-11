<h1 align=center>✨ Local Open Source Communities ✨</h1>

This repository host the source code of the **http://developersdo.github.io/opensource** website.

**Local open source communities** is an initiative to gather all possible public data about projects from the Dominican Republic in GitHub using the [GraphQL API](https://developer.github.com/v4/). Build and serve a public website showing all the local effort that Dominicans are contributing towards open source.

## Want to join?

There are different ways you can join in this local effort:

 - You can include your GitHub users by adding the term “Dominican” to your profile's location. Note: Dominicana is also accepted.
 - You can improve the code of the website or the scraper.
 - And if you don't code you can check the grammar, the UX, the graphic design, [report bugs](https://github.com/developersdo/opensource/issues/new) - it is up to you ;)
 
## Development
 
If you want to run this project locally you will need: [NodeJS 8+](https://nodejs.org/en/). After git-cloning this project do:

 1. `yarn install`
 2. Copy `config/default.json` to `config/development.json`.
 3. [Generate a GitHub personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
 4. Add your GitHub personal access token to `config/development.json` (this file is git-ignored).

That's it! Happy coding.

### Development scripts

 - `yarn scrape` – scrape for all GitHub users and repos as configured.
 - `yarn scrape:users` – scrape for all GitHub repos.
 - `yarn scrape:repos` – scrape for all GitHub users.
 - `yarn generate` – generate GitHub users and repos for front-end usage.
 - `yarn sequelize` – to use sequelize, pass cli args as follow: `yarn sequelize -- db:migrate`.
   - `yarn sequelize -- db:migrate` – Run all pending database migrations.
   - `yarn sequelize -- db:migrate:undo` – Rollback last database migration.
   - `yarn sequelize -- db:migrate:undo:all` – Rollback all database migration.

<div align=center>
With ♥︎ from <a href="https://github.com/developersdo/opensource/graphs/contributors">all contributors</a>.
</div>
