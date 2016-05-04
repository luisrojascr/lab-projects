<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/13/15
 * Time: 10:35 AM
 */


$data = getKeysJSON();

define('CONSUMER_KEY', $data["consumer_key"]);
define('CONSUMER_SECRET', $data["consumer_secret"]);
define('ACCESS_TOKEN', $data["access_token"]);
define('ACCESS_TOKEN_SECRET', $data["access_token_secret"]);



function getKeysJSON()
{
    $str = file_get_contents('JSON/data/settings_data.json');
    $json = json_decode($str, true);
    return $json;
}