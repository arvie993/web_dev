import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the New World</h1>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1><p>This is a simple Express server.</p>');
});

app.get('/contact', (req, res) => {
  res.send('<h1>Contact Us</h1><p>Email: contact@example.com</p>');
});

app.get('/help', (req, res) => {
  res.send('<h1>Help Page</h1><p>How can we assist you?</p>');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
