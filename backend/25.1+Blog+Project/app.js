import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejsLayouts from 'express-ejs-layouts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory posts store
let posts = [];

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layout');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper to truncate content for preview
function preview(text, length = 180) {
  if (!text) return '';
  return text.length > length ? text.slice(0, length).trimEnd() + '…' : text;
}

function buildUniqueSlug(base) {
  let slug = base;
  let i = 2;
  while (posts.some(p => p.slug === slug)) {
    slug = `${base}-${i++}`;
  }
  return slug;
}

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home', posts, preview });
});

app.get('/compose', (req, res) => {
  res.render('compose', { title: 'Compose' });
});

app.post('/compose', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = buildUniqueSlug(base || 'post');
    posts.unshift({ id: Date.now(), title, content, slug, createdAt: new Date(), updatedAt: null });
    return res.redirect(`/posts/${slug}`);
  }
  res.redirect('/compose');
});

app.get('/posts/:slug', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).render('404', { title: 'Not Found' });
  }
  res.render('post', { title: post.title, post });
});

// Edit form
app.get('/posts/:slug/edit', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).render('404', { title: 'Not Found' });
  res.render('edit', { title: 'Edit', post });
});

// Update handler
app.post('/posts/:slug/edit', (req, res) => {
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).render('404', { title: 'Not Found' });
  const { title, content } = req.body;
  if (title && content) {
    if (title !== post.title) {
      const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      post.slug = buildUniqueSlug(base || 'post');
    }
    post.title = title;
    post.content = content;
    post.updatedAt = new Date();
    return res.redirect(`/posts/${post.slug}`);
  }
  res.redirect(`/posts/${req.params.slug}/edit`);
});

app.post('/posts/:slug/delete', (req, res) => {
  posts = posts.filter(p => p.slug !== req.params.slug);
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Blog server running on http://localhost:${PORT}`);
});
