<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Usuário</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<a href="/trabalhofinal/index.php">Home</a><br><br>

<?php
// Incluir o arquivo de conexão
require_once 'conexao.php';

// Coletar dados do formulário
$nome = $_POST['nome'];
/*$idade = $_POST['idade'];*/
$email = $_POST['email'];
$senha = $_POST['senha']; // Lembre-se de fazer hash da senha antes de armazenar no banco de dados
$hash = password_hash($senha, PASSWORD_DEFAULT);
/*$status = $_POST['status'];*/


// Query para inserir um novo usuário
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$hash')";

if ($conn->query($sql) === TRUE) {
    echo "Usuário inserido com sucesso!";
} else {
    echo "Erro ao inserir usuário: " . $conn->error;
}

// Fechando conexão com o banco de dados
$conn->close();
?>
</body>
</html>