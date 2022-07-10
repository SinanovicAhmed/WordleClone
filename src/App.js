import { useState, useEffect } from "react";
import Guess from "./components/guess/Guess.js";
import styles from "./App.module.css";
import { words } from "./components/words/words";
import UnusedLetters from "./components/UnusedLetters/UnusedLetters.js";
import { alphabet } from "./components/UnusedLetters/alphabet";
function App() {
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [guessWord, setGuessWord] = useState("");
  const [guessNumber, setGuessNumber] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [animationState, setAnimationState] = useState(false);
  const [unusedLetters, setUnusedLetters] = useState(alphabet);
  const fetchWord = async () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setGuessWord(words[randomIndex]);
    /*const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5188ad3201mshe057d86d827e423p1656ecjsn46745597aac0",
        "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
      },
    };
    const response = await fetch(
      "https://random-words5.p.rapidapi.com/getMultipleRandom?count=5",
      options
    );
    const word = await response.json();
    */
  };

  useEffect(() => {
    fetchWord();
  }, []);
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (guesses[guessNumber].length < 5) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
          setGuesses((prev) =>
            prev.map((el, i) => (i !== guessNumber ? el : el + e.key))
          );
        }
      }
      if (e.key === "Backspace" && guesses[guessNumber].length > 0) {
        setGuesses((prev) =>
          prev.map((el, i) => (i !== guessNumber ? el : el.slice(0, -1)))
        );
      }
      if (e.key === "Enter") {
        if (guesses[guessNumber].length === 5) {
          if (words.includes(guesses[guessNumber])) {
            setGuessNumber((prev) => prev + 1);
          } else {
            setAnimationState(true);
            setTimeout(() => {
              setAnimationState(false);
            }, 200);
          }
        }
        if (
          (guessNumber === 5 || guesses[guessNumber] === guessWord) &&
          words.includes(guesses[guessNumber])
        )
          setGameFinished(true);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [guesses, guessNumber]);
  const resetGame = () => {
    setGuesses(["", "", "", "", "", ""]);
    setGuessNumber(0);
    setGameFinished(false);
    fetchWord();
  };

  const removeLetter = (letters) => {
    //deleting letters from state that match correctly guessed letters from guess component
    setUnusedLetters(
      unusedLetters.filter((element) => !letters.includes(element))
    );
  };
  return (
    <div
      className={
        !animationState
          ? `${styles.container}`
          : `${styles.container} ${styles.animation}`
      }
    >
      {guesses.map((el, i) => (
        <Guess
          word={guesses[i]}
          guessWord={guessWord}
          removeLetter={removeLetter}
        />
      ))}

      {gameFinished ? (
        <h2 className={styles.finishMsg}>
          Correct word is {guessWord.toUpperCase()}!
        </h2>
      ) : null}
      {guessNumber !== 0 ? (
        <button className={styles.new_game_btn} onClick={resetGame}>
          New Game
        </button>
      ) : (
        <button className={styles.new_game_btn} disabled>
          New Game
        </button>
      )}
      <UnusedLetters unusedLetters={unusedLetters} />
    </div>
  );
}

export default App;
