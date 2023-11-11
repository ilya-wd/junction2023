import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SensorFusionProvider, { useSensorFusion } from './expo-sensor-fusion.js';

const PathIntegratorContext = React
  .createContext(
    null,
  );

const PathIntegratorProvider = ({ children, ...extraProps }) => {
  const { sampleInterval } = extraProps;
  const [ velocity ] = useState([0, 0, 0]);
  const [ position ] = useState([0, 0, 0]);
  const [ value, setValue ] = useState({ velocity, position,});
  const { ahrs, accl } = useSensorFusion(extraProps);

  useEffect(
    () => {
      const attitude = ahrs.getQuaternion();

      const hpr = ([a1, b1, c1, d1], [a2, b2, c2, d2]) => {
        return [
          a1*a2 - b1*b2 - c1*c2 - d1*d2,
          a1*b2 + b1*a2 + c1*d2 - d1*c2,
          a1*c2 - b1*d2 + c1*a2 + d1*b2,
          a1*d2 + b1*c2 - c1*b2 + d1*a2, 
        ]
      }

      const att_q = [attitude.w, -attitude.x, -attitude.y, -attitude.z]
      const att_pr_q = [attitude.w, attitude.x, attitude.y, attitude.z]
      const acc_q = [0, ...accl]

      const accl_rot = hpr(att_pr_q, hpr(acc_q, att_q)).map(_ => _*9.8)
      accl_rot[3] = accl_rot[3] - 9.8

      velocity = velocity.map((val, i) => val + accl_rot[i + 1] * (1000 / sampleInterval) )

      setValue({velocity, position})
    },
    [ahrs, accl],
  );
  return (
    <PathIntegratorContext.Provider
      value={value}
      children={children}
    />
  );
};

PathIntegratorProvider.propTypes = {
  sampleInterval: PropTypes.number,
  algorithm: PropTypes.string,
  beta: PropTypes.number,
  kp: PropTypes.number,
  ki: PropTypes.number,
  doInitialization: PropTypes.bool,
};

PathIntegratorProvider.defaultProps = {
  sampleInterval: 50,
  algorithm: 'Madgwick',
  beta: 0.4,
  kp: 0.5,
  ki: 0,
  doInitialization: true,
};

export const usePathIntegrator = () => useContext(PathIntegratorContext);

export default PathIntegratorProvider;
