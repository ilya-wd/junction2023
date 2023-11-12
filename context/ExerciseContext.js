import React, { useContext, useEffect, useRef, useState } from 'react';
import { SVD } from 'svd-js'
import { usePosition } from './PositionContext.js';

const ExerciseContext = React.createContext();

const backlogLen = 20;
const acclLogLen = 5;

const transpose = (m) => {
  const numRows = m.length;
  const numCols = m[0].length;

  console.log(numRows)
  console.log(numCols)

  const transposedM = [];

  for (let j = 0; j < numCols; j++) {
    const newRow = [];
    for (let i = 0; i < numRows; i++) {
      newRow.push(m[i][j]);
    }
    transposedM.push(newRow);
  }

  return transposedM;
}

const argmin = (array) => {
  if (array.length === 0) {
    return -1;
  }

  let minValue = array[0];
  let minIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
      minIndex = i;
    }
  }

  return minIndex;
}


const detectArmSwings = (points) => {

  centroid = points.reduce((a, p) => a.map((v, i) => v + p[i]), [1, 0, 0]).map(_ => _ / points.length)

  const {u, q, v} = SVD(  points.map((p) => p.map((v, i) => v - centroid[i]) ) );
  const minEigen = argmin(q)

  const norm = Math.sqrt( v[minEigen].reduce((a, v) => a + v**2, 0) )
  const normal = v[minEigen].map(_ => _ / norm)

  return false;
}

const detectMotion = (points) => {
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]

  points.forEach((p) => p.forEach( (v, i) => {
    if(v < min[i]) min[i] = v
    if(v > max[i]) max[i] = v
  } ));

  const diff = Math.sqrt( max.map( (v, i) => v - min[i] ).reduce((a, v) => a + v**2, 0) )

  console.log(diff)
}

const detectByAccl = (acclLog) => {
  const s = acclLog.reduce( (a, acc) => a.map( (v, i) => v + Math.abs(acc[i]) ), [0, 0, 0]).reduce((a, v) => a + v, 0) / backlogLen
  //console.log(s)
  return {detected: s > 20, s};
}

const ExerciseProvider = ({ children}) => {
  const { position, acclUnb } = usePosition();
  const positionLog = useRef([])
  const acclLog = useRef([])
  const acclDetectionLog = useRef([])
  const [ exercising, setExercising ] = useState(false)
  const [ sval, setSval ] = useState(0)

  useEffect(
    () => {
      /*positionLog.current.push(position)
      if(positionLog.current.length > backlogLen) {
        positionLog.current.shift()
        const armSwings = detectArmSwings(positionLog.current)
        detectMotion(positionLog.current)
        setExercising(armSwings);
      } else {
        setExercising(false);
      }*/

      acclLog.current.push(acclUnb)
      if(acclLog.current.length > backlogLen) {
        acclLog.current.shift()
        const {detected, s} = detectByAccl(acclLog.current)
        
        acclDetectionLog.current.push(detected)
        if(acclDetectionLog.current.length > acclLogLen) {
          acclDetectionLog.current.shift()
          const trueCount = acclDetectionLog.current.filter(value => value).length;

          if(trueCount > acclDetectionLog.current.length / 2) {
            setExercising(true)
            setSval((ps) => ps + s)
          } else {
            setExercising(false)
          }
        }
      }
    },
    [acclUnb],
  );

  const resetSval = () => {setSval(0)}

  return (
    <ExerciseContext.Provider
      value={{ exercising, sval, resetSval }}
      children={children}
    />
  );
};

export const useExercise = () => useContext(ExerciseContext);

export default ExerciseProvider;
