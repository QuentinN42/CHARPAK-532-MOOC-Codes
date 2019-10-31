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
<body>

    <div class="content">
    <table id="main" class="main">
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
    Score = <span id="score">0</span>
    </div>
    <form>
        <button type="submit" formaction="settings/"> Settings </button>
    </form>
</body>
</html>
