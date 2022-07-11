import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import { Row } from 'react-bootstrap';
import { Toppings } from './Toppings';
import { AlertBanner } from '../common/AlertBanner';
import { PRICE } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';

type Props = {
  optionsType: string;
};
interface Res {
  name: string;
  imagePath: string;
}

export const Options = ({ optionsType }: Props) => {
  const [items, setItems] = useState<Res[]>([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get<Res[], Res[]>(`http://localhost:3030/${optionsType}`)
      // @ts-ignore
      .then((response) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionsType]);

  if (error) {
    return <AlertBanner message='' variant='' />;
  }
  const title = optionsType[0].toUpperCase() + optionsType.slice(1).toLocaleLowerCase();
  return (
    <div>
      <h2>{title}</h2>
      <p>{PRICE[optionsType]} each.</p>
      {/* @ts-ignore */}
      {/* <p>{orderDetails?.totals[optionsType]}</p> */}
      <Row>
        {optionsType === 'scoops'
          ? items.map((item, index) => {
              return (
                <ScoopOptions
                  key={item.name}
                  name={item.name}
                  imagePath={item.imagePath}
                  updateItemCount={(itemName: string, newItemCount: string) => {
                    console.log('here', { itemName, newItemCount });
                    updateItemCount(itemName, newItemCount, optionsType);
                  }}
                />
              );
            })
          : items.map((item, index) => {
              return <Toppings key={item.name} name={item.name} imagePath={item.imagePath} />;
            })}
      </Row>
    </div>
  );
};
