const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const withAuth = require('./middleware');
const app = express();
app.use(cors())
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const admin = require('./routes/api/admin');
const event = require('./routes/api/event');

const mongo_uri = 'mongodb://siemmens:hackathon12345@ds261567.mlab.com:61567/pehchaan';
mongoose.connect(mongo_uri, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});



app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client", "build"))); /*React root*/


//use routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api', users);
app.use('/api/admin', admin);
app.use('/api/event', event)

app.post('/api/logout', withAuth, (req, res) => {

})

app.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);