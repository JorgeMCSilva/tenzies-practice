import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";

export default function Board() {
  const initDiceBoard = () => {
    const initialDice = [];
    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line react-hooks/purity
      initialDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
    }

    return initialDice;
  };

  const rollButtonRef = useRef<HTMLButtonElement>(null);

  const [dice, setDice] = useState<{ value: number; isHeld: boolean }[]>(() => {
    return initDiceBoard();
  });

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      rollButtonRef.current?.focus();
    }
  }, [gameWon]);

  const rollDice = () => {
    if (gameWon) {
      setDice(initDiceBoard());
      return;
    }
    const newDice = [...dice];
    for (let i = 0; i < dice.length; i++) {
      newDice[i] = newDice[i].isHeld
        ? newDice[i]
        : // eslint-disable-next-line react-hooks/purity
          { value: Math.floor(Math.random() * 6) + 1, isHeld: false };
    }

    setDice(newDice);
  };

  const holdDice = (index: number) => {
    const newDice = [...dice];
    newDice[index].isHeld = !dice[index].isHeld;

    setDice(newDice);
  };

  const renderDice = () => {
    return dice.map((die, index) => (
      <button
        aria-label={"Die has the value of " + die.value}
        aria-pressed={die.isHeld}
        className={die.isHeld ? "die hold" : "die"}
        key={index}
        onClick={() => holdDice(index)}
      >
        {die.value}
      </button>
    ));
  };

  return (
    <>
      <div className="board">
        <div className="dice-container">{renderDice()}</div>

        <button
          ref={rollButtonRef}
          aria-label={gameWon ? "New Game" : "Roll"}
          className="roll-button"
          onClick={() => rollDice()}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
        {gameWon && <Confetti />}
        <div className="aria-live" aria-live="polite">
          {gameWon && "You won! Press the button to play again."}
        </div>
      </div>
    </>
  );
}
