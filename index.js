const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5500;

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (res, req) => {
  req.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
