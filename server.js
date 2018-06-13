const express = require('express')
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/admin', (req, res) => {
  if(req.query.user === 'admin' && req.query.pass === '3n7~X^$K') {
    res.status(200).sendFile(path.join(__dirname, 'admin.html'));
    return;
  }
  res.status(401).sendFile(path.join(__dirname, 'unauthorized.html'));
});
app.get('/home', (req, res) => {
  if((req.query.user === 'admin' && req.query.pass === '3n7~X^$K') || req.query.user !== 'admin') {
    res.status(200).render('home', {
      user: req.query.user || 'user'
    });
  }
  res.status(401).sendFile(path.join(__dirname, 'unauthorized.html'));
});
app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'login.html'));
});
app.post('/login', (req, res) => {
  if(!req.query.user || !req.query.pass) {
    res.status(400).send('Bad request.');
    return;
  } else if(req.query.user === 'admin' && req.query.pass === '3n7~X^$K') {
    res.status(200).send(`Great job logging in as admin, but the flag isn't here :). Maybe try accessing another endpoint with your credentials?`);
    return;
  }
  res.status(200).send(`Logged in as ${req.body.user}`);
});
app.post('/', (req, res) => {
  res.status(200).send('Good job exploring the endpoints, but this is a dead end(point). I promise.');
});

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, port => {
  console.log(`Server started, listening on port ${8000}`);
});
