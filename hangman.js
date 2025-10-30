var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];

var MAX_GUESSES = 6;
var word = "";
var guesses = "";
var guess_count = MAX_GUESSES;
var gameOver = false;

function newGame() {
    var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    console.log(`Word chosen was: ${word}`);
    guesses = "";
    guess_count = MAX_GUESSES;
    gameOver = false;
    updatePage();
}
function guessLetter() {
    var input = document.getElementById("guess");
    var letter = input.value.toLowerCase();

    if (word === "") {
        alert("Please start a new game first!");
        input.value = "";
        return;
    }

    if (gameOver) {
        input.value = "";
        return;
    }
    if (letter === "") {
        return;
    }
    if (guesses.indexOf(letter) >= 0) {
        alert("You already guessed that letter!");
        input.value = "";
        return;
    }

    if (word.indexOf(letter) < 0) {
        guess_count--;
    }
    console.log(`Current GuessCount: ${guess_count}`);
    guesses += letter;
    input.value = "";
    updatePage();
    checkGameOver();
}

function checkGameOver() {
    var guessArea = document.getElementById("guesses");
    if (guess_count <= 0) {
        gameOver = true;
        guessArea.innerHTML = "Guessed Letters: " + guesses + "<br><strong style='color: red;'>YOU LOST! The word was: " + word + "</strong>";
        return;
    }
    var hasWon = true;
    for (var i = 0; i < word.length; i++) {
        if (guesses.indexOf(word.charAt(i)) < 0) {
            hasWon = false;
            break;
        }
    }

    if (hasWon) {
        gameOver = true;
        guessArea.innerHTML = "Guessed Letters: " + guesses + "<br><strong style='color: green;'>YOU WON! Congratulations!</strong>";
    }
}

function updatePage() {
    var clueString = "";
    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " ";
        }
        else
            clueString += "_ ";
    }
    //Update clue page
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;
    //update the guesses from the user
    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters: " + guesses;

    //update the image
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman" + guess_count + ".gif";
}

