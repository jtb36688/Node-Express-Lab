const express = require('express'); // importing a CommonJS module

const dbRouter = require('./data/dbRouter.js');

const server = express();

server.use(express.json());

server.use('/api/posts', dbRouter);

server.get('/', async (req, res) => {
    res.send(`
      <h2>Jake's Node Express Lab</h>
      <p>Welcome to JB Tues Project</p>
    `);
  });

module.exports = server;