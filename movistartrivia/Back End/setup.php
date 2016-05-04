<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/13/15
 * Time: 9:37 AM
 */

// RUN ONCE

$data = getDataJSON();
createResults($data);
createCodes($data);
echo "Setup completo";

function createResults($data_json)
{
    $results = Array();
    foreach ($data_json['Preguntas'] as $pregunta) {
        $data_pregunta = Array();
        $data_pregunta["pregunta"] = $pregunta["texto"];
        $data_pregunta["codigo"] = $pregunta["codigo"];
        $ganador = Array ( "name" => "Aun no se encuentran ganadores", "screen_name" => "Aun no se encuentran ganadores", "codigo" => "Aun no se encuentran ganadores" );
        $data_pregunta["ganadores"] = Array();
        $data_pregunta["ganadores"]["0"] = $ganador;
        $data_pregunta["ganadores"]["1"] = $ganador;
        $data_pregunta["ganadores"]["2"] = $ganador;
        array_push($results, $data_pregunta);
    }
    postResultsJSON(json_encode($results, JSON_PRETTY_PRINT));
}

function createCodes($data_json)
{
    $results = Array();
    for ($i = 0; $i < count($data_json['Preguntas']); $i++) {
        $results[$i] = $data_json['Preguntas'][$i]["codigo"];
    }
    postCodesJSON(json_encode($results, JSON_PRETTY_PRINT));

}

function postResultsJSON($data)
{
    $fp = fopen('JSON/results/results.json', 'w');
    fwrite($fp, $data);
    fclose($fp);
}

function postCodesJSON($data)
{
    $fp = fopen('JSON/codes/codes.json', 'w');
    fwrite($fp, $data);
    fclose($fp);
}

function getDataJSON()
{
    $str = file_get_contents('JSON/data/data.json');
    $json = json_decode($str, true);
    return $json;
}
