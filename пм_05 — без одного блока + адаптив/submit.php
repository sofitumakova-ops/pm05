<?php
header('Content-Type: text/html; charset=utf-8');

$host = 'sql306.infinityfree.com';
$user = 'if0_42265673';
$password = 'fIVIorFIZqZE';  // ВСТАВЬ СВОЙ ПАРОЛЬ
$database = 'if0_42265673_applications';

$conn = new mysqli($host, $user, $password, $database);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die('❌ Ошибка подключения к БД');
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

$name = trim($name);
$email = trim($email);
$message = trim($message);

if (empty($name) || empty($email) || empty($message)) {
    die('❌ Заполните все поля');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('❌ Некорректный email');
}

$sql = "INSERT INTO applications (name, email, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $name, $email, $message);

if ($stmt->execute()) {
    echo '✅ Заявка успешно отправлена!';
    
    echo 'Через 3 секунды вы вернётесь на главную...';
    echo '<meta http-equiv="refresh" content="3;url=index.html">';
} else {
    echo '❌ Ошибка при сохранении: ' . $conn->error;
    echo '<br><br>';
    echo '<a href="index.html">🔙 Вернуться на главную</a>';
}

$stmt->close();
$conn->close();
?>