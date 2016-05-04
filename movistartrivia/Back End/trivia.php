<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/15/15
 * Time: 8:24 AM
 */

$data = file_get_contents('JSON/results/results.json');
$json = json_decode($data, true);
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json, JSON_PRETTY_PRINT);