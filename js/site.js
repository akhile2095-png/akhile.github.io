/*
 * Shared site behaviour, loaded on every page.
 *  - Renders the header and footer so they live in one place
 *  - Fills contact links from SITE so they are edited once
 *  - Subtle reveal-on-scroll and header border on scroll
 *  - Photo fallback (initials) until assets/photo.jpg exists
 *
 * Plain script (not a module) so pages also work when opened from disk.
 */
(function () {
  "use strict";

  var SITE = {
    name: "Akhil Elango",
    role: "Senior Data Scientist",
    areas: ["Data", "Machine Learning", "LLMs"],
    email: "akhile2095@gmail.com",
    linkedin: "https://www.linkedin.com/in/akhil-elango-708359136/",
  };

  var NAV = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "experience", label: "Experience", href: "experience.html" },
    { id: "projects", label: "Projects", href: "projects.html" },
    { id: "contact", label: "Contact", href: "contact.html" },
  ];

  document.documentElement.classList.add("js");

  var body = document.body;
  // Pages inside /projects set data-root="../" so links resolve correctly
  var root = body.getAttribute("data-root") || "";
  var currentPage = body.getAttribute("data-page");

  function renderHeader() {
    var slot = document.querySelector("[data-site-header]");
    if (!slot) return;

    var links = NAV.map(function (item) {
      var current = item.id === currentPage ? ' aria-current="page"' : "";
      return '<a href="' + root + item.href + '"' + current + ">" + item.label + "</a>";
    }).join("");

    // The home page opens with a centred masthead: name, title, focus areas, then nav
    if (currentPage === "home") {
      slot.outerHTML =
        '<header class="site-header site-header--masthead">' +
        '<div class="container masthead">' +
        '<a class="masthead__name" href="' + root + 'index.html">' + SITE.name + "</a>" +
        '<p class="masthead__role">' + SITE.role + "</p>" +
        '<ul class="masthead__areas">' +
        SITE.areas.map(function (area) { return "<li>" + area + "</li>"; }).join("") +
        "</ul>" +
        '<nav class="site-nav" aria-label="Main">' + links + "</nav>" +
        "</div></header>";
      return;
    }

    slot.outerHTML =
      '<header class="site-header">' +
      '<div class="container site-header__inner">' +
      '<a class="site-header__brand" href="' + root + 'index.html">' + SITE.name + "</a>" +
      '<nav class="site-nav" aria-label="Main">' + links + "</nav>" +
      "</div></header>";
  }

  function renderFooter() {
    var slot = document.querySelector("[data-site-footer]");
    if (!slot) return;

    slot.outerHTML =
      '<footer class="site-footer">' +
      '<div class="container site-footer__inner">' +
      "<span>&copy; " + new Date().getFullYear() + " " + SITE.name + " &middot; Dublin, Ireland</span>" +
      '<div class="site-footer__links">' +
      '<a data-link="email">Email</a>' +
      '<a data-link="linkedin" target="_blank" rel="noopener">LinkedIn</a>' +
      "</div></div></footer>";
  }

  function fillContactLinks() {
    document.querySelectorAll('[data-link="email"]').forEach(function (el) {
      el.setAttribute("href", "mailto:" + SITE.email);
    });
    document.querySelectorAll('[data-link="linkedin"]').forEach(function (el) {
      el.setAttribute("href", SITE.linkedin);
    });
    document.querySelectorAll("[data-email-text]").forEach(function (el) {
      el.textContent = SITE.email;
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
      var label = btn.textContent;
      btn.addEventListener("click", function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(SITE.email).then(function () {
          btn.textContent = "Copied";
          setTimeout(function () {
            btn.textContent = label;
          }, 1600);
        });
      });
    });
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Give each tag its position in the row so CSS can stagger the entrance
  function indexTags() {
    document.querySelectorAll(".stack__row .tag").forEach(function (tag) {
      var siblings = tag.parentElement.children;
      tag.style.setProperty("--i", Array.prototype.indexOf.call(siblings, tag));
    });
  }

  function setupHeaderBorder() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var update = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function setupPhotoFallback() {
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      var showFallback = function () {
        img.parentElement.classList.add("has-fallback");
      };
      if (img.complete && img.naturalWidth === 0) showFallback();
      img.addEventListener("error", showFallback);
    });
  }

  renderHeader();
  renderFooter();
  fillContactLinks();
  setupCopyButtons();
  setupPhotoFallback();
  setupHeaderBorder();
  indexTags();
  setupReveal();
})();
