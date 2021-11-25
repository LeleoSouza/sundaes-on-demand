import { render, screen } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';
import userEvent from '@testing-library/user-event';

describe('Testing Summary form ', () => {
  test('Expext component to be defined', () => {
    const view = render(<SummaryForm />);
    expect(view).toBeDefined();
  });
  test('Should click on the btn then click again', () => {
    const view = render(<SummaryForm />);
    const getCheckbox = screen.getByRole('checkbox', { name: 'I Agree to the terms and conditions...' });
    expect(getCheckbox).not.toBeChecked();
    userEvent.click(getCheckbox);
    expect(getCheckbox).toBeChecked();
  });
});
