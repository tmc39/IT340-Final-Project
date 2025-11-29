<?php
include("database.php");

//The purpose of this file is to validate login information passed from the frontend
$emailAddress = /*Likely needs to be changed*/ $_POST['emailAddress'];
$password = /*Likely needs to be changed */ $_POST['password'];

//Assigns the database to a variable
$db = getDB();
$user_data = $db->User_Data;


//Input filtering for security
if(!filter_var($emailAddress, FILTER_VALIDATE_EMAIL)){
   echo "Invalid email ";
   echo "<a href=\"index.php\">Please try again</a>\n";
}
else{
    //Attempts to fetch a document matching the email address and password from the database
    $user_results = $collection->findOne(['email' => $emailAddress, 'Password' => $password]);
    
    //If the query doesn't find a matching document, it should return null, so this if statement checks for that
    if (!($user_results == null)) {
      //$_SESSION['emailAddress'] = $emailAddress;
      //Figure out how to send things to frontend
   } else {
      //Figure out how to send things to frontend
   }
}    
?>