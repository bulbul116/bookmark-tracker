function addLink() {
  let links = JSON.parse(localStorage.getItem("links") || "[]");

  if (!link.value) return alert("Enter a link");

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

showLinks();
