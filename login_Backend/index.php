<?php
require_once __DIR__ . '/controllers/AuthController.php'; // Usa __DIR__ para la ruta absoluta

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si es una solicitud OPTIONS, responde inmediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$authController = new AuthController();

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

if ($request_method == 'POST' && $request_uri == '/login') {
    $authController->login();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint no encontrado']);
}
?>