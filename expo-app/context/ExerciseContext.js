import React, { useContext, useEffect, useRef, useState } from 'react';
import { usePosition } from './PositionContext.js';

const ExerciseContext = React.createContext();

const backlogLen = 50;

const ExerciseProvider = ({ children}) => {
  const position = usePosition();
  const positionLog = useRef([])
  const [ exercising, setExercising ] = useState(false)

  useEffect(
    () => {
      positionLog.current.push(position)
      if(positionLog.current.length > backlogLen) {
        positionLog.current.shift()
        setExercising(true)
      } else {
        setExercising(false)
      }

      // here we use Alisher's code
      
    },
    [position],
  );
  return (
    <ExerciseContext.Provider
      value={{ exercising }}
      children={children}
    />
  );
};

export const useExercise = () => useContext(ExerciseContext);

export default ExerciseProvider;
