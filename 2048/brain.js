
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "ArrowUp")
    {
        let score = document.getElementById("score");
        score.innerText = parseInt(score.innerText) + 1;
    }
});

function parseHTML(htmlText)
{
    return []
}

function parseTable(table)
{
    // TODO : https://www.w3schools.com/js/js_arrays.asp
    return ""
}
