<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>2048 Game</title>
    <link rel="stylesheet" href="style.css">
    <script>
        let settings;
        if(localStorage.getItem("settings") === null)
        {
            // noinspection JSAnnotator
            settings = <?php echo file_get_contents("settings/settings.json"); ?>;
        }
        else
        {
            settings = JSON.parse(localStorage.getItem("settings"));
        }
    </script>
    <script type="text/javascript" src="brain.js"></script>
</head>
<body onload="reset()">

    <div class="content">
        <h1 id="lose1" style="visibility: hidden"> You lose ! </h1>
        <h1 id="lose2" style="visibility: hidden"> Your score is : <span id="lose-score"></span> </h1>
        <table id="main" class="main" style="visibility: visible">
            <tbody>
                <tr>
                    <td>0</td>
                    <td>2</td>
                    <td>0</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>4</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>4</td>
                    <td>2</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>0</td>
                    <td>4</td>
                    <td>128</td>
                    <td>16</td>
                </tr>
            </tbody>
        </table>
        <br>
        <h2 id="score-container" style="visibility: visible">
            Score = <span id="score">0</span>
        </h2>
    </div>
    <form>
        <button type="submit" formaction="settings/"> Settings </button>
    </form>
</body>
</html>
