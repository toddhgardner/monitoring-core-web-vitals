(function (ready) {
  if (document.readyState === "complete") {
    ready();
  } else {
    document.addEventListener('readystatechange', function(event) {
      if (document.readyState === "complete") {
        ready();
      }
    });
  }
})(function main() { /* the document is now ready. */

  (function asyncNavLoader() {
    var container = document.querySelector(".js-nav");
    if (!container) { return; }
    var first = false;

    fetch("/nav/see").then((resp) => {
      resp.text().then((body) => {
        if (!first) { container.innerHTML = ""; first = true; }
        var el = document.createElement("div");
        el.innerHTML = body;
        container.appendChild(el);
      });
    });
    fetch("/nav/hear").then((resp) => {
      resp.text().then((body) => {
        if (!first) { container.innerHTML = ""; first = true; }
        var el = document.createElement("div");
        el.innerHTML = body;
        container.appendChild(el);
      });
    });
    fetch("/nav/do").then((resp) => {
      resp.text().then((body) => {
        if (!first) { container.innerHTML = ""; first = true; }
        var el = document.createElement("div");
        el.innerHTML = body;
        container.appendChild(el);
      });
    });
  })();

  (function asyncContentLoader() {
    var container = document.querySelector(".js-content");
    if (!container) { return; }

    fetch("/content").then((resp) => {
      resp.text().then((body) => {
        container.innerHTML = body;
      });
    });
  })();

});
