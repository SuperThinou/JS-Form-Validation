// Works only if you remove form-validator script in index.html

const body = document.querySelector("body");
const footer = document.querySelector("footer");

makeDraggable(document.querySelector("h1"));
const inputs = document.querySelectorAll(".label-input");

document.querySelectorAll(".label-input").forEach((el) => {
  makeDraggable(el);
});

makeDraggable(document.querySelector("footer"));

function makeDraggable(element) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const id = element.dataset.dragId;
  if (!id) return;

  // 🔁 Restaurer position SI elle existe
  const saved = localStorage.getItem(id);
  if (saved) {
    const { left, top } = JSON.parse(saved);

    element.style.position = "absolute";
    element.style.left = left;
    element.style.top = top;
  }

  element.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    isDragging = true;
    document.body.classList.add("dragging");

    const rect = element.getBoundingClientRect();

    element.style.position = "absolute";
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top}px`;

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    element.style.left = `${e.clientX - offsetX}px`;
    element.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    document.body.classList.remove("dragging");

    localStorage.setItem(
      id,
      JSON.stringify({
        left: element.style.left,
        top: element.style.top,
      }),
    );
  });
}

function resetLayout() {
  localStorage.clear();
  location.reload();
}

function getRandomColor() {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  const A = 1;
  const randomColor = "rgba(" + R + "," + G + "," + B + "," + A + ")";
  return randomColor;
}

function applyColor(element, color) {
  const current = getComputedStyle(element).backgroundColor;

  element.style.backgroundColor = color;
}

footer.addEventListener("click", () => {
  const color = getRandomColor();
  applyColor(footer, color);
});
