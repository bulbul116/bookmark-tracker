function login() {
  localStorage.setItem("user", email.value);
  location = "dashboard.html";
}

function logout() {
  localStorage.clear();
  location = "index.html";
}

function addLink() {
  let links = JSON.parse(localStorage.getItem("links") || "[]");
  links.push(link.value);
  localStorage.setItem("links", JSON.stringify(links));
  link.value = "";
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

  document.getElementById("links").innerHTML = links
    .map((l, i) => `
      <p>
        <a href="${l}" target="_blank">${l}</a>
        <button onclick="deleteLink(${i})">❌ Delete</button>
      </p>
    `)
    .join("");
}

if (document.getElementById("links")) showLinks();
