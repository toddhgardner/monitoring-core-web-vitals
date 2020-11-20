const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const publicPath = path.resolve(__dirname, "../public");
const partialPath = path.resolve(__dirname, "partials");
const port = 3000;
const serverTime = 300;

var jsonParser = bodyParser.json({
  type: "*/*"
});

server.use((req, res, next) => {
  setTimeout(next, serverTime);
})

server.get("/nav", (req, res, next) => {
  res.sendFile(path.resolve(partialPath, "nav.partial.html"));
});

server.get("/content", (req, res, next) => {
  res.sendFile(path.resolve(partialPath, "content.partial.html"));
});

server.post("/vitals", jsonParser, (req, res, next) => {
  if (typeof req.body.fcp === "number") {
    var fcp = Number.parseFloat(req.body.fcp).toFixed(3);
    console.log(`First Contentful Paint: ${fcp}ms (${fcp < 1000 ? "GOOD" : fcp < 2000 ? "OKAY" : "POOR"})`);
  }
  if (typeof req.body.lcp === "number") {
    var lcp = Number.parseFloat(req.body.lcp).toFixed(3);
    console.log(`Largest Contentful Paint: ${lcp}ms (${lcp < 2500 ? "GOOD" : lcp < 4000 ? "OKAY" : "POOR"})`);
  }
  if (typeof req.body.cls === "number") {
    var cls = Number.parseFloat(req.body.cls).toFixed(3);
    console.log(`Cumulative Layout Shift: ${cls} (${cls < .1 ? "GOOD" : cls < .25 ? "OKAY" : "POOR"})`);
  }
  if (typeof req.body.fid === "number") {
    var fid = Number.parseFloat(req.body.fid).toFixed(3);
    console.log(`First Input Delay: ${fid}ms (${fid < 100 ? "GOOD" : fid < 300 ? "OKAY" : "POOR"})`);
  }
  res.sendStatus(200);
})

server.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/`);
});

