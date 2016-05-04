<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/9/15
 * Time: 11:10 AM
 */

// RUN EVERY 30 SECONDS Cron job -*/6-20 * * * sleep 30;index.php

require_once 'lib/twitteroauth.php';
require_once 'lib/settings.php';
runScript();
sleep(15);
runScript();
sleep(15);
runScript();
sleep(15);
runScript();

function runScript()
{
    $data = getDataJSON();
    startWatcher($data);
}

function getDataJSON()
{
    $str = file_get_contents('JSON/data/data.json');
    $json = json_decode($str, true);
    return $json;
}

function getResultsJSON()
{
    $str = file_get_contents('JSON/results/results.json');
    $json = json_decode($str, true);
    return $json;
}

function postResultsJSON($data)
{
    $fp = fopen('JSON/results/results.json', 'w');
    fwrite($fp, $data);
    fclose($fp);
}

function getCodesJSON()
{
    $str = file_get_contents('JSON/codes/codes.json');
    $json = json_decode($str, true);
    return $json;
}

function postCodesJSON($data)
{
    $fp = fopen('JSON/codes/codes.json', 'w');
    fwrite($fp, $data);
    fclose($fp);
}

function getAllWinners($data_json, $data_results)
{
    $result = Array();
    foreach ($data_json['Preguntas'] as $pregunta) {
        $winners_pregunta = getWinners(getAnswers($pregunta, $data_results), 3);
        array_push($result, $winners_pregunta);
    }
    return json_encode($result, JSON_PRETTY_PRINT);
}

function getAnswers($pregunta, $result)
{
    $main = [];
    $main['pregunta'] = $pregunta['texto'];
    $corrects = [];
    foreach ($result as $key => $value) {
        foreach ($result[$key] as $mkey => $mvalue) {
            if ($mkey == "text") {
                if (strrpos($mvalue, $pregunta['codigo'])) {
                    if (strrpos(".  " . $mvalue . "  .", " " . $pregunta['respuesta'] . " ")) {
                        foreach ($result[$key] as $kkey => $kvalue) {
                            if ($kkey == "name") {
                                $item["name"] = $value["name"];
                                $item["screen_name"] = $value["screen_name"];
                                $item["codigo"] = $pregunta['codigo'];
                                if (!in_array($item, $corrects)) {
                                    array_push($corrects, $item);
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    $main['respuestas'] = $corrects;
    return ($main);
}

function getWinners($corrects, $winnerqty)
{
    $winners['pregunta'] = $corrects['pregunta'];
    $corrects = $corrects['respuestas'];
    $mwinners = [];
    if (count($corrects) >= $winnerqty) {
        $cant = $winnerqty;
    } else {
        $cant = count($corrects);
    }
    for ($i = 0; $i < $cant; $i++) {
        $index = rand(0, count($corrects) - 1);
        if (!in_array($corrects[$index], $mwinners)) {
            $mwinners[$i + 1] = $corrects[$index];
        } else {
            $i--;
        }
    }
    $winners['ganadores'] = $mwinners;

    return ($winners);
}

function search(array $query)
{
    $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
    return $toa->get('search/tweets', $query);
}

function getResults($hashtag)
{
    $max_id = "";
    $isLast = false;
    $statuses = Array();
    while ($isLast == false) {
        $query = array(
            "q" => "#" . $hashtag,
            "count" => 100,
            "result_type" => "recent",
            "max_id" => $max_id,
        );
        $last_id = $max_id;
        $results = search($query);
        foreach ($results->statuses as $result) {
            $status_data = Array();
            $status_data['text'] = $result->text;
            $status_data['name'] = $result->user->name;
            $status_data['screen_name'] = $result->user->screen_name;
            array_push($statuses, $status_data);
            $max_id = $result->id_str;
        }
        if ($last_id == $max_id) {
            $isLast = true;
        }
    }
    if (count($statuses) > 1) {
        array_pop($statuses);
    }
    return $statuses;
}

function getTweetsImages($hashtag)
{
    $max_id = "";
    $isLast = false;
    $statuses = Array();
    while ($isLast == false) {
        $query = array(
            "q" => "#" . $hashtag,
            "count" => 100,
            "result_type" => "recent",
            "max_id" => $max_id,
        );
        $last_id = $max_id;
        $results = search($query);
        foreach ($results->statuses as $result) {
            if (isset($result->entities->media)) {
                $status_data = Array();
                $status_data['text'] = $result->text;
                $status_data['name'] = $result->user->name;
                $status_data['screen_name'] = $result->user->screen_name;
                $status_data['url'] = $result->entities->media[0]->media_url;
                array_push($statuses, $status_data);
            }
            $max_id = $result->id_str;
        }
        if ($last_id == $max_id) {
            $isLast = true;
        }
    }
    if (count($statuses) > 1) {
        array_pop($statuses);
    }
    return json_encode($statuses, JSON_PRETTY_PRINT);
}

function startWatcher($data_json)
{
    $codigos = getCodesJSON();
    if (count($codigos) > 0) {
        $hashtag = $data_json['Data']['hashtag'];
        $result = getResults($hashtag);
        scanCodes($result, $codigos, $data_json);
    }else{
        echo "No hay codigos";
    }
}

function scanCodes($data, $codigos, $data_json)
{
    foreach ($data as $respuesta) {
        $regex = "/(";
        foreach ($codigos as $key) {
            $regex .= "$key|";
        }
        $regex = substr($regex, 0, -1);
        $regex .= ")/";
        $amount = preg_match($regex, $respuesta["text"], $res);
        if ($amount == 1) {
            $val = array_search($res[0], $codigos);
            echo "<br>" . "Escaneando codigos en la respuesta: " . $respuesta["text"] . " - se encontro el codigo " . $codigos[$val];
            processQuestion($codigos[$val], $data_json);
            echo "<br>" . "Se ha procesado la pregunta " . $codigos[$val] . " - se procede a eliminar el codigo de la lista";
            unset($codigos[$val]);
            postCodesJSON(json_encode($codigos, JSON_PRETTY_PRINT));
        } else {
            echo "<br>" . "Escaneando codigos en la respuesta: " . $respuesta["text"] . " - no se han encontrado codigos validos";
        }
    }
}

function processQuestion($codigo, $data_json)
{
    sleep(120);
    $hashtag = $data_json['Data']['hashtag'];
    $data_results = getResults($hashtag);
    $pregunta = getQuestion($codigo, $data_json);
    if (isset($pregunta)) {
        echo "<br>" . "Obteniendo ganadores para: " . $pregunta["texto"] . " codigo: " . $pregunta["codigo"];
        $ganadores = getWinners(getAnswers($pregunta, $data_results), 3)["ganadores"];
        echo "<br>" . " Ganadores: " . "<br>";
        print_r($ganadores);
        echo "<br>" . "Resultados guardados, codigo: " . $pregunta["codigo"];
        $stored_results = getResultsJSON();
        foreach ($stored_results as &$result) {
            if ($result["codigo"] == $pregunta["codigo"]) {
                $result["ganadores"] = $ganadores;
            }
        }
        postResultsJSON(json_encode($stored_results, JSON_PRETTY_PRINT));
    }
}

function getQuestion($codigo, $data_json)
{
    foreach ($data_json["Preguntas"] as $pregunta) {
        if ($pregunta["codigo"] == $codigo) {
            return $pregunta;
        }
    }
}