function addLink() {
  let input = document.getElementById("linkInput");
  let url = input.value.trim();

  if (!url) {
    alert("Enter a link");
    return;
  }

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

  let html = "";

  links.forEach((link, i) => {
    html += `
      <p>
        <a href="${link}" target="_blank">${link}</a>
        <button onclick="deleteLink(${i})">❌ Delete</button>
      </p>
    `;
  });

  document.getElementById("links").innerHTML = html;
}

showLinks();
