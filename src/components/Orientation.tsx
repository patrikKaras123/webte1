import React from 'react';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';

const OrientationInfo = (): React.ReactElement => {
  const { orientation, requestAccess,  revokeAccess, error } = useDeviceOrientation();
  console.log("orientatio",orientation);

  const orientationInfo = orientation && (
    <ul>
      <p>"ASDADASD"</p>
      <li>ɑ: <code>{orientation.alpha}</code></li>
      <li>β: <code>{orientation.beta}</code></li>
      <li>γ: <code>{orientation.gamma}</code></li>
    </ul>
  );

  const errorElement = error ? (
    <div className="error">{error.message}</div>
  ) : null;

  return (
    <>
      {orientationInfo}
      {errorElement}
    </>
  );
};

export default OrientationInfo;