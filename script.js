document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("linkInput");
  const addBtn = document.getElementById("addBtn");

  function addLink() {
    let url = input.value.trim();
    if (!url) return alert("Enter a link");

    let links = JSON.parse(localStorage.getItem("links") || "[]");
    links.push(url);

    localStorage.setItem("links", JSON.stringify(links));
    input.value = "";
    showLinks();
  }

  function deleteLink(index) {
    let links = JSON.parse(localStorage.getItem("links") || "[]");
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    showLinks();
  }

  function showLinks() {
    let links = JSON.parse(localStorage.getItem("links") || "[]");
    const container = document.getElementById("links");

    container.innerHTML = "";

    links.forEach((link, i) => {
      const p = document.createElement("p");

      p.innerHTML = `
        <a href="${link}" target="_blank">${link}</a>
        <button onclick="deleteLink(${i})">❌ Delete</button>
      `;

      container.appendChild(p);
    });
  }

  // Button click
  addBtn.addEventListener("click", addLink);

  // Press ENTER to add
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") addLink();
  });

  // Make deleteLink global
  window.deleteLink = deleteLink;

  showLinks();
});
