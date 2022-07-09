import styles from "./Guess.module.css";
import { useEffect, useState } from "react";
import { words } from "../words/words";
const Guess = (props) => {
  const word = props.word;
  const guessWord = props.guessWord;
  const [styleState, setStyleState] = useState([]);
  const styleFunction = () => {
    let style = [null, null, null, null, null];
    if (word.length === 5) {
      for (let i = 0; i < 5; i++) {
        if (word[i] === guessWord[i]) {
          style[i] = styles.true;
        } else if (guessWord.includes(word[i])) {
          style[i] = styles.exists;
        } else {
          style[i] = styles.false;
        }
      }
      setStyleState(style);
    }
  };
  useEffect(() => {
    setStyleState([null, null, null, null, null]);
  }, [props.guessWord]);
  useEffect(() => {
    const styleListener = (e) => {
      if (e.key === "Enter" && words.includes(word)) styleFunction();
    };
    window.addEventListener("keydown", styleListener);
    return () => window.removeEventListener("keydown", styleListener);
  }, [word]);

  return (
    <div className={styles.container}>
      <div className={`${styles.letter} ${styleState[0]}`}>
        {word[0] ? word[0] : ""}
      </div>
      <div className={`${styles.letter} ${styleState[1]}`}>
        {word[1] ? word[1] : ""}
      </div>
      <div className={`${styles.letter} ${styleState[2]}`}>
        {word[2] ? word[2] : ""}
      </div>
      <div className={`${styles.letter} ${styleState[3]}`}>
        {word[3] ? word[3] : ""}
      </div>
      <div className={`${styles.letter} ${styleState[4]}`}>
        {word[4] ? word[4] : ""}
      </div>
    </div>
  );
};
export default Guess;
