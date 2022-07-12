import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import { Row } from 'react-bootstrap';
import { ToppingOption } from './ToppingOption';
import { AlertBanner } from '../common/AlertBanner';
import { PRICE } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';

interface Res {
  name: string;
  imagePath: string;
}
type Props = {
  optionType: string;
};

export const Options = ({ optionType }: Props) => {
  const [items, setItems] = useState<Res[]>([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get<Res[], Res[]>(`http://localhost:3030/${optionType}`)
      // @ts-ignore
      .then((response) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner message={''} variant={''} />;
  }
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};
