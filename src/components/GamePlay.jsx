import styled from "styled-components";
import NumberSelector from "./NumberSelector";
import TotalScore from "./TotalScore";
import RoleDice from "./RoleDice";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rules from "./Rules";

const GamePlay = () => {
  const [currentDice, setCurrentDice] = useState(1);
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const roleDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
    setCurrentDice(randomNumber);
  };

   const resetScore = () => {
    setScore(0);
  };

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector />
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
