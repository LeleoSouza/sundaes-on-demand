import React from 'react';
import { Options } from './Options';

export const OrderEntry = () => {
  return (
    <>
      <div>
        <Options optionType='scoops' />
      </div>
      <div>
        <Options optionType='toppings' />
      </div>
    </>
  );
};
