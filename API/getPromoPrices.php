<?php
    
    $db = new PDO('mysql:host=localhost;dbname=...', '...', '...');
    $db->exec("SET NAMES UTF8");
    
    $sql = "SELECT * FROM promo_prices";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->FetchAll(PDO::FETCH_ASSOC);
   
    echo json_encode($result);

?>
