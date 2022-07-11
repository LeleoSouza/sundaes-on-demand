import { useContext, useState, createContext, useMemo, useEffect } from 'react';
import { PRICE } from '../constants';

type ParamUpdateCount = {
  itemName: string;
  newItemCount: any;
  optionType: any;
};
interface OptionCounts<T> {
  [scoop: string]: T;
}
type Totals = {
  scoops: number;
  toppings: number;
  grandTotal: number;
};
const OrderDetails = createContext<any>([]);

// create custom hook => check if  we are inside the provider
export const UserOrderDetails = (): [] => {
  const context = useContext<any>(OrderDetails);
  if (!context) {
    throw new Error('userOrder must be within a provider');
  }
  return context;
};

const calculateSubTotal = (optionType: string, optionCounts: any) => {
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
  const [totals, setTotals] = useState<Totals>({ scoops: 0, toppings: 0, grandTotal: 0 });

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal('scoops', optionCounts);
    const toppingsSubTotal = calculateSubTotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotals({
      grandTotal,
      scoops: scoopsSubTotal,
      toppings: toppingsSubTotal,
    });
  }, [optionCounts]);

  const value = useMemo((): [object, any] => {
    const updateItemCount = ({ itemName, newItemCount, optionType }: ParamUpdateCount): void => {
      const newOptionCount: any = { ...optionCounts };
      // update Option count for this item with new value

      const optionCountMap = newOptionCount[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCount);
    };
    // getting obj contains option count and subtotals and totals
    // setter:update option counts
    return [{ ...optionCounts, totals }, updateItemCount] as [
      { scoops: string; toppings: string; totals: object },
      () => void
    ];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
