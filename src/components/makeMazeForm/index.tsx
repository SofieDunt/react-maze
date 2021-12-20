import React, {useState} from "react";
import styled from "styled-components";
import {InlineDisplay, InlineHeader} from "../utilComponents";
import {MazeConstructorImpl} from "../../logic/mazeConstructor";
import {SetAppProps} from "../../App";

const Input = styled.input`
  width: 50px;
`;

interface FormProps {
  readonly setter: SetAppProps;
}

const MakeMazeForm: React.FC<FormProps> = ({ setter }) => {
  const [xDimInput, setXDimInput] = useState(5);
  const [yDimInput, setYDimInput] = useState(5);
  const [biasInput, setBiasInput] = useState(0);

  const onSubmit = () => {
    if (Number.isInteger(xDimInput) && xDimInput > 0
        && Number.isInteger(yDimInput) && yDimInput > 0
        && Number.isInteger(biasInput)) {
      setter.setMaze(new MazeConstructorImpl(xDimInput, yDimInput, biasInput).construct());
      setter.setXDim(xDimInput);
      setter.setYDim(yDimInput);
      setter.setBias(biasInput);
    } else {
      window.alert('Invalid Inputs' + xDimInput + yDimInput + biasInput);
    }
  }

  return (
      <>
        <InlineDisplay>
          <InlineHeader>Rows:</InlineHeader>
          <Input type={"number"} onChange={(e) => setYDimInput(Number(e.currentTarget.value))} value={yDimInput} />
        </InlineDisplay>
        <InlineDisplay>
          <InlineHeader>Columns:</InlineHeader>
          <Input type={"number"} onChange={(e) => setXDimInput(Number(e.currentTarget.value))} value={xDimInput} />
        </InlineDisplay>
        <InlineDisplay>
          <InlineHeader>Bias:</InlineHeader>
          <Input type={"number"} onChange={(e) => setBiasInput(Number(e.currentTarget.value))} value={biasInput} />
        </InlineDisplay>
        <button onClick={onSubmit}>Make New Maze</button>
      </>
  );
}

export default MakeMazeForm;
