// Create web server and listen for requests
// Load express module
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Load comments.json
var comments = require('./comments.json');

// Load comments.json
var users = require('./users.json');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a GET route that returns all comments
app.get('/comments', function (req, res) {
  res.json(comments);
});

// Create a GET route that returns all users
app.get('/users', function (req, res) {
  res.json(users);
});

// Create a POST route that creates a new comment
app.post('/comments', function (req, res) {
  // Get the comment from the request
  var comment = req.body;
  // Add the comment to the comments array
  comments.push(comment);
  // Save the comments array to comments.json
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function (err) {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.json(comment);
    }
  });
});

// Create a POST route that creates a new user
app.post('/users', function (req, res) {
  // Get the user from the request
  var user = req.body;
  // Add the user to the users array
  users.push(user);
  // Save the users array to users.json
  fs.writeFile('users.json', JSON.stringify(users, null, 2), function (err) {
    if (err) {
      res.status(500).send('An error occurred');
    } else {
      res.json(user);
    }
  });
});

// Create a PUT route that updates a comment
app.put('/comments/:id', function (req, res) {
  // Get the comment ID from the request
  var id = req.params.id;
  // Find the comment with the given ID
  var comment = comments.find(function (comment) {
    return comment.id === id;
  });
  // If the comment is found, update it
  if (comment) {
    comment.text = req.body.text;
    // Save the comments array to comments.json
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2),
