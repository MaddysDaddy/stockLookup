const express = require('express');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

// serve via angular
app.use(express.static(path.resolve('dist')));

//setup body parser
app.use(parser.urlencoded({
  extended: true
}));

//json parser
app.use(parser.json());


// get routes
app.use('/api/stocks', require('./server/config/routes'));


//setup localhost
app.listen(port, () => console.log(`Listening on port: ${port}`));
