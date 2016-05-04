<?php
/**
 * Created by PhpStorm.
 * User: dannys
 * Date: 12/13/15
 * Time: 10:22 AM
 */


require_once 'lib/twitteroauth.php';
require_once 'lib/settings.php';

$data = getDataJSON();
$hashtag = $data['Data']['hashtag'];
getTweetsImages($hashtag);

function getDataJSON()
{
    $str = file_get_contents('JSON/data/pictures_data.json');
    $json = json_decode($str, true);
    return $json;
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
        if (isset($results->statuses)) {
            foreach ($results->statuses as $result) {
                if (isset($result->entities->media)) {
                    $status_data = Array();
                    $status_data['text'] = $result->text;
                    $status_data['name'] = $result->user->name;
                    $status_data['screen_name'] = $result->user->screen_name;
                    $status_data['url'] = $result->entities->media[0]->media_url_https;
                    $status_data['created_at'] = $result->created_at;
                    array_push($statuses, $status_data);
                    //print_r($result->entities->media);
                }
                $max_id = $result->id_str;
            }
        }
        if ($last_id == $max_id) {
            $isLast = true;
        }
    }
    if (count($statuses) > 1) {
        array_pop($statuses);
    }
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo json_encode($statuses, JSON_UNESCAPED_SLASHES);
}

function search(array $query)
{
    $toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);
    return $toa->get('search/tweets', $query);
}
