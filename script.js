const PASSWORD = "1234"; // 🔐 CHANGE YOUR PASSWORD HERE

// LOGIN FUNCTION
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

// ADD LINK FUNCTION
function addLink() {
    let link = document.getElementById("linkInput").value.trim();
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

// LOAD + DISPLAY LINKS (COLLAPSIBLE)
function loadLinks() {
    let container = document.getElementById("linksContainer");
    container.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("links") || "{}");

    for (let year in data) {
        let yearDiv = document.createElement("div");
        yearDiv.className = "yearCard";

        let yearTitle = document.createElement("h2");
        yearTitle.innerText = "📅 " + year;
        yearTitle.style.cursor = "pointer";

        let yearContent = document.createElement("div");
        yearContent.style.display = "none";

        yearTitle.onclick = () => {
            yearContent.style.display =
                yearContent.style.display === "none" ? "block" : "none";
        };

        yearDiv.appendChild(yearTitle);

        for (let month in data[year]) {
            let monthTitle = document.createElement("h3");
            monthTitle.innerText = "📂 " + month;
            monthTitle.style.cursor = "pointer";

            let monthContent = document.createElement("div");
            monthContent.style.display = "none";

            monthTitle.onclick = () => {
                monthContent.style.display =
                    monthContent.style.display === "none" ? "block" : "none";
            };

            for (let date in data[year][month]) {
                let dateTitle = document.createElement("h4");
                dateTitle.innerText = "📌 " + date;
                dateTitle.style.cursor = "pointer";

                let dateContent = document.createElement("div");
                dateContent.style.display = "none";

                dateTitle.onclick = () => {
                    dateContent.style.display =
                        dateContent.style.display === "none" ? "block" : "none";
                };

                data[year][month][date].forEach(link => {
                    let a = document.createElement("a");
                    a.href = link;
                    a.target = "_blank";
                    a.className = "link";
                    a.innerText = link;
                    dateContent.appendChild(a);
                });

                monthContent.appendChild(dateTitle);
                monthContent.appendChild(dateContent);
            }

            yearContent.appendChild(monthTitle);
            yearContent.appendChild(monthContent);
        }

        yearDiv.appendChild(yearContent);
        container.appendChild(yearDiv);
    }
}
