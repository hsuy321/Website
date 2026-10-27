// edit this list: file path + title (videos work too)
const slides = [
  { src: "images/34.jpg", title: "A set of accordion books documenting streetscapes along 34th Street through metadata." },
  { src: "images/256.png", title: "A set of staple bound booklets categorizing photographs into ten metadata tags." },
  { src: "videos/clip.mp4", title: "Video example" }
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

document.getElementById("prev").onclick = () => { name.classList.remove("open"); go(-1); };
document.getElementById("next").onclick = () => { name.classList.remove("open"); go(1); };
document.getElementById("toggle").onclick = () => name.classList.toggle("open");

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") go(-1);
  if (e.key === "ArrowRight") go(1);
  if (e.key === "Escape") name.classList.remove("open");
});

show();
