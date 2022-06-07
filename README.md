# 🤖 Leetcode Bot

> This tool is meant to remind you to do the leetcode daily challenge by adding the leetcode daily challenge to your Todoist.

# 👀 Want to use it?

> Create Todoist account:
1. Copy your [API Token](https://todoist.com/app/settings/integrations)

> Git Clone this repo:
1. NPM install
2. Add your Todoist API Token
```
wrangler secret put TODOIST_API_TOKEN
```
3. Optionally adjust the [Cron](https://crontab.guru/#1_0_*_*_*) in wrangler.toml

> Create [Cloudflare](https://workers.cloudflare.com/) account:
1. Deploy to the cloud
```
wrangler publish
```
