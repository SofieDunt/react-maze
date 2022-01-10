import React, { useState } from 'react';
import styled from 'styled-components';
import { InlineDisplay, InlineHeader } from '../theme';
import {
  BANNER_COLOR,
  BORDER_COLOR,
  FINISH_COLOR,
  STANDARD_COLOR,
  START_COLOR,
  TEXT_COLOR,
} from '../../theme';
import { GetMazeDto, MazeDto } from '../../api/dto';
import ApiClient, { PromiseRejectReason } from '../../api/apiClient';

const Input = styled.input`
  width: 50px;
  height: 20px;
  margin-left: 5px;
  color: ${TEXT_COLOR};
  border-bottom: solid 2px ${BORDER_COLOR};
  font-family: Caveat, Nunito Sans, sans-serif;
  font-size: 25px;
  padding: 3px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled.button`
  z-index: 9;
  border: 2px solid ${BORDER_COLOR};
  background: ${START_COLOR};
  color: ${BANNER_COLOR};
  font-family: Nunito Sans, sans-serif;
  padding: 5px;
  font-size: 15px;
  &:hover {
    background: ${FINISH_COLOR};
    border: 2px solid ${STANDARD_COLOR};
  }
`;

interface FormProps {
  readonly setMaze: (maze: MazeDto) => void;
}

const MakeMazeForm: React.FC<FormProps> = ({ setMaze }) => {
  const [xDimInput, setXDimInput] = useState(5);
  const [yDimInput, setYDimInput] = useState(5);
  const [biasInput, setBiasInput] = useState(0);

  const onSubmit = () => {
    if (
      Number.isInteger(xDimInput) &&
      xDimInput > 0 &&
      Number.isInteger(yDimInput) &&
      yDimInput > 0 &&
      Number.isInteger(biasInput)
    ) {
      ApiClient.getMaze(new GetMazeDto(xDimInput, yDimInput, biasInput))
        .then((maze) => {
          setMaze(maze);
        })
        .catch((reason: PromiseRejectReason) => {
          window.alert(reason.message);
        });
    } else {
      window.alert('Invalid Inputs' + xDimInput + yDimInput + biasInput);
    }
  };

  const validateNumber = (
    val: string,
    callback: (num: number) => void,
  ): void => {
    const num = Number(val);
    if (Number.isInteger(num)) {
      callback(num);
    }
  };

  return (
    <>
      <InlineDisplay>
        <InlineHeader>Rows:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setYDimInput)}
          value={yDimInput}
        />
      </InlineDisplay>
      <InlineDisplay>
        <InlineHeader>Columns:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setXDimInput)}
          value={xDimInput}
        />
      </InlineDisplay>
      <InlineDisplay>
        <InlineHeader>Bias:</InlineHeader>
        <Input
          type={'text'}
          onChange={(e) => validateNumber(e.currentTarget.value, setBiasInput)}
          value={biasInput}
        />
      </InlineDisplay>
      <Button onClick={onSubmit}>Make New Maze</Button>
    </>
  );
};

export default MakeMazeForm;
