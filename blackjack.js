/*
 Blackjack
 Eveleen Sung (eveleensung@gmail.com)
 June 2016
*/

/*

----------------------------------------------------------
Your challenge: implement 2-player blackjack

Blackjack is a card game played with a standard 52-card deck. Your job is to implement a simple version of blackjack that could be played by 2 people sitting down at a console.

You win at blackjack by having the best "hand" (your collection of cards). The goal is to get the value of your hand as close to 21 points as you can, without going over 21. If you go over 21 points, you're "busted", and lose the game.

Rules about scoring:
* A number card is worth as many points as its number (e.g. an 8 of hearts is worth 8 points)
* A face card (i.e. jack, queen, or king) is worth 10 points.
* An ace is worth either 11 points or 1 point (whichever is better for the player). This is calculated on-the-fly; in other words, the value of an ace can start as 11, then change to 1 once the player has more cards.

Some example hands:
* 9, 9, and 4: 9 + 9 + 4 => 22 points (busted)
* ace and queen: 11 + 10 => 21 points (perfect score)
* ace, ace, and 7: 11 + 1 + 7 => 19 points

Game play:
* At the beginning of the game, each player is dealt 2 cards
* After that, for each round, each player can choose to “hit” (take another card) or “stay” (stop taking cards). Use user input to determine whether each player should hit or stay. (Prompting the user for text input is fine.)
* Once a player stays, or is busted, that player is done playing. When all players are done, the game ends and whichever player has the best score wins.
* Note: to deal cards to players, simulate drawing cards from a shuffled deck.

A few simplifications:
* Don't worry about representing suits. Representing cards as integers is fine.
* Don't worry about making the UI impressive. Go ahead and just use basic text input and output.
* Don’t worry about supporting multiple rounds. If your program executes a single round of blackjack when it’s run, that’s fine.
* For reference, a standard deck consists of four of each of the following cards: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

NOTE: Getting user input seems to be flaky on CoderPad. If reading input from the user doesn’t work, that’s fine; just comment the line where you would get user input, and you can choose the user’s actions yourself (e.g. always have the user hit).

-------------------------------------------------------
*/

(function() {

  //Deck Info
  var deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1,
               2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];

  var currentDeckPosition = -1;

  //Player Class
  function Player(name) {
    this.name = name;
    this.cards = [];
    this.total = 0;
    this.done = false;
  };

  Player.prototype.dealCard = function() {
    currentDeckPosition++;
    this.cards.push(deck[currentDeckPosition]);
    this.calculate();
  };

  Player.prototype.calculate = function() {
    var total = 0;
    for (var i = 0; i < this.cards.length; i++) {

      var value = 0;
      switch (this.cards[i]) {
        case 1: //Ace first evaluates to 11
          value = 11;
          break;
        case 11: //Face cards evaluate to 10
        case 12:
        case 13:
          value = 10;
          break;
        default:
          value = this.cards[i];
          break;
      }

      total += value;
    }

    //Accomodate for potential ace value change
    if (this.cards.indexOf(1) > -1 && total > 21) {
      total -= 10;
    }

    this.total = total;

    if (total >= 21) {
      this.done = true;
    }
  };


  Player.prototype.playTurn = function(input) {
    if (input === 'hit') {
      this.dealCard();
    }
    if (input === 'stay') {
      this.done = true;
    }
  }


  var prompt = function() {
    //input would go here, but choosing randomly for now
    var choice = Math.floor(Math.random()*(1-0+1)+0);
    if (choice === 1) {
      return 'stay';
    }
    return 'hit';
  };

   var determineWinner = function(player1, player2) {
    if (player1.total <= 21 && player2.total > 21) {
      console.log(player1.name + ' wins with ' + player1.total);
    } else if (player1.total > 21 && player2.total <= 21) {
      console.log(player2.name + ' wins with ' + player2.total);
    } else if (player1.total === 21 && player2.total === 21) {
      console.log('Both got 21! Tie!');
    } else if (player1.total < 21 && player2.total < 21) {
      console.log('Both got under 21. Tie winning.');
    } else {
      console.log('Both got over 21. Tie losing.');
    }
  };

  var display = function(player) {
    var newArr = [];
    for(var i = 0; i < player.cards.length; i++) {
      switch (player.cards[i]) {
        case 1:
          newArr.push('ace');
          break;
        case 11:
          newArr.push('jack');
          break;
        case 12:
          newArr.push('queen');
          break;
        case 13:
          newArr.push('king');
          break;
        default:
          newArr.push(player.cards[i]);
          break;
      }
    }
    console.log(player.name + ': ' + newArr.join(', ') + ' => ' + player.total);
  };

  var playGameWith = function(player1, player2) {

    //Initialize game
    console.log('Welcome to 2 player blackjack!');
    shuffleArray(deck);
    console.log('Deck shuffled...');
    currentDeckPosition = -1;

    //deal initial cards
    player1.dealCard();
    player2.dealCard();
    player1.dealCard();
    player2.dealCard();

    console.log('Cards dealt...');
    display(player1);
    display(player2);

    console.log('Game begins...');

    //continue playing game until done
    do {
      if (player1.done === false) {
        var choice = prompt();
        console.log(player1.name + ' chooses ' + choice);
        player1.playTurn(choice);
        display(player1);
      }
      if (player2.done === false) {
        var choice = prompt();
        console.log(player2.name + ' chooses ' + choice);
        player2.playTurn(choice);
        display(player2);
      }
    } while (player1.done === false || player2.done === false);

    //winner
    determineWinner(player1, player2);
  };



  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }


  var John = new Player('John');
  var Bill = new Player('Bill');

  playGameWith(John, Bill);

})();
