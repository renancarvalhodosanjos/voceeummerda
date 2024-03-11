const pessoa = document.querySelector(".pessoa");
const merda = document.querySelector(".merda");
const score = document.querySelector('.score'); // Selecionando o elemento score

let alreadyJump = false;
let count = 0;

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    playAudio();
  }
});

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

function jump() {
  if (!pessoa.classList.contains("jump")) {
    pessoa.classList.add("jump");
    alreadyJump = true;
    // Incrementando o score ao pular sobre o objeto merda
    count++;
    score.textContent = `SCORE: ${count}`;
    setTimeout(() => {
      pessoa.classList.remove("jump");
      alreadyJump = false;
    }, 750);
  }
}

document.addEventListener("mousedown", () => {
  jump();
});

document.addEventListener("keydown", (e) => {
  jump();
});

document.addEventListener("touchstart", () => {
  jump();
});

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
    gameOverScore.textContent = `Your Score: ${count}`;
    count = 0;
    pessoa.style.backgroundImage = "url(img/merda.png)";
    merda.style.animation = "none";
    merda.style.backgroundImage = "url()";

    restartButton.addEventListener('click', () => {
      menu.style.display = 'none';
      pessoa.style.backgroundImage = "url(img/pessoa.gif)";
      merda.style.backgroundImage = "url(img/merda.png)";
      merda.style.animation = "merda 2000ms linear infinite";
    });

    return true;
  }

  return false;
}

setInterval(() => {
  detectCollision();
}, 10);
