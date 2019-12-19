let score = 0;
let n = Number(settings.range[0].value);
let loosing = false;

document.addEventListener('keydown', function(event)
{
    const key = event.key;
    let tab = parseHTML_object(document.getElementById("main"));
    let prectab = tab;
    if(!loosing) {score = parseInt(document.getElementById("score").innerText);}
    switch (true)
    {
        case settings.keys[0].value.includes(key):
            reset();
            return;
        // NORMAL KEYS
        case settings.keys[1].value.includes(key):
            tab = rotatel(tab);
            tab = compil(tab);
            tab = rotater(tab);
            break;
        case settings.keys[2].value.includes(key):
            tab = rotater(tab);
            tab = compil(tab);
            tab = rotatel(tab);
            break;
        case settings.keys[3].value.includes(key):
            tab = compil(tab);
            break;
        case settings.keys[4].value.includes(key):
            tab = rotater(rotater(tab));
            tab = compil(tab);
            tab = rotatel(rotatel(tab));
            break;
        // CONTINUE KEYS
        case settings.keys[5].value.includes(key):
            tab = rotatel(tab);
            tab = compil(tab);
            tab = rotater(tab);
            while(!is_same(tab,prectab))
            {
                tab = add_tile(tab);
                prectab = tab;
                tab = rotatel(tab);
                tab = compil(tab);
                tab = rotater(tab);
            }
            break;
        case settings.keys[6].value.includes(key):
            tab = rotater(tab);
            tab = compil(tab);
            tab = rotatel(tab);
            while(!is_same(tab,prectab))
            {
                tab = add_tile(tab);
                prectab = tab;
                tab = rotater(tab);
                tab = compil(tab);
                tab = rotatel(tab);
            }
            break;
        case settings.keys[7].value.includes(key):
            tab = compil(tab);
            while(!is_same(tab,prectab))
            {
                tab = add_tile(tab);
                prectab = tab;
                tab = compil(tab);
            }
            break;
        case settings.keys[8].value.includes(key):
            tab = rotater(rotater(tab));
            tab = compil(tab);
            tab = rotatel(rotatel(tab));
            while(!is_same(tab,prectab))
            {
                tab = add_tile(tab);
                prectab = tab;
                tab = rotater(rotater(tab));
                tab = compil(tab);
                tab = rotatel(rotatel(tab));
            }
            break;
        default:
            console.log(key)
    }
    if(!is_same(tab,prectab))
    {
        tab = add_tile(tab);
    }
    if(have_lose(tab))
    {
        lose();
    }
    writeHTML_object(document.getElementById("main"), tab);
    document.getElementById("score").innerText = score;
});

function color(value)
{
    let c = Math.log2(value)/11;
    let startR = Number(settings.range[1].value);
    let endR = Number(settings.range[2].value);
    let startG = Number(settings.range[3].value);
    let endG = Number(settings.range[4].value);
    let startB = Number(settings.range[5].value);
    let endB = Number(settings.range[6].value);
    if (value <= 2048)
    {
        return rgbToHex(startR+c*(endR-startR), startG+c*(endG-startG), startB+c*(endB-startB)).split(".")[0];
    } else
    {
        return rgbToHex(endR, endG, endB).split(".")[0];
    }
}

function parseHTML_object(HtmlObject)
{
    let values_table = [];
    for(let i=0; i < n; i++)
    {
        values_table.push([]);
        for (let j = 0; j < n; j++)
        {
            if(HtmlObject.rows[i].cells[j].innerText == "")
            {
                values_table[i].push(0);
            }
            else
            {
                values_table[i].push(parseInt(HtmlObject.rows[i].cells[j].innerText));
            }
        }
    }
    return values_table;
}

function writeHTML_object(HtmlObject, table)
{
    for(let i=0; i < n; i++)
    {
        for (let j = 0; j < n; j++)
        {
            if(table[i][j] == 0)
            {
                if(settings.checkbox[0].value)
                {
                    HtmlObject.rows[i].cells[j].innerText = table[i][j];
                }
                else
                {
                    HtmlObject.rows[i].cells[j].innerText = " ";
                }
                HtmlObject.rows[i].cells[j].style.backgroundColor = "#282C34";
            }
            else
            {
                HtmlObject.rows[i].cells[j].innerText = table[i][j];
                if(settings.checkbox[1].value)
                {
                    HtmlObject.rows[i].cells[j].style.backgroundColor = color(table[i][j]);
                }
                else
                {
                    HtmlObject.rows[i].cells[j].style.backgroundColor = "#282C34";
                }
            }
        }
    }
}

function compil(table, edit_score = true)
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
                if(edit_score) {score += line[i];}
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

function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function restart()
{
    document.getElementById("score-container").style.visibility = "visible";
    document.getElementById("lose1").style.visibility = "hidden";
    document.getElementById("lose2").style.visibility = "hidden";
    loosing = false;
    let zeros = [];
    for (let i = 0 ; i < n; ++i)
    {
        let tmp = [];
        for (let j = 0 ; j < n; ++j)
        {
            tmp.push(0);
        }
        zeros.push(tmp);
    }
    return zeros;
}

function lose()
{
    document.getElementById("score-container").style.visibility = "hidden";
    document.getElementById("lose1").style.visibility = "visible";
    document.getElementById("lose2").style.visibility = "visible";
    document.getElementById("lose-score").innerHTML = String(score);
    loosing = true;
}

function have_lose(table)
{
    let tmp;
    tmp = compil(table, false);
    if(!is_same(table, tmp))
    {
        return false;
    }
    else
    {
        tmp = rotater(rotater(rotater(table)));
        tmp = compil(tmp, false);
        tmp = rotater(tmp);
        if(!is_same(table, tmp))
        {
            return false;
        }
        else
        {
            tmp = rotater(table);
            tmp = compil(tmp, false);
            tmp = rotater(rotater(rotater(tmp)));
            if(!is_same(table, tmp))
            {
                return false;
            }
            else
            {
                tmp = rotater(rotater(table));
                tmp = compil(tmp, false);
                tmp = rotater(rotater(tmp));
                return is_same(table, tmp);
            }
        }
    }
}

function setup()
{
    let tab = restart();
    tab = add_tile(tab);
    let innerHTML = "";
    for(let i=0; i < n; i++)
    {
        innerHTML += "<tr>";
        for (let j = 0; j < n; j++)
        {
            innerHTML += "<td style=\"background-color:";
            if(tab[i][j] == 0)
            {
                innerHTML += "#282C34;\">";
                if(settings.checkbox[0].value)
                {
                    innerHTML += "0";
                }
                else
                {
                    innerHTML += " ";
                }
            }
            else
            {
                if(settings.checkbox[1].value)
                {
                    innerHTML += color(tab[i][j]) + ";\">";
                }
                else
                {
                    innerHTML += "#282C34;\">";
                }
                innerHTML += tab[i][j].toString();
            }
            innerHTML += "</td>";
        }
        innerHTML += "</tr>";
    }
    document.getElementById("main").innerHTML = innerHTML;
}

function reset()
{
    setup();
    score = 0;
    localStorage.setItem("score",score);
    document.getElementById("score").innerText = score;
}
