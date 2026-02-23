const PASSWORD = "1234"; // CHANGE THIS

function login() {
    let input = document.getElementById("password").value;
    if (input === PASSWORD) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").classList.remove("hidden");
        loadLinks();
    } else {
        alert("Wrong password!");
    }
}

function addLink() {
    let link = document.getElementById("linkInput").value;
    if (!link) return;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.toLocaleString('default', { month: 'long' });
    let date = today.getDate();

    let data = JSON.parse(localStorage.getItem("links") || "{}");

    if (!data[year]) data[year] = {};
    if (!data[year][month]) data[year][month] = {};
    if (!data[year][month][date]) data[year][month][date] = [];

    data[year][month][date].push(link);

    localStorage.setItem("links", JSON.stringify(data));

    document.getElementById("linkInput").value = "";
    loadLinks();
}

function loadLinks() {
    let container = document.getElementById("linksContainer");
    container.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("links") || "{}");

    for (let year in data) {
        let yearDiv = document.createElement("div");
        yearDiv.className = "yearCard";
        yearDiv.innerHTML = `<h2>${year}</h2>`;

        for (let month in data[year]) {
            let monthDiv = document.createElement("div");
            monthDiv.innerHTML = `<h3>${month}</h3>`;

            for (let date in data[year][month]) {
                let dateDiv = document.createElement("div");
                dateDiv.innerHTML = `<h4>${date}</h4>`;

                data[year][month][date].forEach(link => {
                    let a = document.createElement("a");
                    a.href = link;
                    a.target = "_blank";
                    a.className = "link";
                    a.innerText = link;
                    dateDiv.appendChild(a);
                });

                monthDiv.appendChild(dateDiv);
            }

            yearDiv.appendChild(monthDiv);
        }

        container.appendChild(yearDiv);
    }
}
