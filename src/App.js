import { useState, useEffect } from "react";
import Guess from "./components/guess/Guess.js";
import styles from "./App.module.css";
import { words } from "./components/words/words";
function App() {
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [guessWord, setGuessWord] = useState("rhino");
  const [guessNumber, setGuessNumber] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
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
  const changeGameState = () => {
    setGameFinished(true);
  };

  let wordLength = 0;
  let guessNm = guessNumber;
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (wordLength < 5) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
          setGuesses((prev) =>
            prev.map((el, i) => (i !== guessNm ? el : el + e.key))
          );
          wordLength++;
        }
      }
      if (e.key === "Backspace" && wordLength > 0) {
        setGuesses((prev) =>
          prev.map((el, i) => (i !== guessNm ? el : el.slice(0, -1)))
        );
        wordLength--;
      }
      if (e.key === "Enter" && wordLength === 5) {
        if (guessNm < 6) {
          guessNm++;
          setGuessNumber(guessNm);
        }
        wordLength = 0;
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    fetchWord();
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
  useEffect(() => {
    if (guessNumber === 6) {
      setGameFinished(true);
    }
  }, [guessNumber]);

  return (
    <div className={styles.container}>
      {guesses.map((el, i) => (
        <Guess
          word={guesses[i]}
          guessWord={guessWord}
          changeGameState={changeGameState}
        />
      ))}

      {gameFinished ? (
        <h2 className={styles.finishMsg}>
          Correct word is {guessWord.toUpperCase()}!
        </h2>
      ) : null}
    </div>
  );
}

export default App;
