import styles from "./UnusedLetters.module.css";
const UnusedLetters = (props) => {
  return (
    <div className={styles.container}>
      {props.unusedLetters.map((element, i) => (
        <h2 className={styles.letter} key={element}>
          {element}
        </h2>
      ))}
    </div>
  );
};

export default UnusedLetters;
