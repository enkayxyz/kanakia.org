(function () {
  const links = document.querySelectorAll("nav a[data-nav]");
  const sections = ["home", "about"].map(id => document.getElementById(id)).filter(Boolean);

  function setCurrent(id) {
    links.forEach(a => {
      const on = a.getAttribute("data-nav") === id;
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function fromHash() {
    const id = (location.hash || "#home").slice(1);
    setCurrent(id === "people" ? "about" : id);
  }

  window.addEventListener("hashchange", fromHash);
  fromHash();

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setCurrent(e.target.id === "home" ? "home" : "about");
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 });
    sections.forEach(s => io.observe(s));
    const people = document.getElementById("people");
    if (people) io.observe(people);
  }
})();
