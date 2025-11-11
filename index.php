<?php
//Main html file
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>EventLink</title>
    <!--<link rel="icon" type="image/png" href="/images/logo.png">
    <link rel="stylesheet" type="text/css" href="styling.css">-->
</head>
<body>
    <header>
       EVENTLINK
    </header>
    <section style="height: 425px;">
       <nav style="float: left; height: 100%;">
           <?php include("nav.inc.php"); ?>
       </nav>
       <main>
           <?php
             include("EventDashboard.inc.php");
           ?>
           
       </main>
   </section>
   <footer>
        <?php
            
        ?>
   </footer>
</body>
</html>
