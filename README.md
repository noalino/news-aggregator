# News Aggregator Web Application

A website that enables you to read headlines by topics, search for news articles and save them to read them later on.

Made with [News API](https://newsapi.org/).

Client side environment variables:
- `NODE_ENV`: Node environment (i.e. `development` | `production`)
- `APP_URL`: URL of the site
- `API_KEY`: News API key
- `TRACKING_ID`: Tracking ID from Google Analytics

Back-end side environment variables:
- `NODE_ENV`: Node environment (i.e. `development` | `production`)
- `APP_URL`: URL of the site
- `PORT`: Port to listen to
- `MONGODB_URI`: Mongo database URI to connect to
- `PUBLIC_KEY`: Public key used in user authentication with Passport-JWT
- `PRIVATE_KEY`: Private key used in user authentication with Passport-JWT

# What I've learned

- Set routes with React Router
- Manage state with Redux
- Configure Webpack
- Implement user authentication with JWT & PassportJS
- Configure database with mLab
- Deploy with Heroku