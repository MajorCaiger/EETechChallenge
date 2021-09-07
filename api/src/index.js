const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3030;
const dbAdapter = require('./lib/mysql');
const itemHandlers = require('./handler/itemHandler');

app.use(bodyParser.json());
app.use(cors());

app.post('/item', itemHandlers.postHandler(dbAdapter));
app.get('/item', itemHandlers.getHandler(dbAdapter));
app.put('/item/:id([0-9]+)', itemHandlers.putHandler(dbAdapter));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
