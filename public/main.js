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

})();
