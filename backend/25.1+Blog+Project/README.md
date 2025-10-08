# 25.1 Blog Project

Simple in-memory Blog built with Node.js, Express.js, and EJS. Posts are stored in a process array (not persisted), making this ideal for learning server-side templating, routing, and form handling before adding a database.

## Features
- Home page lists posts with truncated previews
- Compose page to create new posts
- Individual post pages at `/posts/:slug`
- Edit & delete a post (with unique slug regeneration on title change)
- About & Contact informational pages
- 404 page handling unknown routes
- Modern responsive styling using a single CSS file

## Tech Stack
- Node.js + Express
- EJS (with a base layout and partials for header/footer)
- Vanilla CSS (no framework)

## Project Structure
```
25.1+Blog+Project/
  app.js
  package.json
  README.md
  public/
    css/styles.css
  views/
    layout.ejs
    home.ejs
    compose.ejs
    post.ejs
    about.ejs
    contact.ejs
    404.ejs
    partials/
      header.ejs
      footer.ejs
```

## Running Locally
Install dependencies and start the dev server (with auto-reload):

```bash
npm install
npm run dev
```
Then open: http://localhost:3000/

For production style run:
```bash
npm start
```

## Next Steps / Ideas
- Persist posts using a database (MongoDB / PostgreSQL / SQLite)
- Validation & user feedback messages
- Tags or categories
- Client-side enhancements (markdown support, live preview)
- User authentication

## License
MIT
