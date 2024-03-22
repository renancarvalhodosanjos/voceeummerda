const pessoa = document.querySelector(".pessoa");
const pontuacao = document.querySelector('.pontuacao'); // Selecionando o elemento score

let alreadyJump = false;
var count = 0;


// Quando o jogo terminar
function t() {
    var nome = prompt("Digite seu nome:");
    var pontuacao = count;

    // Enviar a pontuação para o servidor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "salvar_pontuacao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
        }
    };
    xhr.send(`nome=${nome}&pontuacao=${pontuacao}`);
}




// Lista de URLs de imagens que deseja usar como background
const imageUrls = [

    'img/fundonoite.png',
    'img/fundodia.png'

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
setInterval(changeBackgroundImage, 60000);


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
setInterval(changeBackgroundImage2, 60000);



//TITANICA DE MERDA e CHUVA DE MERDA



function ativarAnimacao(elementId, duracao) {
    var elemento = document.getElementById(elementId);
    elemento.style.animation = 'none'; // Limpa a animação
    void elemento.offsetWidth; // Reinicia a renderização
    elemento.style.animation = `${elementId} ${duracao}s linear`; // Define a animação novamente
}

function iniciarAnimacaoAleatoria(elementId) {
    var duracaoAleatoria = Math.random() * 4 + 1; // Gera um número aleatório entre 1 e 5 segundos
    ativarAnimacao(elementId, duracaoAleatoria);
    var tempoAleatorio = duracaoAleatoria * 1000; // Converte para milissegundos
    setTimeout(function () {
        iniciarAnimacaoAleatoria(elementId);
    }, tempoAleatorio);
}

iniciarAnimacaoAleatoria('merda');
iniciarAnimacaoAleatoria('merda1');




//tocar som ao clicar espaço
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        playAudio();
    }
});

//tocar som ao tocar na tela
//document.addEventListener('touchstart', function() {
// playAudio();
//});


function playAudio() {
    var audio = document.getElementById('audioPlayer');
    audio.play();
}

function playAudio2() {
    var audio2 = document.getElementById('audioPlayer2');
    audio2.play();
}

let jumpEnabled = true; // Variável de controle para permitir ou bloquear a função jump()


//função para pular
function jump() {
    if (jumpEnabled && !pessoa.classList.contains("jump")) {
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
    if (jumpEnabled) {
        let pessoaRect = pessoa.getBoundingClientRect();
        let merdaRect = merda.getBoundingClientRect();
        let merda1Rect = merda1.getBoundingClientRect();

        if (
            (pessoaRect.right > merdaRect.left &&
                pessoaRect.left < merdaRect.right &&
                pessoaRect.bottom > merdaRect.top &&
                pessoaRect.top < merdaRect.bottom) ||
            (pessoaRect.right > merda1Rect.left &&
                pessoaRect.left < merda1Rect.right &&
                pessoaRect.bottom > merda1Rect.top &&
                pessoaRect.top < merda1Rect.bottom)
        ) {
            playAudio2();
            const menu = document.querySelector('.menu');
            const gameOverScore = document.querySelector('.game-over-score');
            const restartButton = document.querySelector('.restart-button');

            jumpEnabled = false; // Bloqueia a função jump() após a colisão

            menu.style.display = 'block';
            gameOverScore.textContent = `Sua Pontuação de Merda: ${count}`;
            pessoa.style.backgroundImage = "url(img/merda.png)";
            merda.style.animation = "none";
            merda.style.backgroundImage = "url()";
            merda1.style.animation = "none";
            merda1.style.backgroundImage = "url()";

            restartButton.addEventListener('click', () => {

                count = 0;
                menu.style.display = 'none';
                pessoa.style.backgroundImage = "url(img/pessoa.gif)";
                merda.style.backgroundImage = "url(img/merda.png)";
                merda1.style.backgroundImage = "url(img/merda.png)";
                merda.style.animation = "none";
                merda1.style.animation = "none";
                jumpEnabled = true; // Permite a função jump() após clicar no botão de reinício
            });

            return true;
        }
    }
    return false;
}

setInterval(() => {
    detectCollision();
}, 10);
