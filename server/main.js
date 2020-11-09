const path = require("path");
const express = require("express");

const server = express();
const publicPath = path.resolve(__dirname, "../public");
const port = 3000;

server.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/`);
});

