import { OrderDetailsProvider } from '../context/OrderDetails';
import { render } from '@testing-library/react';

const renderWithContext = (ui: any, options?: any) => {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
};
// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
