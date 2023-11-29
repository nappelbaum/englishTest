<?php
    
    $name = htmlspecialchars(trim($_POST['name']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $email = htmlspecialchars(trim(mb_strtolower($_POST["email"])));
    $timestamp = date('Y-m-d H:i:s');
    
    if(mb_strlen($name) < 1 || mb_strlen($phone) < 1 || mb_strlen($email) < 1) {
        echo "Какое-то из полей не заполнено! ";
    } else if(mb_strlen($name) > 50 || mb_strlen($phone) > 50 || mb_strlen($email) > 50) {
        echo "Длина записи в поле не должна превышать 50 символов!";
    } else {
        $db = new PDO('mysql:host=localhost;dbname=u2076368_englishTest', 'u2076368_default', 'M4Kkn85Ge7S5qAAs');
        $db->exec("SET NAMES UTF8");

        $query = $db->prepare("INSERT INTO applications (name, phone, email, timestamp) VALUES (:name, :phone, :email, :timestamp)");
        $params = ['name' => $name, 'phone' => $phone, 'email' => $email, 'timestamp' => $timestamp];
        $affected = $query->execute($params);

        if($affected > 0) {
            echo "Данные отправлены в базу данных!";
            } else {
            echo "Ошибка соединения с базой данных";
            }
    }
    
    
?>