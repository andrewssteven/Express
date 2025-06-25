const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to check working hours (Mon–Fri, 9AM–5PM)
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, this site is only available Monday to Friday, from 9AM to 5PM.</h1>');
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/home.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'public/services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));