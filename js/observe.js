// кнопка up:
const scrollToTop = document.querySelector(".scroll-to-top");

const options = {
  threshold: 0.25,
};
const callback = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollToTop.style.display = "none";
      scrollToTop.classList.remove("animated-op");
      scrollToTop.classList.add("animated-op-rev");
    } else {
      scrollToTop.style.display = "flex";
      scrollToTop.classList.remove("animated-op-rev");
      scrollToTop.classList.add("animated-op");
    }
  });
};

const observer = new IntersectionObserver(callback, options);

const target = document.querySelector(".header");

observer.observe(target);
