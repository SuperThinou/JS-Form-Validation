const h1 = document.querySelector("h1");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

h1.addEventListener("mousedown", (e) => {
  isDragging = true;

  offsetX = e.clientX - h1.offsetLeft;
  offsetY = e.clientY - h1.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  h1.style.left = `${e.clientX - offsetX}px`;
  h1.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
