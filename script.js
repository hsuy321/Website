// edit this list: file path + title (videos work too)
const slides = [
  { src: "images/34.jpg", title: "Ten accordion books documenting streetscapes along 34th Street using Google Maps busniess categories." },
  { src: "images/256.png", title: "Ten staple bound booklets categorizing photographs into metadata tags." },
];

const stage = document.getElementById("stage");
const title = document.getElementById("title");
const name = document.getElementById("name");
let i = 0;

function show() {
  const s = slides[i];
  const isVideo = /\.(mp4|webm|mov)$/i.test(s.src);
  stage.innerHTML = isVideo
    ? `<video src="${s.src}" autoplay muted loop playsinline></video>`
    : `<img src="${s.src}" alt="${s.title}">`;
  title.innerHTML = `<span>${s.title}</span>`;
}
let colorMode = true;
let last = -1;

// edit this list to change the colors
const palette = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

const root = document.documentElement.style;

function applyColors() {
  let bg = "#fff";
  if (colorMode) {
    let k;
    do { k = Math.floor(Math.random() * palette.length); } while (k === last);
    last = k;
    bg = palette[k];
  }
  root.setProperty("--bg", bg);
  root.setProperty("--hover", colorMode ? "#fff" : "#888");
}

// hover detection (color mode only, and not while the menu is open)
let mx = -1, my = -1;

function checkHover() {
  const body = document.body;
  if (!colorMode || name.classList.contains("open")) {
    body.classList.remove("hover-img", "hover-cap");
    return;
  }
  const over = el => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom;
  };
  body.classList.toggle("hover-img", over(stage.firstElementChild));
  body.classList.toggle("hover-cap", over(title.firstElementChild));
}

document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; checkHover(); });

function go(n) {
  i = (i + n + slides.length) % slides.length;
  show();
  applyColors();
  checkHover();
}

document.getElementById("prev").onclick = () => { name.classList.remove("open"); go(-1); };
document.getElementById("next").onclick = () => { name.classList.remove("open"); go(1); };
document.getElementById("toggle").onclick = () => name.classList.toggle("open");

document.getElementById("contrast").onclick = () => {
  colorMode = !colorMode;
  applyColors();
};

// click anywhere outside the menu text to close it
document.addEventListener("click", e => {
  if (!e.target.closest("#toggle, #menu")) name.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") name.classList.remove("open");
  if (name.classList.contains("open")) return;
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "ArrowRight") go(1);
});

show();
applyColors();