(function monitoring() {

  var webVitals = {
    fcp: 0,
    lcp: 0,
    cls: 0,
    fid: 0
  };

  new PerformanceObserver((entryList) => {
    var entries = entryList.getEntries() || [];
    entries.forEach(entry => {
      if (entry.name === "first-contentful-paint") {
        webVitals.fcp = entry.startTime;
      }
    });
  }).observe({ type: "paint", buffered: true });

  new PerformanceObserver((entryList) => {
    var entries = entryList.getEntries() || [];
    entries.forEach(entry => {
      if (entry.startTime >= webVitals.lcp) {
        webVitals.lcp = entry.startTime;
      }
    });
  }).observe({ type: "largest-contentful-paint", buffered: true });

  new PerformanceObserver((entryList) => {
    var entries = entryList.getEntries() || [];
    entries.forEach(entry => {
      console.log(entry);
      if (!entry.hadRecentInput) {
        webVitals.cls += entry.value;
      }
    });
  }).observe({ type: "layout-shift", buffered: true });

  new PerformanceObserver((entryList) => {
    var entries = entryList.getEntries() || [];
    entries.forEach(entry => {
      webVitals.fid = entry.processingStart - entry.startTime;
    });
  }).observe({ type: "first-input", buffered: true });

  document.addEventListener("visibilitychange", (evt) => {
    if (document.visibilityState === "hidden") {
      navigator.sendBeacon("/vitals", JSON.stringify(webVitals));
    }
  });

})();
