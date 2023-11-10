import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SensorFusionProvider, { useSensorFusion } from './expo-sensor-fusion.js';

const PathIntegratorContext = React
  .createContext(
    null,
  );

const PathIntegratorProvider = ({ children, ...extraProps }) => {
  const { sampleInterval } = extraProps;
  const [velocity, setVelocity] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);
  const get = [ velocity, position ];
  const [ value, setValue ] = useState(
    {
        velocity, position,
    },
  );
  const { ahrs, accl } = useSensorFusion(extraProps);

  useEffect(
    () => {
      const subscriptions = sensors
        .map(
          (sensor, i) => sensor.addListener(({ x, y, z }) => {
            [ x, y, z ]
              .map(
                (e, j) => get[i][j] = filters[i][j].filter(e),
              );
            ahrs.update(
              ...get[0],
              ...get[1],
              ...get[2],
            );
            if (i === sensors.length - 1) {
              setValue(
                {
                  ahrs,
                  gyro,
                  accl,
                  comp,
                },
              );
            }
          })
        );
      return () => subscriptions
        .map(({ remove }) => remove());
    },
    [],
  );
  return (
    <SensorFusionContext.Provider
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
