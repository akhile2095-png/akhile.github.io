/*
 * Deep-dive pages: highlight the current section in the "On this page" list.
 */
(function () {
  "use strict";

  var links = document.querySelectorAll(".case__toc a");
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  links.forEach(function (link) {
    byId[link.getAttribute("href").slice(1)] = link;
  });

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link === byId[id]);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    // Treat a section as current when it crosses the upper third of the viewport
    { rootMargin: "-20% 0px -65% 0px" }
  );

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();

/*
 * Click-to-enlarge for figures marked .diagram--zoom: opens the image
 * full size in a light overlay. Click or Esc closes it.
 */
(function () {
  "use strict";

  var images = document.querySelectorAll(".diagram--zoom img");
  if (!images.length || typeof HTMLDialogElement === "undefined") return;

  images.forEach(function (img) {
    img.title = "Click to enlarge";
    img.addEventListener("click", function () {
      var dialog = document.createElement("dialog");
      dialog.className = "lightbox";

      var large = document.createElement("img");
      large.src = img.currentSrc || img.src;
      large.alt = img.alt;
      dialog.appendChild(large);

      dialog.addEventListener("click", function () {
        dialog.close();
      });
      dialog.addEventListener("close", function () {
        dialog.remove();
      });

      document.body.appendChild(dialog);
      dialog.showModal();
    });
  });
})();
