<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/13/15
 * Time: 10:36 AM
 */

?>
    <html>
    <body>

    <form action="settings_upload.php" method="post" enctype="multipart/form-data">
        Seleccione el JSON:
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Subir JSON" name="submit">
    </form>

    </body>
    </html>
<?php
$target_dir = "JSON/data/";
if (isset($_POST["submit"])) {
    $uploadOk = 1;
    $target_file = $target_dir . basename("settings_data.json");
    $uploadOk = 1;
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded as " . $target_file;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

echo "<br> <br> Asegurese que la data este en el siguiente formato: <br>";

$sample = "<br>{<br>
  \"consumer_key\" : \"kuTZW1HilQsmC8vmp9mAeFllU\",<br>
  \"consumer_secret\" : \"vCcn4vWfAyfVrD7W8NCdzoEJp5PxQ2hsCtNS2gGGVo9lkRcJDN\",<br>
  \"access_token\" : \"495378282-KMYSVU7SbLuV2cdKG8M9ijS67Sy28aQeb20miCjm\",<br>
  \"access_token_secret\" : \"NiBvzut7zW6lX1rNUGnfOG3x6HTGahWAIbS87QQB8go3N\"<br>
}<br>
<br>";

echo $sample;
?>