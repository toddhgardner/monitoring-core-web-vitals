const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const publicPath = path.resolve(__dirname, "../public");
const navPath = path.resolve(__dirname, "nav");
const partialPath = path.resolve(__dirname, "partials");
const port = 3000;
const serverTime = 500;

var jsonParser = bodyParser.json({
  type: "*/*"
});

server.use((req, res, next) => {
  setTimeout(next, Math.random() * serverTime);
})

server.set('etag', false);
server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

server.get("/nav/:item", (req, res, next) => {
  res.sendFile(path.resolve(navPath, req.params.item + ".p.html"));
});

server.get("/content", (req, res, next) => {
  res.sendFile(path.resolve(partialPath, "content.partial.html"));
});

server.post("/vitals", jsonParser, (req, res, next) => {
  var fcp = Number.parseFloat(req.body.fcp).toFixed(3);
  var lcp = Number.parseFloat(req.body.lcp).toFixed(3);
  var cls = Number.parseFloat(req.body.cls).toFixed(3);
  var fid = Number.parseFloat(req.body.fid).toFixed(3);

  console.log(`Performance data for ${req.body.url} - FCP:${fcp} LCP:${lcp} CLS:${cls} FID:${fid}`);
  res.sendStatus(200);
});

server.use(express.static(publicPath, { etag: false }));

server.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/`);
});

