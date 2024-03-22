<?php
// Conectar ao banco de dados
$conn = new mysqli("127.0.0.1", "renan", "1234", "merda");

// Verificar conexão
if ($conn->connect_error) {
    die("Erro ao conectar ao banco de dados: " . $conn->connect_error);
}

// Receber os dados do AJAX
$nome = $_POST["nome"];
$pontuacao = $_POST["pontuacao"];

// Preparar e executar a consulta SQL para inserir a pontuação
$sql = "INSERT INTO pontuacoes (nome, pontuacao) VALUES ('$nome', $pontuacao)";
if ($conn->query($sql) === TRUE) {
    echo "Pontuação inserida com sucesso!";
} else {
    echo "Erro ao inserir pontuação: " . $conn->error;
}

// Fechar conexão
$conn->close();
?>
