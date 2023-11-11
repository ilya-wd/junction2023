import React, { useContext, useEffect, useState } from 'react';
import { useSensorFusion } from './expo-sensor-fusion.js';

const g = 9.8
const bias_period = 40;

const hpr = ([a1, b1, c1, d1], [a2, b2, c2, d2]) => {
  return [
    a1*a2 - b1*b2 - c1*c2 - d1*d2,
    a1*b2 + b1*a2 + c1*d2 - d1*c2,
    a1*c2 - b1*d2 + c1*a2 + d1*b2,
    a1*d2 + b1*c2 - c1*b2 + d1*a2, 
  ]
}

const PositionContext = React.createContext();

const PositionProvider = ({ children}) => {
  const [ lastUpdate, setLastUpdate ] = useState(0);
  const [ accBias, setAccBias ] = useState([0, 0, 0, 0]);
  const [ biasCounter, setBiasCounter ] = useState(0);
  const [ velocity, setVelocity ] = useState([0, 0, 0]);
  const [ position, setPosition ] = useState([0, 0, 0]);
  const [ acclUnb, setAcclUnb ] = useState([0, 0, 0]);
  const sensorFusion = useSensorFusion();

  useEffect(
    () => {
      const {ahrs, accl} = sensorFusion

      const currentTime = Date.now()
      const elapsedTime = currentTime - lastUpdate
      const dt = (elapsedTime / 1000)
      setLastUpdate(currentTime)
      
      const attitude = ahrs.getQuaternion();
    
      const attQ = [attitude.w, -attitude.x, -attitude.y, -attitude.z]
      const attPrQ = [attitude.w, attitude.x, attitude.y, attitude.z]
      const accQ = [0, ...accl]
    
      const acclRotQ = hpr(attPrQ, hpr(accQ, attQ)).map(_ => _*g)
    
      if(biasCounter < bias_period) {
        setAccBias(accBias.map((v, i) => v + acclRotQ[i]));
        setBiasCounter(_ => _ + 1);
        if(biasCounter == (bias_period - 1)) {
          setAccBias(accBias.map(_ => _ / bias_period));
        }
      } else {
        const acclUnbQ = acclRotQ.map((val, i) => val - accBias[i])
        acclUnbQ.shift()

        setAcclUnb( acclUnbQ )
        setPosition( position.map((v, i) => v + velocity[i] * dt + 0.5*acclUnbQ[i] * (dt**2)) );
        setVelocity( velocity.map((v, i) => v + acclUnbQ[i] *  dt) );
      }
    },
    [sensorFusion],
  );
  return (
    <PositionContext.Provider
      value={{ position, velocity, acclUnb }}
      children={children}
    />
  );
};

export const usePosition = () => useContext(PositionContext);

export default PositionProvider;
