import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('Testing Summary form ', () => {
  test('Expext component to be defined', () => {
    const view = render(<SummaryForm />);
    expect(view).toBeDefined();
  });
  test('Should click on the btn then click again', () => {
    const view = render(<SummaryForm />);
    const getCheckbox = screen.getByRole('checkbox', { name: 'I Agree to terms and conditions' });
    expect(getCheckbox).not.toBeChecked();
    userEvent.click(getCheckbox);
    expect(getCheckbox).toBeChecked();
  });
  test('Popover reponse to hover', async () => {
    render(<SummaryForm />);
    // poop over starts hidden
    const nullPopOver = screen.queryByText('No icecream will be delivered');
    expect(nullPopOver).not.toBeInTheDocument();
    // appears upon mouseover
    const termsAndConditions = screen.getByText('terms and conditions');
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText('No icecream will be delivered');
    expect(popover).toBeInTheDocument();
    // disappears when mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => screen.queryByText('No icecream will be delivered'));
  });
});
