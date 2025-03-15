<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

class AuthController {
    private $filePath = 'data/users.txt';

    public function __construct() {
        // Crear el archivo si no existe
        if (!file_exists($this->filePath)) {
            file_put_contents($this->filePath, json_encode([]));
        }
    }

    private function getUsers() {
        $data = file_get_contents($this->filePath);
        return json_decode($data, true);
    }

    private function saveUsers($users) {
        file_put_contents($this->filePath, json_encode($users));
    }

    public function register() {
        $data = json_decode(file_get_contents("php://input"), true);
        $username = $data['username'];
        $password = $data['password'];

        $users = $this->getUsers();

        // Verificar si el usuario ya existe
        foreach ($users as $user) {
            if ($user['username'] === $username) {
                http_response_code(400);
                echo json_encode(['message' => 'El usuario ya existe']);
                return;
            }
        }

        // Registrar el nuevo usuario
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $users[] = [
            'username' => $username,
            'password' => $hashed_password
        ];

        $this->saveUsers($users);
        echo json_encode(['message' => 'Usuario registrado con éxito']);
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"), true);
        $username = $data['username'];
        $password = $data['password'];

        $users = $this->getUsers();

        // Buscar el usuario
        foreach ($users as $user) {
            if ($user['username'] === $username && password_verify($password, $user['password'])) {
                echo json_encode(['message' => 'Login exitoso', 'user' => $user]);
                return;
            }
        }

        http_response_code(401);
        echo json_encode(['message' => 'Credenciales incorrectas']);
    }
}

// Manejo de las solicitudes
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

$authController = new AuthController();

if ($request_method == 'POST' && $request_uri == '/register') {
    $authController->register();
} elseif ($request_method == 'POST' && $request_uri == '/login') {
    $authController->login();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint no encontrado']);
}
?>