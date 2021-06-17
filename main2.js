const URL = "https://swapi.dev/api/films/";

const tableBody = document.getElementById("tbody");
const tableHead = document.getElementById("thead");

function createButton(label, href) {
    const button = document.createElement("button");
    button.innerText = label;
    button.addEventListener("click", () => populateTable(href));

    return button;
}

function createRow(film, colType) {
    const row = document.createElement("tr");
    const keys = Object.keys(film);

    if (colType === "th") {
        keys.forEach(function(value) {
            const col = document.createElement(colType);
            col.innerText = value;

            row.appendChild(col);
        });
    } else {
        keys.forEach(function(key) {
            const value = film[key];
            const col = document.createElement(colType);
            

            if (Array.isArray(value)) {
                const names = getAllInfo(value).then(function(names){
                    value.forEach(async (href, i) => col.appendChild(createButton(await names[i], href)));
                });
            } else {
                col.innerText = value;
            }

            row.appendChild(col);
        });
    }

    return row;
}

async function getInfoFromUrl(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data.name || data.title;
}

async function getAllInfo(urlArray) {
    return urlArray.map(url => getInfoFromUrl(url));
}

async function populateTable(url) {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    

    let arr = data.results;
    if (!arr) arr = [data];



    let headRow = null;

    arr.forEach(function(film) {
        const labels = Object.keys(film);

        if (!headRow)
            headRow = createRow(film, "th");

        const bodyRow = createRow(film, "td");

        tableBody.appendChild(bodyRow);
    });

    if (headRow) {
        tableHead.appendChild(headRow);
    }
}

async function main() {

    populateTable(URL);
}

main();