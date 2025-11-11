<?php
//This is creates a standardized little box for displaying events on a page
include("EventInfo.php");
//Placeholder variables, will pull them from the actual events eventually
$EventName = "Placeholder Name";
$EventTime = "12:00";
$EventLocation = "Big Building";
?>

<p>
    <?php 
    echo $EventName 
    ?>
    <br>Event Time: <?php echo $EventTime ?>
    <br>Event Location: <?php echo $EventLocation ?>
</p>