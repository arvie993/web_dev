# Web Dev Learning Journey

> Working through *Dr. Angela Yu's Web Development Bootcamp*—this repository tracks my incremental progress, experiments, practice projects, and personal extensions.

## 📚 Purpose

This repo is a structured sandbox for:
- Recreating course exercises
- Deepening understanding by refactoring or extending examples
- Building mini-projects that evolve into more polished apps
- Documenting learning milestones and “aha!” moments

## 🧠 Current Focus

| Track | Status | Notes |
|-------|--------|-------|
| HTML fundamentals | ✅ | Semantic structure, forms |
| CSS layout & styling | ✅ | Flexbox, responsive basics |
| EJS templating | 🚧 | Layouts & partials in progress |
| JavaScript (browser) | ✅ | DOM + events |
| Node.js & Express | 🚧 | Routing basics underway |
| Templating with EJS | 🚧 | Dynamic pages |
| REST APIs & JSON | ⏳ | Coming soon |
| Databases (MongoDB + Mongoose) | ⏳ | Upcoming modules |
| Authentication & Security | ⏳ | Later-stage topic |
| Deployment | ⏳ | Will explore (Render / Railway / Vercel / Netlify) |

(Adjust as progress continues.)

## 🧰 Tech Stack (Observed / Intended)

- HTML5 / CSS3
- JavaScript (ES6+)
- EJS (Embedded JavaScript templates)
- Node.js + Express (soon / partial)
- (Planned) MongoDB + Mongoose
- (Planned) Passport.js / bcrypt
- (Planned) Deployment platform (TBD)

## 📂 Repository Structure (Representative)

> This is a suggested organization. If the current structure differs, feel free to realign or update.

```
web_dev/
├── 01-html-basics/
├── 02-css-exercises/
├── 03-js-basics/
├── 04-dom/
├── 05-node-intro/
├── 06-express/
├── 07-ejs/
├── 08-apis/
├── 09-database/
├── 10-auth/
├── public/              # Static assets (css, images, client js)
├── views/               # EJS templates
├── app.js / server.js   # Express entry point
├── package.json
└── README.md
```

If not yet structured this way, you can progressively refactor.

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/arvie993/web_dev.git
cd web_dev

# Install dependencies (once Node/Express pieces are added)
npm install

# Run a server (adjust if different)
npm run dev      # or: nodemon app.js
```

### Suggested NPM Scripts (Add to package.json when ready)

```jsonc
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

## 🎯 Learning Enhancements

| Practice Area | Ideas to Level Up |
|---------------|-------------------|
| HTML | Convert old layouts to semantic tags |
| CSS | Rebuild a layout with CSS Grid; add dark mode toggle |
| JS | Write utility functions without external libs |
| EJS | Extract layouts/partials, add conditional rendering |
| Express | Implement modular routers + error handling middleware |
| REST | Build a mini quotes or notes API |
| MongoDB | Create a simple CRUD collection | 
| Auth | Implement session + OAuth (Google) |
| Deployment | Deploy a minimal Express + EJS app |

## 🧪 Suggested Mini-Projects

| Project | Concepts Reinforced | Stretch Goals |
|---------|---------------------|---------------|
| Personal Portfolio | HTML/CSS responsiveness | Add theme switcher |
| To-Do App (EJS) | Forms, templating, CRUD | Persist with MongoDB |
| Blog Platform | REST, routing, views | Slug generation, pagination |
| Secrets App (later) | Auth, sessions | OAuth provider |
| API Consumer (e.g., Joke/Quote) | Fetching external APIs | Cache responses |

## 🗺️ Roadmap (Forward-Looking)

1. Solidify Express routing patterns
2. Introduce MongoDB + schema design
3. Implement a full CRUD app (blog / notes)
4. Add authentication + protected routes
5. Introduce API consumption + API creation
6. Deploy first full-stack project
7. Add tests (Jest / Supertest)
8. Refactor for maintainability (modularization)

## 📝 Notes & Reflections

Maintain a `LEARNING_LOG.md` (suggested) with:
- Date
- Topic studied
- Key insight
- Remaining questions

Example entry:

```
2025-10-08 - EJS Partials
Learned how to reuse nav + footer. Unsure about organizing deeply nested layouts—research layout inheritance patterns.
```

## ✅ Quality Practices (Adopt Incrementally)

| Area | Action |
|------|--------|
| Formatting | Add Prettier + `.prettierrc` |
| Linting | ESLint with recommended + Node plugin |
| Commit Style | Conventional Commits (e.g., feat:, fix:, refactor:) |
| Branches | `feature/`, `fix/`, `experiment/` prefixes |
| Docs | Update README when major module completed |

## 📸 Screenshots / Demos

> Add images or GIFs here as projects mature.

```
![Project Screenshot](./public/images/screenshot-01.png)
```

## 🔐 Environment Variables (Future)

When working with APIs or auth, create a `.env` (not committed):

```
PORT=3000
MONGO_URI=mongodb+srv://...
SESSION_SECRET=...
API_KEY=...
```

Add `.env` to `.gitignore`.

## 🧪 (Optional) Testing Setup (Future)

```bash
npm install --save-dev jest supertest
```

Example test scaffold:

```js
// tests/app.test.js
const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("responds with 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});
```

Add to `package.json`:

```json
"scripts": { "test": "jest" }
```

## 📌 TODO (Living Section)

- [ ] Add project structure cleanup
- [ ] Create LEARNING_LOG.md
- [ ] Add Prettier + ESLint configs
- [ ] Set up Express starter (if not yet)
- [ ] First deployed mini-project
- [ ] Add screenshots
- [ ] Add license

## 📄 License

Currently unlicensed. Consider adding one:
- MIT (permissive)
- Apache-2.0 (patent protection)
- GPL-3.0 (copyleft)

Add a LICENSE file once decided:  
https://choosealicense.com/

## 🙌 Acknowledgments

- Dr. Angela Yu’s Web Dev Bootcamp (primary curriculum)
- MDN Web Docs
- Stack Overflow threads that saved time
- Open-source community

---

If you’re following along or have suggestions, feel free to open an issue or start a discussion.

Happy building! 🚀
