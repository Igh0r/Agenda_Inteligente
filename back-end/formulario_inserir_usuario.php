<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Novo Usuário</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<a href="/trabalhofinal/index.php">Home</a><br><br>

<h2>Formulário de Inserção de Usuário</h2>

<form action="inserir_usuario.php" method="post">
    <label for="nome">Nome:</label><br>
    <input type="text" id="nome" name="nome" required><br><br>
   
   <!-- <label for="idade">Idade:</label><br>
    <input type="number" id="idade" name="idade" required><br><br> -->

    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required><br><br>
   
    <label for="senha">Senha:</label><br>
    <input type="password" id="senha" name="senha" required><br><br>

    <!--<label for="status">Status:</label><br>
    <select id="status" name="status">
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>-->
    </select><br><br>
    
    <input type="submit" value="Inserir Usuário">
</form>

</body>
</html>
