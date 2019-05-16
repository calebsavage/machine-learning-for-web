<?php

require_once('./secrets.php');

//set up a log file
if(!file_exists('cache.json')){
	touch('cache.json');
	$cache = array();
}else{
	$cacheString = file_get_contents('cache.json');
	$cache = json_decode($cacheString);

}





$query = $_GET['query'];

if(isset($cache->$query)){
	$cache->$query->cached='true';
	
}else{

	$query = urlencode($query);
	$url = "http://api.walmartlabs.com/v1/search?query=$query&apiKey=$apiKey";
	$res = file_get_contents($url);
//echo $res;
	$cache->$query = json_decode($res);

	file_put_contents('cache.json', json_encode($cache));

}


die(json_encode($cache->$query));