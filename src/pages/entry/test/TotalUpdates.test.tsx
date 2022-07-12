import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Options } from '../Options';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
describe('Total updates test', () => {
  test('should Update scoop total when scoop changes', async () => {
    render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });
    //   Make sure totoal starts out @ $0.00
    const scoopSubTotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopSubTotal).toHaveTextContent('0.00');

    //   update vanilla scoop to 1 and check input
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    // make sure there is not input before
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopSubTotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check output
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopSubTotal).toHaveTextContent('6.00');
  });
});
