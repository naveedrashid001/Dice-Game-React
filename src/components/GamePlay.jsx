import styled from "styled-components";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import RoleDice from "./RoleDice";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
  const [currentDice, setCurrentDice] = useState(1);  // Dice starts at 1
  const [score, setScore] = useState(0);  // Maintain the score
  const [showRules, setShowRules] = useState(false);  // Control the visibility of rules
  const [selectedNumber, setSelectedNumber] = useState();  // No number selected initially
  const [error, setError] = useState("");  // Error state for when the user doesn't select a number
  const [hasRolled, setHasRolled] = useState(false);  // Track whether the dice has been rolled

  const roleDice = () => {
    // Show error if no number is selected
    if (!selectedNumber) {
      setError("Please select a number first!");  
      return;
    }

    // Roll the dice only if it hasn't been rolled yet
    if (!hasRolled) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setCurrentDice(randomNumber);

      if (randomNumber === selectedNumber) {
        setScore((prev) => prev + selectedNumber + 2);  // Add to the score if guessed correctly
        setSelectedNumber(undefined);
      } else {
        setScore((prev) => prev  - 2);  // Subtract from the score if guessed incorrectly
        setSelectedNumber(undefined);
      }

      setHasRolled(true);  // Prevent further rolls until a new number is selected
      setError("");  // Clear the error after a successful roll
    }
  };

  const resetScore = () => {
    setScore(0);
    setHasRolled(false);  // Allow rolling again after resetting
    setSelectedNumber(undefined);  // Clear selected number
    setError("");  // Clear any existing error
  };

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          selectedNumber={selectedNumber}
          setSelectedNumber={(num) => {
            setSelectedNumber(num);
            setHasRolled(false);  // Reset the hasRolled flag to allow rolling again
            setError("");  // Clear any error when a number is selected
          }}
          error={error}  // Pass error state to NumberSelector
          setError={setError}  // Pass setError function to NumberSelector
        />
      </div>
      <RoleDice roleDice={roleDice} currentDice={currentDice} />
      <div className="btns">
        <OutlineButton onClick={resetScore}>Reset Score</OutlineButton>
        <Button onClick={() => setShowRules(!showRules)}>
          {showRules ? "Hide" : "Show"} Rules
        </Button>
      </div>
      {showRules && <Rules />}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 70px;
  margin-bottom: 40px;
  .top_section {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }
  .btns {
    margin-top: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
