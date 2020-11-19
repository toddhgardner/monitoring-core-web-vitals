const path = require("path");
const express = require("express");

const server = express();
const publicPath = path.resolve(__dirname, "../public");
const partialPath = path.resolve(__dirname, "partials");
const port = 3000;
const serverTime = 200;

server.use((req, res, next) => {
  setTimeout(next, serverTime);
})

server.get("/nav", (req, res, next) => {
  res.sendFile(path.resolve(partialPath, "nav.partial.html"));
});

server.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/`);
});

