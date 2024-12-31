'use strict';

//Selecting Element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Champ reserve for function
function playerActive() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function changePlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  playerActive();
  activePlayer = activePlayer === 0 ? 1 : 0;
}

//Champ reserve for variable
let score, currentScore, activePlayer, playing;

function init() {
  //Champ reserve for variable
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Starting conditions
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();
//Rolling dice functionality
btnRollEl.addEventListener('click', () => {
  if (playing) {
    //1. Generating a random dice roll:
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1:

    if (dice !== 1) {
      //Add dice to current score:
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true switch to next player:
      changePlayer();
    }
  }
});

btnHoldEl.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--acive');
    } else {
      changePlayer();
    }
  }
});

btnNewEl.addEventListener('click', init);
