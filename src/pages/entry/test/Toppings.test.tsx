import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

describe('Should test the component toppings', () => {
  test('Should display img for each scoop option from server ', async () => {
    render(<Options optionsType='toppings' />);
    // get all alt that contains toppings
    const toppings = await screen.findAllByRole('img', { name: /toppings$/i });
    expect(toppings).toHaveLength(3);

    const getAltText = toppings.map((element) => {
      // @ts-ignore
      return element.alt;
    });
    expect(getAltText).toEqual(['M&Ms toppings', 'Hot fudge toppings', 'Peanut butter cups toppings']);
  });
});
