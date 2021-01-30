# News Aggregator Web Application

A website that enables you to read headlines by topics, search for news articles and save them to read them later on.

Made with [News API](https://newsapi.org/).

Client side environment variables:
- `NODE_ENV`: Node environment (i.e. `development` | `production`)
- `APP_URL`: URL of the site
- `API_KEY`: News API key

Back-end side environment variables:
- `NODE_ENV`: Node environment (i.e. `development` | `production`)
- `APP_URL`: URL of the site

Use of RSA keys:
- `./public-key.pem`
- `./private-key.pem`

Hint: you can create both keys from this command `openssl req -nodes -new -x509 -keyout private-key.pem -out public-key.pem`

# What I've learned

- Set routes with React Router
- Manage state with Redux
- Configure Webpack
- Implement user authentication with JWT & PassportJS
- Containerize the app with Docker
- Deploy with Heroku
