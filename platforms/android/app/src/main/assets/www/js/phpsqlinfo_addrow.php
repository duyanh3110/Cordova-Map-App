<?php
header('Access-Control-Allow-Origin: *');

$servername = "mip-php-db-duyanh.cvuq1urw4it7.eu-west-1.rds.amazonaws.com";
$username = "root";
$password = "rootroot";
$dbname = "person-db";

// Gets data from URL parameters.
$name = $_GET['name'];
$address = $_GET['address'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];
$content = $_GET['content'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
    $stmt = $conn->prepare("INSERT INTO markers (name, address, lat, lng, content) 
    VALUES (:name, :address, :lat, :lng, :content)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':address', $address);
    $stmt->bindParam(':lat', $lat);
    $stmt->bindParam(':lng', $lng);
    $stmt->bindParam(':content', $content);

    $stmt->execute();
    echo "New records created successfully";
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;
?>