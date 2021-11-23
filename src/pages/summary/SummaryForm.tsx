import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SummaryForm = () => {
  const [checkBoxState, setCheckBox] = useState(false);
  const [btnState, setBtn] = useState(true);

  const handleCheckBoxClick = () => {
    checkBoxState === true ? setBtn(true) : setBtn(false);
    setCheckBox(!checkBoxState);
  };

  return (
    <>
      <Button
        variant='primary'
        disabled={btnState}
        onClick={() => {
          console.log('HERE');
        }}
      >
        Click HERE !
      </Button>
      <Form.Check
        inline
        label='Testing Checkbox'
        name='checkThis'
        type='checkbox'
        id='inline-checkbox-1'
        onChange={handleCheckBoxClick}
        checked={checkBoxState}
      />
    </>
  );
};
