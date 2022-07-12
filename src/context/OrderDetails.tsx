import { useContext, useState, createContext, useMemo, useEffect } from 'react';
import { PRICE } from '../constants';
import { formatCurrency } from '../utilities';
interface OptionCounts<T> {
  [scoop: string]: T;
}
type Totals = {
  scoops: string;
  toppings: string;
  grandTotal: string;
};

export const OrderDetails = createContext<any>(null);

// create custom hook => check if  we are inside the provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error('userOrder must be within a provider');
  }
  return context;
};

const calculateSubTotal = (optionType: string, optionCounts: OptionCounts<any>) => {
  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * PRICE[optionType];
};

export const OrderDetailsProvider = (props: any) => {
  const [optionCounts, setOptionCounts] = useState<OptionCounts<any>>({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState<Totals>({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubTotal = calculateSubTotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotals({
      grandTotal: formatCurrency(grandTotal),
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName: string, newItemCount: string, optionType: string): void => {
      const newOptionCount = { ...optionCounts };
      // update Option count for this item with new value
      const optionCountMap = newOptionCount[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCount);
    };
    // getting obj contains option count and subtotals and totals
    // setter:update option counts

    function resetOrder() {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
