import React from 'react';
import { Options } from './Options';

export const OrderEntry = () => {
  return (
    <>
      <div>
        <Options optionsType='scoops' />
      </div>
      <div>
        <Options optionsType='toppings' />
      </div>
    </>
  );
};
