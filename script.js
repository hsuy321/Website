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
  title.textContent = s.title;
}

function go(n) {
  i = (i + n + slides.length) % slides.length;
  show();
}

document.getElementById("prev").onclick = () => go(-1);
document.getElementById("next").onclick = () => go(1);
document.getElementById("toggle").onclick = () => name.classList.toggle("open");

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