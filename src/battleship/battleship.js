// PSUEDOCODE to CODE example
let play = (value) => {
  // DECLARE three variables to hold the location of each cell of the sheep
  // Lets call them location1, location2, and location3
  var location1 = Math.floor(Math.random() * 5),
    location2 = location1 + 1,
    location3 = location1 + 2;
  // DECLARE a variable to hold the user's current guess.
  // Let's call it guess.

  var guess = 0;
  // DECLARE a variable to hold the number of hits.
  // We'll call it hits and set it to 0;
  var hits = 0;
  // DECLARE a variable to hold the number of guesses.
  var guesses = 0;
  // DECLARE a variable to keep track of whether the ship is sunk or not.
  // Let's call it isSunk and set it to false.
  var isSunk = false;

  // LOOP: While the ship is not sunk
  while (!isSunk) {
    // ---> GET the user's guess
    guess = prompt('ready, aim, fire! [Enter a number 0-6]');
    console.log(guess);
    // This condition is true if  guess is less than zero OR guess is greater than 6
    // ---> IF the user's guess is invalid
    if (guess < 0 || guess > 6) {
      // ------> TELL User to enter a valid number

      alert('Please enter a valid cell number');
    }
    //ELSE User to enter a valid number
    else {
      // ADD one to guesses
      guesses = guesses + 1;

      // IF the user's guess matches a location
      if (guess == location1 || guess == location2 || guess == location3) {
        // ADD one to the number hits
        hits = hits + 1;
        alert('Oh Shit');

        // IF number of hits is 3
        if (hits == 3) {
          // SET isSunk to true
          isSunk = true;
          // alert('You sank my battleship!');
          var stats = `Your Stats:  you took ${guesses} to sink the battle ship which means your shooting accuracy was ${
            3 / guesses
          }`;
          alert(stats);
        }
      } else {
        alert('You missed');
      }
    }
  }
};

/**
 * - It is backend code responsible for updating the display or UI see line 70
 * This makes it easy to test view in isolation
 */

const view = {
  displayMessage: function (msg) {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },

  displayHit: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute('class', 'hit');
  },
  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  }
};

/**
 * This is where we keep the state (number of guesses, hit or miss) of the game
 * contains logic (determine if guess is hit or miss) relating to how the state changes
 * e.g.
 */

const model = {
  numShips: 2,
  boardSize: 7,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    {
      hits: ['', '', ''],
      locations: ['10', '20', '30']
    },
    {
      hits: ['', '', ''],

      locations: ['32', '33', '34']
    },
    {
      hits: ['', '', 'hit'],
      locations: ['63', '64', '65']
    }
  ],

  fire: function (guess) {
    console.log(guess);

    for (let i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess); // this is called chaining
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('Missed!');

    return false;
  },

  isSunk: (ship) => {
    const { locations } = ship;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i] !== 'hit') {
        return false;
      }
    }
    // TODO: view.displayMessage('You sunk my battleship');
    return true;
  }
};

const controller = {
  guess: 0,

  processGuess: function (guess) {
    if (guess === null || guess.length !== 2) {
      alert('Oops invalid guess entered!');
    }
  },

  parseGuess: function (guess) {
    const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (guess === null || guess.length !== 2) {
      alert('Oops invalid guess entered!');
    } else {
      const firstChar = guess.charAt(0);
      const row = alphabets.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert('Invalid guess entered!');
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert('Invalid guess entered!');
      }
      return row;
    }
  } // parse
};

// view.displayMiss('16');
// view.displayMiss('15');
// view.displayMiss('23');
// view.displayHit('34');
// view.displayMiss('55');
// view.displayHit('12');
// view.displayMiss('25');
// view.displayHit('26');
// view.displayHit('22');

// model.fire('53');
// model.fire('00');
model.fire('10');
model.fire('22');
model.fire('23');
// model.fire('11');
// model.fire('21');
// model.fire('15');
// model.fire('16');
// model.fire('14');
// model.fire('13');
