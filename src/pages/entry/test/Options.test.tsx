import { render, screen } from '@testing-library/react';
import { Options } from '../Options';

describe('Test Options', () => {
  test('Display img for each scoop option from server', async () => {
    render(<Options optionsType='scoops' />);
    const scoopImgs = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImgs).toHaveLength(2);
    // confirm alt text
    const altText = scoopImgs.map((element) => {
      // @ts-ignore
      return element.alt;
    });
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });
});
