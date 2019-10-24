
document.addEventListener('keydown', function(event)
{
    const key = event.key;
    let tab = parseHTML_object(document.getElementById("main"));
    let prectab = tab;
    switch (key)
    {
        case "Enter":
            let score = document.getElementById("score");
            score.innerText = parseInt(score.innerText) + 1;
            break;
        case "ArrowUp":
            tab = rotatel(tab);
            tab = compil(tab);
            tab = rotater(tab);
            break;
        case "ArrowDown":
            tab = rotater(tab);
            tab = compil(tab);
            tab = rotatel(tab);
            break;
        case "ArrowRight":
            tab = rotater(rotater(tab));
            tab = compil(tab);
            tab = rotatel(rotatel(tab));
            break;
        case "ArrowLeft":
            tab = compil(tab);
            break;
        default:
            console.log(key)
    }
    if(!is_same(tab,prectab))
    {
        tab = add_tile(tab);
    }
    document.getElementById("main").innerHTML = parseTable(tab);
});

function parseHTML_object(HtmlObject)
{
    let values_table = [];
    
    
    for(let i=0; i < HtmlObject.rows.length; i++)
    {
        values_table.push([]);
        for (let j = 0; j < HtmlObject.rows[i].cells.length; j++)
        {
            values_table[i].push(parseInt(HtmlObject.rows[i].cells[j].innerText));
        }
    }
    return values_table;
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

function rotater(table)
{
    let out = [];
    for(let j = 0; j < table[0].length; j++)
    {
        out.push([]);
        for (let i = table.length - 1; i >= 0; i--)
        {
            out[out.length-1].push(table[i][j])
        }
    }
    return out;
}

function rotatel(table)
{
    return rotater(rotater(rotater(table)));
}

function is_same(ar1, ar2)
{
    if(ar1.length != ar2.length)
    {
        return false;
    }
    for(let i = 0; i < ar1.length; i++)
    {
        if(Array.isArray(ar1[i]) && Array.isArray(ar2[i]))
        {
            if(!is_same(ar1[i],ar2[i]))
            {
                return false;
            }
        }
        else
        {
            if(Array.isArray(ar1[i]) || Array.isArray(ar2[i]))
            {
                return false;
            }
            if(ar1[i] != ar2[i])
            {
                return false;
            }
        }
    }
    return true;
}

function add_tile(tab)
{
    let zeros = [];
    for(let i=0; i < tab.length; i++)
    {
        for(let j=0; j < tab[i].length; j++)
        {
            if(tab[i][j] === 0)
            {
                zeros.push([i,j])
            }
        }
    }
    let ind = zeros[parseInt((Math.random()*zeros.length).toString())];
    tab[ind[0]][ind[1]] = 2 * (parseInt((Math.random() * 2).toString()) + 1); // 2 or 4 - 50%
    return tab
}
