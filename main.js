const URL = "https://swapi.dev/api/films/";

const tableBody = document.getElementById("tbody");


function createRow(film) {
    const row = document.createElement("tr");

    [film.title, film.created, film.edited, film.director].forEach(function(value) {
        const col = document.createElement("td");
        col.innerText = value;

        row.appendChild(col);
    });

    return row;
}

async function main() {

    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    const filmArray = data.results;

    filmArray.forEach(function(film) {
        const row = createRow(film);
        tableBody.appendChild(row);
    });
}

main();