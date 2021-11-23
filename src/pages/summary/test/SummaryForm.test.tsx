import { render, screen, fireEvent } from '@testing-library/react';
import { SummaryForm } from '../SummaryForm';

test('form checkbox', () => {
  const view = render(<SummaryForm />);
  const getCheckbox = screen.getByRole('checkbox', { name: 'Testing Checkbox' });
  expect(view).toBeDefined();
  expect(getCheckbox).not.toBeChecked();
  fireEvent.click(getCheckbox);
  expect(getCheckbox).toBeChecked();
});
