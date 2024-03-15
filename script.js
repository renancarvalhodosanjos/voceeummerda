const pessoa = document.querySelector(".pessoa");
const merda = document.getElementById("merda");
const pontuacao = document.querySelector('.pontuacao'); // Selecionando o elemento score

let alreadyJump = false;
let count = 0;


// Lista de URLs de imagens que deseja usar como background
const imageUrls = [

  'img/fundonoite.jpg',
  'img/fundo.jpg'
  
];

// Variável para rastrear a posição atual da imagem na lista
let currentPosition = 0;


// Função para atualizar a imagem de fundo
function changeBackgroundImage() {

// Verifica se há mais imagens na lista
  if (currentPosition < imageUrls.length - 1) {
    // Incrementa a posição atual para a próxima imagem na lista
    currentPosition++;
  } else {
    // Se atingir o final da lista, volta para a primeira imagem
    currentPosition = 0;
  }
  // Seleciona a URL da imagem com base na posição atual
  const imageUrl = imageUrls[currentPosition];
  // Altera o background-image do elemento
  gameElement.style.backgroundImage = `url(${imageUrl})`;
}

// Chama a função para mudar a imagem de fundo a cada 30 segundos (30000 milissegundos)
setInterval(changeBackgroundImage, 30000);


// Lista de URLs de imagens que deseja usar como background
const imageUrls2 = [

  'img/lua.png',
  'img/sol.png'
  
];

// Variável para rastrear a posição atual da imagem na lista
let currentPosition2 = 0;


// Função para atualizar a imagem de fundo
function changeBackgroundImage2() {

// Verifica se há mais imagens na lista
  if (currentPosition2 < imageUrls2.length - 1) {
    // Incrementa a posição atual para a próxima imagem na lista
    currentPosition2++;
  } else {
    // Se atingir o final da lista, volta para a primeira imagem
    currentPosition2 = 0;
  }
  // Seleciona a URL da imagem com base na posição atual
  const imageUrl2 = imageUrls2[currentPosition2];
  // Altera o background-image do elemento
  gameElement2.style.backgroundImage = `url(${imageUrl2})`;
}

// Chama a função para mudar a imagem de fundo a cada 30 segundos (30000 milissegundos)
setInterval(changeBackgroundImage2, 30000);




































//tocar som ao clicar espaço
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    playAudio();
  }
});

//tocar som ao tocar na tela
document.addEventListener('touchstart', function() {
  playAudio();
});


function playAudio() {
  var audio = document.getElementById('audioPlayer');
  audio.play();
}

function playAudio2() {
  var audio2 = document.getElementById('audioPlayer2');
  audio2.play();
}

//funcao para pular
function jump() {
  if (!pessoa.classList.contains("jump")) {
    pessoa.classList.add("jump");
    alreadyJump = true;

    // Incrementando o score ao pular sobre o objeto merda
    count++;
    pontuacao.textContent = `Pontuação: ${count}`;
    setTimeout(() => {
      pessoa.classList.remove("jump");
      alreadyJump = false;
    }, 750);
  }
}


//pular ao clicar no mouse
document.addEventListener("mousedown", () => {
  jump();
});

//pular ao clicar qualquer tecla
document.addEventListener("keydown", (e) => {
  jump();
});

//pular ao clicar na tela
document.addEventListener("touchstart", () => {
  jump();
});


//detectar colisão
function detectCollision() {
  let pessoaRect = pessoa.getBoundingClientRect();
  let merdaRect = merda.getBoundingClientRect();

  if (
    pessoaRect.right > merdaRect.left &&
    pessoaRect.left < merdaRect.right &&
    pessoaRect.bottom > merdaRect.top &&
    pessoaRect.top < merdaRect.bottom
  ) {
    playAudio2();
    const menu = document.querySelector('.menu');
    const gameOverScore = document.querySelector('.game-over-score');
    const restartButton = document.querySelector('.restart-button');
    menu.style.display = 'block';
    

    gameOverScore.textContent = `Pontuação: ${count}`;
    count = 0;
    pessoa.style.backgroundImage = "url(img/merda.png)";
    merda.style.animation = "none";
    merda.style.backgroundImage = "url()";

    restartButton.addEventListener('click', () => {
      menu.style.display = 'none';
      pessoa.style.backgroundImage = "url(img/pessoa.gif)";
      merda.style.backgroundImage = "url(img/merda.png)";
      merda.style.animation = "merda 1s linear infinite";
    });

    return true;
  }

  return false;
}

setInterval(() => {
  detectCollision();
}, 10);
