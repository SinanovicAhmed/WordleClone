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
          console.log(guesses[guessNumber]);
          if (words.includes(guesses[guessNumber])) {
            setGuessNumber((prev) => prev + 1);
          } else {
            console.log("Wrong word");
          }
        }
        if (guessNumber === 5 || guesses[guessNumber] === guessWord)
          setGameFinished(true);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [guesses, guessNumber]);

  return (
    <div className={styles.container}>
      {guesses.map((el, i) => (
        <Guess word={guesses[i]} guessWord={guessWord} />
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
