<?php
   function getDB(){
      $uri = 'mongodb://localhost:27017/';
      $client = new MongoDB\Client($uri);
      $db = $client->getDatabase('test_database');
      return $db;
   }
   getDB();   
  

?>