<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Settings</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script>
            // noinspection JSAnnotator
            const default_data = <?php echo file_get_contents("settings.json"); ?>;
        </script>
        <script src="settings.js"></script>
    </head>
    <body onload="init()">
        <h1>Settings :</h1>


        <div class="buttonbar">
            <button onclick="save()"> Save </button>
            <button onclick="setAsDefault()"> Set as default settings </button>
            <button onclick="loadDefault()"> Load default settings </button>
            <button onclick="initsettings()"> Cancel </button>
        </div>



        <div id="sc">

        </div>

        <div class="buttonbar">
            <button onclick="save()"> Save </button>
            <button onclick="setAsDefault()"> Set as default settings </button>
            <button onclick="loadDefault()"> Load default settings </button>
            <button onclick="initsettings()"> Cancel </button>
        </div>

        <h1 style="color:rgb(40,44,52);"> _ </h1>
    </body>
</html>
