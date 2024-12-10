colourList = ["green", "red", "yellow", "blue"];

// game tracking variables
var level = 0;
var gameSequence = [];
var playersSequence = [];

// various functions

function randomColour() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomColour = colourList[randomNum];
  return randomColour;
}

function playSound(colour) {
  var sound = new Audio("./sounds/" + colour + ".mp3");
  sound.play();
}

function flash(item) {
  playSound(item);
  $("." + item).addClass("flash");
  setTimeout(function () {
    $("." + item).removeClass("flash");
  }, 200);
}

function buttonClick(input) {
  playersSequence.push(input);
  playSound(input);
  $("." + input).addClass("pressed");
  setTimeout(function () {
    $("." + input).removeClass("pressed");
  }, 100);
  if (checkCorrect() === true) {
    if (inputFinished() === true) {
      playersSequence = [];
      nextLevel();
    }
  } else gameOver();
}

// listening for player's clicks
$(".btn").click(function () {
  var buttonClicked = this.classList[1];
  buttonClick(buttonClicked);
});

// listening to keyboard presses
$(document).on("keydown", function (event) {
  var keyPressed = event.key;
  switch (keyPressed) {
    case "w":
      buttonClick("green");
      break;
    case "a":
      buttonClick("red");
      break;
    case "s":
      buttonClick("yellow");
      break;
    case "d":
      buttonClick("blue");
      break;
    case " ":
      startGame();
    default:
  }
});

function nextLevel() {
  var nextButton = randomColour();
  gameSequence.push(nextButton);
  level++;
  $("h1").text("level " + level);
  repeatGamePatternBack();
}

var play = true;

function startGame() {
  if (play === true) {
    setTimeout(nextLevel, 100);
    play = false;
  }
}

function repeatGamePatternBack() {
  setTimeout(function () {
    for (i = 0; i < gameSequence.length; i++) {
      flashDelay(gameSequence[i], 500 * i);
    }
  }, 1000);
}

function flashDelay(whatever, time) {
  setTimeout(function () {
    flash(whatever);
  }, time);
}

function checkCorrect() {
  for (i = 0; i < playersSequence.length; i++) {
    if (playersSequence[i] === gameSequence[i]) {
    } else return false;
  }
  return true;
}

function inputFinished() {
  if (playersSequence.length == gameSequence.length) {
    return true;
  } else return false;
}

function gameOver() {
  $("h1").text("GAME OVER. press space to start again");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  playSound("wrong");
  level = 0;
  gameSequence = [];
  playersSequence = [];
  play = true;
}
