import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../test-utils/testing-library-utils';

import { Options } from '../Options';

describe('Test Options', () => {
  test('Display img for each scoop option from server', async () => {
    render(<Options optionType='scoops' />);
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

// fix tests down here

test('Displays image for each toppings option from server', async () => {
  // Mock Service Worker will return three toppings from server
  render(<Options optionType='toppings' />);

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole('img', { name: /topping$/i });
  expect(images).toHaveLength(3);

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping']);
});

test("don't update total if scoops input is invalid", async () => {
  render(<Options optionType='scoops' />);

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  // make sure scoops subtotal hasn't updated
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});
