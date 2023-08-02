const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

// the class 'Word' has the constructor 'word' parameter and set properties such was this.word, this.displayWord, etc
// each property does something different
// starting and ending with the delimiter mark (/), [\w] is the same as any word character, g is for global - so that all letters are replaced 
class Word {
  constructor(word) {
    this.word = word // this property is the chosen word from the 'words' array
    this.displayWord = word.replaceAll(/[\w]/g, "_") // this property replaces the chosen word from 'words' array with '_'
    this.remainingGuesses = 10 // this property sets the number of guesses to 10
    this.incorrectLetters = [] // property is an array
    this.correctLetters = [] // property is an array
  }

  // implement the guessLetter function:
  // guessLetter function is inside the Word class
  // if the word chosen includes the letter guessed, then the letter will be pushed to the correctLetters array
  // if the letter guessed is includes in the word, then it will join together as a string to make the word
  // if not, meaning if the guessed letter is not in the correctLetters array, then it will be replaced with '_'
  // if the guess letter is not in the word then the letter will be pushed to incorrectLetters array and remaining guess will minus 1 each time
   guessLetter(letter) {
    if(this.word.includes(letter)) {  
      this.correctLetters.push(letter);
      const letterRegex = new RegExp(`[^${this.correctLetters.join('')}]`, 'g');
      // this const above is to join all correct lettters, and anything that's not in this.word (using [^] is replace with '_')
      this.displayWord = this.word.replaceAll(letterRegex,"_")
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
   }

  // implement the updateScreen function:
  //function inside class Word
  // self-explanatory but showing the displayWord, guesses, and incorrect letters on DOM
   updateScreen() {
    var wordToGuess = document.getElementById('word-to-guess');
    var remainingGuess = document.getElementById('remaining-guesses');
    var incorrectLetters = document.getElementById('incorrect-letters');

    wordToGuess.innerHTML = this.displayWord
    remainingGuess.innerHTML = this.remainingGuesses
    incorrectLetters.innerHTML = this.incorrectLetters.join(', ')
   }

  // implement the isGameOver function:
  // function inside class Word
  // gameOver function is triggered in const gameOver and will return data if remaining guess is 0 or is displayWord matches this.word
   isGameOver() {
    return this.remainingGuesses === 0 || this.displayWord === this.word
   }

  // implement the getWinOrLoss function:
  // function inside class Word
  // getWinOrLoss is triggered in gameOver function, const result 
  // when result = currentWord, it will go through and check if display word = this.word, then it's a win
  // if remaining guess = 0, it's a loss, otherwise (or else) it returns null
   getWinOrLoss() {
    if (this.displayWord === this.word){ 
      return 'win'
    } else if (this.remainingGuesses === 0) {
      return 'loss'
    } else {
      return null
    }
   }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()