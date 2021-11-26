import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

const popover = (
  <Popover id='popover-basic'>
    <Popover.Body>No icecream will be delivered</Popover.Body>
  </Popover>
);

export const SummaryForm = () => {
  const [checkBoxState, setCheckBox] = useState(false);
  const [btnState, setBtn] = useState(true);

  const handleCheckBoxClick = () => {
    checkBoxState === true ? setBtn(true) : setBtn(false);
    setCheckBox(!checkBoxState);
  };
  const checkBoxLabel = (
    <>
      <span>I Agree to</span>
      <OverlayTrigger placement='right' overlay={popover}>
        <span>terms and conditions</span>
      </OverlayTrigger>
    </>
  );

  return (
    <Form>
      <Form.Group>
        <Form.Check
          inline
          label={checkBoxLabel}
          name='checkThis'
          type='checkbox'
          id='inline-checkbox-1'
          onChange={handleCheckBoxClick}
          checked={checkBoxState}
        />
      </Form.Group>

      <Button
        variant='primary'
        disabled={btnState}
        onClick={() => {
          console.log('HERE');
        }}
      >
        Click HERE !
      </Button>
    </Form>
  );
};
