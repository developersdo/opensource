#!/bin/bash

##
# Update GitHub data using latest changes in repo and pushing changes to it.
# @author Rubens Mariuzzo <rubens@mariuzzo.com>
#
# Usage:
#   $ ./update-github-data.sh [--cron]
#
# Options:
#   --cron Indicates the script is being run in a minimal environment as crond.
#
# Setup:
#   1. `git config --global user.name "Rubens Mariuzzo`
#   2. `git config --global user.email "rubens@mariuzzo.com"`
#   3. `ssh-keygen -t rsa -b 4096 -C "rubens@mariuzzo.com" -P ""`
#   4. Add public key to personal GitHub account.
#   5. Install tj/n, n latest and yarn.
#   6. Create a `config.json` file along with this script.
##

# Configuration
REPO_URL=git@github.com:developersdo/opensource.git
REPO_BRANCH=master
SCRIPT_PATH=$(dirname $(realpath $0))
REPO_PATH="$SCRIPT_PATH/repo"

# Set PATH environment if needed.
if [[ $* == *--cron* ]]; then
  echo "🔨  Setting PATH environment variable..."
  export PATH="/home/ubuntu/bin:/home/ubuntu/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
fi

# Clone repository if needed otherwise pull latest changes.
if [ -d $REPO_PATH ]; then
  echo "⤵️  Pulling latest changes..."
  cd $REPO_PATH
  git reset --hard
  git pull --quiet origin $REPO_BRANCH
else
  echo "⤵️  Cloning repository..."
  git clone --quiet $REPO_URL $REPO_PATH
fi

# Install dependencies.
echo "🔌  Installing dependencies..."
yarn install --silent

# Copy local configuration.
echo "📝  Copying local configuration..."
if [ ! -f "$SCRIPT_PATH/config.json" ]; then
  echo "Error: No local configuration file found at: $SCRIPT_PATH/config.json"
  exit 2
fi
cp -v $SCRIPT_PATH/config.json $SCRIPT_PATH/repo/config/development.json

# Run database migrations if needed.
echo "🗄  Updating database schema..."
yarn sequelize -- db:migrate

# Update GitHub data using the scraper and data generator.
echo "⚡️  Refreshing GitHub data..."
yarn refresh --silent

# Add changes, commit and push.
echo "📦  Preparing commit..."
git add .
git commit -m 'Data updated (automatically).'
git push origin $REPO_BRANCH

echo "✨  All good!"
