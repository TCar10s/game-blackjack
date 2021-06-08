const myModule = (() => {
  'use strict';

  /**
   * 2C -> Two of Clubs
   * 2D -> Two of Diamonds
   * 2H -> Two of Hearts
   * 2S -> Two of Spades
   */

  let deck = [];
  const types = ['C', 'D', 'H', 'S'],
    specials = ['A', 'J', 'K', 'Q'];

  let playersPoints = [];

  // Referencias
  const btnOrder = document.querySelector('#btn-order-card'),
    btnStop = document.querySelector('#btn-stop'),
    btnNewGame = document.querySelector('#btn-new-game');

  const divCardsPlayers = document.querySelectorAll('.divCards'),
    smallsPoints = document.querySelectorAll('small');

  // Esta función inicializa el juego.
  const initializeGame = (numPlayers = 2) => {
    deck = createDeck();
    playersPoints = [];
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0);
    }
    smallsPoints.forEach((item) => (item.innerText = 0));
    divCardsPlayers.forEach((item) => (item.innerHTML = ''));
    btnOrder.disabled = false;
    btnStop.disabled = false;
  };

  // Esta función crea una nueva baraja.
  const createDeck = () => {
    let deck = [];
    for (const type of types) {
      for (let i = 2; i <= 10; i++) {
        deck.push(i + type);
      }
      for (const special of specials) {
        deck.push(special + type);
      }
    }
    // Se mezcla el array usando la libreria Underscore.
    return _.shuffle(deck);
  };

  // Esta función permite tomar carta.
  const takeCard = () => {
    if (deck.length === 0) throw 'No hay cartas en el deck';
    return deck.pop();
  };

  //  Esta función asigna los valores a las cartas.
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    // isNaN() -> is not a number.
    return isNaN(value) ? (value === 'A' ? 11 : 10) : parseInt(value); // J,K,Q -> 10 points; A -> 11 points;
  };

  // Turno: 0 -> primer jugador y el último será la computadora.
  const accumulatePoints = (card, turn) => {
    playersPoints[turn] += cardValue(card);
    smallsPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    const imgCard = document.createElement('img');
    imgCard.src = `assets/img/cartas/${card}.png`;
    imgCard.classList.add('card');
    divCardsPlayers[turn].append(imgCard);
  };

  const determineWinner = () => {
    const [minimumPoints, pointsComputer] = playersPoints;
    setTimeout(() => {
      if (pointsComputer === minimumPoints) {
        alert('Empate');
      } else if (minimumPoints > 21) {
        alert('La computadora gana!');
      } else if (pointsComputer > 21) {
        alert('Jugador gana');
      } else {
        alert('La computadora gana!');
      }
    }, 60);
  };

  // Turno de la computadora
  const computerShift = (minimumPoints) => {
    let pointsComputer = 0;
    do {
      const card = takeCard();
      pointsComputer = accumulatePoints(card, playersPoints.length - 1);
      createCard(card, playersPoints.length - 1);
    } while (pointsComputer < minimumPoints && minimumPoints <= 21);
    determineWinner();
  };

  // Eventos
  btnOrder.addEventListener('click', () => {
    const card = takeCard();
    const pointsPlayer = accumulatePoints(card, 0);
    createCard(card, 0);
    if (pointsPlayer > 21) {
      btnOrder.disabled = true;
      btnStop.disabled = true;
      computerShift(pointsPlayer);
    } else if (pointsPlayer === 21) {
      btnStop.disabled = true;
      computerShift(pointsPlayer);
    }
  });

  btnStop.addEventListener('click', () => {
    btnOrder.disabled = true;
    btnStop.disabled = true;
    computerShift(playersPoints[0]);
  });

  return { newGame: initializeGame };
})();
