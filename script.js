// edit this list: project name (for grouping only) + file path + title
const slides = [
  { project: "Thesis", src: "images/34.jpg", title: "Fourteen accordion books documenting streetscapes along 34th Street using Google Maps busniess categories." },
  { project: "Thesis", src: "images/256.png", title: "Ten staple bound booklets categorizing personal photographic explorations into general metadata tags." },
  { project: "Demo Day", src: "videos/demo.mp4", title: "Motion graphic for Parsons MPS Communication Design Demo Day event, in person." },
  { project: "Demo Day", src: "videos/demo-2.mp4", title: "Motion graphic for Parsons MPS Communication Design Demo Day event, on social media." },
  { project: "Film Screening", src: "videos/machine.mp4", title: "Motion graphic for a film screening of Ghost in the Machine, a film discussing the buried histories behind artificial intelligence." },
  { project: "Film Screening", src: "images/machine.jpg", title: "Poster for a film screening of Ghost in the Machine, a film discussing the buried histories behind artificial intelligence." },
  { project: "Film Screening", src: "images/machine-2.jpg", title: "Poster for a film screening of Ghost in the Machine, a film discussing the buried histories behind artificial intelligence." },
  { project: "Book Discussion", src: "videos/ghosting.mp4", title: "Motion graphic for a book discussion on Ghosting: On Disappearance, a book analyzing the modern phenomenon of ghosting." },
  { project: "Book Discussion", src: "images/ghosting.jpg", title: "Poster for a book discussion on Ghosting: On Disappearance, a book analyzing the modern phenomenon of ghosting." },
];

// background and text color for each project (names must match the list above)
const themes = {
  "Thesis": { bg: "#ffffff", fg: "#000000" },
  "Demo Day": { bg: "#d9d9d9", fg: "#000000" },
  "Film Screening": { bg: "#FFFF00", fg: "#000000" },
  "Book Discussion": { bg: "#000000", fg: "#ffffff" }
};

const stage = document.getElementById("stage");
const title = document.getElementById("title");
const name = document.getElementById("name");
const label = document.getElementById("label");
const project = document.getElementById("project");
let i = 0;

function show() {
  const s = slides[i];
  const isVideo = /\.(mp4|webm|mov)$/i.test(s.src);
  stage.innerHTML = isVideo
    ? `<video src="${s.src}" autoplay muted loop playsinline></video>`
    : `<img src="${s.src}" alt="${s.title}">`;
  title.textContent = s.title;
  project.textContent = s.project;

  // apply this project's colors
  const t = themes[s.project] || { bg: "#ffffff", fg: "#000000" };
  document.documentElement.style.setProperty("--bg", t.bg);
  document.documentElement.style.setProperty("--fg", t.fg);
}

// one image forward or back (crosses into the next project at the edges)
function go(n) {
  i = (i + n + slides.length) % slides.length;
  show();
}

// index of the first slide of each project
const starts = slides
  .map((s, k) => (k === 0 || s.project !== slides[k - 1].project ? k : -1))
  .filter(k => k >= 0);

// jump to the first slide of the next or previous project
function goProject(dir) {
  let p = starts.filter(k => k <= i).length - 1;   // current project
  p = (p + dir + starts.length) % starts.length;
  i = starts[p];
  show();
}

document.getElementById("prevProject").onclick = () => goProject(-1);
document.getElementById("prevImage").onclick = () => go(-1);
document.getElementById("nextImage").onclick = () => go(1);
document.getElementById("nextProject").onclick = () => goProject(1);
document.getElementById("toggle").onclick = () => name.classList.toggle("open");

// cursor label
let col = -1;

function updateLabel() {
  if (col < 0) return;
  label.textContent = ["Prev Project", "Prev Image", "Next Image", "Next Project"][col];
}

document.addEventListener("mousemove", e => {
  if (e.target.closest("#toggle")) {
    col = -1;
    label.classList.remove("on");
    return;
  }
  col = Math.min(3, Math.floor(e.clientX / (window.innerWidth / 4)));
  updateLabel();
  label.style.left = e.clientX + "px";
  label.style.top = e.clientY + "px";
  label.classList.add("on");
});

document.addEventListener("mouseleave", () => {
  col = -1;
  label.classList.remove("on");
});

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

// preload every image so navigating feels instant
slides.forEach(s => {
  if (!/\.(mp4|webm|mov)$/i.test(s.src)) {
    const img = new Image();
    img.src = s.src;
  }
});