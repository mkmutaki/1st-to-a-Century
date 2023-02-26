'use strict';

// Selecting game elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const Player0El = document.querySelector('.player--0');
const Player1El = document.querySelector('.player--1');

let play, scores, currentScore, activePlayer;

// Starting conditions

//Startup message
Swal.fire({
  title: 'WELCOME TO A HUNNID💯!',
  html: '<p>Each player will take turns rolling a <em> random, virtual dice </em> until one of them reaches a score of 100. Players can either <u>hold</u> their current score or <u>continue rolling</u>. <br> If a player rolls a 0, their current score ALSO resets to 0 and their turn is over. Who will come out on top?</p> <br> <p> Use <strong> Roll the dice </strong> to take a roll and <strong> Hold </strong> to store your current score.</p> <p></p>',
  confirmButtonColor: '#9b2323',
  confirmButtonText: 'START',
  allowOutsideClick: false,
  customClass: 'swal-wide',
  customClass: 'swal-height',
});

function init() {
  play = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  Player0El.classList.remove('player--winner');
  Player1El.classList.remove('player--winner');
  Player0El.classList.add('player--active');
  Player1El.classList.remove('player--active');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  Player0El.classList.toggle('player--active');
  Player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function Roll() {
  if (play) {
    // Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice images
    diceEl.classList.remove('hidden');
    diceEl.src = `assets/dice-${dice}.png`;

    // Check for rolled 1 switch to next player
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (play) {
    // Add current score to active player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      play = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
