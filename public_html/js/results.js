results = [];
const urlParams = new URLSearchParams(window.location.search);
table = document.getElementById("table_");
let score = 0;


document.addEventListener("DOMContentLoaded", (event) => {
  urlParams.forEach((value, key) => {
    results[key] = value;
    });
    for (let i = 0; i < results["len"]; ++i){
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${results[`question${i}_number`]}</td>
            <td>${results[`question${i}_title`]}</td>
            <td>${results[`question${i}_userAnswer`]}</td>
            <td>${results[`question${i}_trueAnswer`]}</td>
            <td>${results[`question${i}_score`]}</td>`;
        table.tBodies[0].append(tr);
        score += Number(results[`question${i}_score`]);
    }
    document.getElementById("score").innerHTML = `Ваш балл: ${score}/10`;
});

