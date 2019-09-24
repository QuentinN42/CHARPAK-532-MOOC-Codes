
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === "ArrowUp")
    {
        let score = document.getElementById("score");
        score.innerText = parseInt(score.innerText) + 1;
    }
});

document.addEventListener('click', parseHTML);

function parseHTML(htmlText)
{
    /*
    htmlText = document.getElementById("main").innerHTML;
    let t1 = [for (x of String(htmlText).split("<tr>")) x.split("<td>")];
    console.log(t1);
    */
    return []
}

function parseTable(table)
{
    // TODO : https://www.w3schools.com/js/js_arrays.asp
    return ""
}
