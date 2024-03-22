<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>Você é um Merda, e vou te provar!</title>
  <link rel="stylesheet" href="style.css">
 
</head>




<body>


  <audio id="audioPlayer" src="merda.mp3"></audio>
  <audio id="audioPlayer2" src="bosta.mp3"></audio>
 
  

  <div class="game" id="gameElement">

    
    <div class="merda" id="merda"></div>
    <div class="merda1" id="merda1"></div>
    <div class="merda2" id="merda2"></div>
    <div class="merda3" id="merda3"></div>
    <div class="merda4" id="merda4"></div>
    <div class="sol" id="gameElement2"></div>
    <div class="navio"></div>
    <div class="nuvens"></div>
    <div class="pessoa"></div>

    
    <div class="score-container">
      <div class="pontuacao">Pontuação: 0</div> <!-- Elemento para exibir o score -->

      <div class="menu">
          <p> <span class="game-over-score"></span></p>
          <p>Você é um MERDA!</p>
          <p>Você está onde deveria!</p>
          <p>Melhores Pontuações dessa Merda:</p>
          <p>
            
          <?php
            // Configurações do banco de dados
            $servername = "127.0.0.1"; // Endereço do servidor MySQL
            $username = "renan"; // Nome de usuário do MySQL
            $password = "1234"; // Senha do MySQL
            $database = "merda"; // Nome do banco de dados
            
            // Cria uma conexão com o banco de dados MySQL
            $conn = new mysqli($servername, $username, $password, $database);
            
            // Verifica a conexão
            if ($conn->connect_error) {
                die("Falha na conexão: " . $conn->connect_error);
            }
            
            // Consulta SQL para selecionar nome e pontuação, ordenados pela pontuação em ordem decrescente
            $sql = "SELECT nome, pontuacao FROM pontuacoes ORDER BY pontuacao DESC LIMIT 3";
            
            $result = $conn->query($sql);
            
            // Verifica se a consulta retornou resultados
            if ($result->num_rows > 0) {
                // Exibe os dados de cada linha
                while($row = $result->fetch_assoc()) {
                    echo "Nome: " . $row["nome"]. " - Pontuação: " . $row["pontuacao"]. "<br>";
                }
            } else {
                echo "0 resultados";
            }
            
            // Fecha a conexão
            $conn->close();
            ?>
          </p>
          
          <button class="restart-button" onclick="t()">Tentar Novamente!</button>
       
          
      </div>
  </div>
    
  </div>
 
  <script src="js.js" type="text/javascript"></script>



</body>
</html>