<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/13/15
 * Time: 10:24 AM
 */
?>
    <html>
    <body>

    <form action="picture_upload.php" method="post" enctype="multipart/form-data">
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
    $target_file = $target_dir . basename("pictures_data.json");
    $uploadOk = 1;
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file " . basename($_FILES["fileToUpload"]["name"]) . " has been uploaded as " . $target_file;
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

echo "<br> <br> Asegurese que la data este en el siguiente formato: <br>";

$sample = "<br>{ <br>
  \"Data\": {<br>
    \"hashtag\": \"testdannycr\"<br>
  }<br>
}<br>";

echo $sample;
?>