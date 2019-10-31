let settings;


function activeDelete(obj)
{
    obj.style.background = "url(\"actD.png\")";
}

function unactiveDelete(obj)
{
    obj.style.background = "url(\"inactD.png\")";
}

function activeAdd(obj)
{
    obj.style.background = "url(\"actA.png\")";
}

function unactiveAdd(obj)
{
    obj.style.background = "url(\"inactA.png\")";
}

function activeButton(obj)
{
    obj.style.background = "rgb(157,165,180)";
    obj.style.color = "#3a3f4b";
}
function unactiveButton(obj)
{
    obj.style.background = "#3a3f4b";
    obj.style.color = "rgb(157,165,180)";
}




function addKey(keyNumber)
{
    document.getElementById("sc").innerHTML = "<div class=\"adding\"> <h1> New key ? <br> Esc to cancel. </h1> </div>";
    document.addEventListener('keydown', f);
    function f(event)
    {
        const key = event.key;
        if (key != "Escape")
        {
            settings.keys[keyNumber].value.push(key);
        }
        document.removeEventListener('keydown', f);
        display();
    }
}





function deleteKey(key,keyNumber)
{
    let table = [];
    for (let i = 0; i < settings.keys[keyNumber].value.length; i++) {
        if (settings.keys[keyNumber].value[i]==key)
        {
        
        }
        else
        {
            table.push(settings.keys[keyNumber].value[i]);
        }
    }
    settings.keys[keyNumber].value = table;
    display();
}

function updaterangeRange(nb)
{
    settings.range[nb].value = document.getElementById("pn"+nb).value;
    display();
}
function updaterangeNumber(nb)
{
    settings.range[nb].value = document.getElementById("pr"+nb).value;
    display();
}
function updateCheckbox(nb)
{
    settings.checkbox[nb].value = document.getElementById("c"+nb).checked;
}










function display()
{
    //------------------------------------------------------------------------------------------
    let KeysStr = "<h2> Keybinding </h2>";
    KeysStr += "<table>";
    for (let i=0; i<settings.keys.length;i++)
    {
        KeysStr += "<tr> <td><h3>" + settings.keys[i].name + "</h3></td>";
        for (let j = 0; j < settings.keys[i].value.length; j++)
        {
            KeysStr += "<td class=\"keycell\"> <div class=\"keyAera\"> <div class=\"keyName\" >" + settings.keys[i].value[j] + "</div> <div class=\"keyDelete\" onclick=\"deleteKey(settings.keys["+i+"].value["+j+"],"+i+")\" onmouseenter=\"activeDelete(this)\" onmouseleave=\"unactiveDelete(this)\"> </div> </div> </td>";
        }
        KeysStr += "<td> <div class=\"newkey\" onclick=\"addKey("+i+")\" onmouseenter=\"activeAdd(this)\" onmouseleave=\"unactiveAdd(this)\"> </div> </td> </tr>";// add +
    }
    KeysStr += "</table>";
    //------------------------------------------------------------------------------------------
    let checkboxStr = "<h2> Other settings </h2>";
    checkboxStr += "<table>";
    for (let i=0; i<settings.checkbox.length;i++)
    {
        checkboxStr += "<tr>";
        checkboxStr += "<td><h3>" + settings.checkbox[i].name + "</h3></td>";
        checkboxStr += "<td> <input id=\"c"+i+"\" type=\"checkbox\" onchange=\"updateCheckbox("+i+")\" ";
        if (settings.checkbox[i].value) {
            checkboxStr +="checked";
        }
        checkboxStr += "></td>";
        checkboxStr += "</tr>";
    }
    checkboxStr += "</table>";
    //------------------------------------------------------------------------------------------
    let PowStr = "<h2> Advanced settings </h2>";
    PowStr += "<table>";
    for (let i=0; i<settings.range.length;i++)
    {
        let P = settings.range[i];
        PowStr += "<tr>";
        PowStr += "<td><h3>" + P.name + "</h3></td>";
        PowStr += "<td><input class=\"pr"+i+"\" type=\"range\" onchange=\"updaterangeNumber("+i+")\" min=\"" + P.min + "\" max=\"" + P.max + "\" step=\"" + P.step +"\" value=\"" + P.value + "\"></td>";
        PowStr += "<td><input class=\"pn"+i+"\" type=\"number\" onchange=\"updaterangeRange("+i+")\" min=\"" + P.min + "\" max=\"" + P.max + "\" step=\"" + P.step +"\" value=\"" + P.value + "\"></td>";
        PowStr += "</tr>";
    }
    PowStr += "</table>";
    //------------------------------------------------------------------------------------------
    document.getElementById("sc").innerHTML = KeysStr + checkboxStr + PowStr;
}


function init_settings()
{
    if(localStorage.getItem("settings") === null)
    {
        settings = default_data;
    }
    else
    {
        settings = JSON.parse(localStorage.getItem("settings"));
    }
}


function save()
{
    localStorage.setItem("settings",JSON.stringify(settings));
}


function loadDefault()
{
    settings = default_data;
    save();
    display();
}


function init()
{
    init_settings();
    display();
}



