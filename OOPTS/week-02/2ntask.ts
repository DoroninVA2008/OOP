const appDiv = document.querySelector("#app");

const message = document.getElementById('message');

if (appDiv instanceof HTMLDivElement) {
  appDiv.innerHTML = `<h1>${message}</h1>`;

  const button: HTMLButtonElement = document.createElement("button");
  button.textContent = "Нажми меня";
  button.addEventListener("click", () => {
    alert("Кнопка нажата!");
  });

  appDiv.appendChild(button);
} else {
  console.error("Элемент с id 'app' не найден.");
}