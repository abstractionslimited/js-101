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

view.displayMiss('00');
view.displayHit('34');
view.displayMiss('55');
view.displayHit('12');
view.displayMiss('25');
view.displayHit('26');
view.displayHit('22');

module.exports = { play, View };
