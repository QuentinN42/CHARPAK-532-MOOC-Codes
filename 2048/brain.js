
document.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (key) {
        case "ArrowUp":
            let score = document.getElementById("score");
            score.innerText = parseInt(score.innerText) + 1;
            break;
        case "ArrowRight":
            let tab = [[0,0,0,0],[0,0,0,0],[0,1,0,0],[0,0,0,0]];
            document.getElementById("main").innerHTML = parseTable(tab);
            break;
        case "ArrowLeft":
            console.log(parseHTML(document.getElementById("main").innerHTML));
            break;
        default:
            console.log(key)
    }
});

function parseHTML(htmlText)
{
    let tab = [];
    htmlText = htmlText.replace(new RegExp("<tbody>","g")," ");
    htmlText = htmlText.replace(new RegExp("</tbody>","g")," ");
    htmlText = htmlText.replace(new RegExp("</td>","g")," ");
    htmlText = htmlText.replace(new RegExp("</tr>","g")," ");
    htmlText = htmlText.replace(new RegExp("\n","g")," ");
    htmlText = htmlText.replace(/ /g,'');

    let tmp = htmlText.split("<tr>");
    tmp.forEach(append);

    function append(str) {
        tab.push(str.split("<td>"));
    }
    tab.shift();
    let tab2 = [];
    tab.forEach(append2);

    function append2(line) {
        line.shift();
        tab2.push(line);
    }
    return tab2
}

function parseTable(table)
{
    let output = "";
    table.forEach(Build);

    function Build(line)
    {
        let tmp = "";
        line.forEach(build);
        output += "<tr>" + tmp + "</tr>";

        function build(e) {
            tmp += "<td>" + e + "</td>"
        }
    }
    return output;
}

function compil(table)
{
    let out = [];
    table.forEach(work);

    function work(line)
    {
        // remove 0
        let len = line.length;
        line = line.filter(function f(x){return x != 0});
        // compil table
        let i = 0;
        while(i < line.length)
        {
            if(line[i] == line[i+1])
            {
                line[i] = 2*line[i];
                line.splice(i+1, 1);
            }
            i++;
        }
        // add 0
        while(line.length < len)
        {
            line.push(0)
        }
        out.push(line);
    }
    return out;
}
