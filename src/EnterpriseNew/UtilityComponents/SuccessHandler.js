import React, { useState } from 'react';
import { Alert } from 'antd';

const Success = (props) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && props.success ? (
        <Alert style={{fontSize:'28px'}} message={props.success} type="success" closable afterClose={handleClose} />
      ) : null}
    </>
  );
};
export default Success;