(function main() {

  (function asyncNavLoader() {
    var container = document.querySelector(".js-nav");
    if (!container) { return; }

    fetch("/nav").then((resp) => {
      resp.text().then((body) => {
        container.innerHTML = body;
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

})();
