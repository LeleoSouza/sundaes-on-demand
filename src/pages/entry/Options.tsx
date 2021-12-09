import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import { Row } from 'react-bootstrap';
import { Toppings } from './Toppings';
import { AlertBanner } from '../common/AlertBanner';

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
  useEffect(() => {
    axios
      .get<Res[], Res[]>(`http://localhost:3030/${optionsType}`)
      //   @ts-ignore
      .then((response) => setItems(response.data))
      .catch((err) => setError(true));
  }, [optionsType]);

  if (error) {
    return <AlertBanner message='' variant='' />;
  }
  return (
    <div>
      <Row>
        {optionsType === 'scoops'
          ? items.map((item, index) => {
              return <ScoopOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
            })
          : items.map((item, index) => {
              return <Toppings key={item.name} name={item.name} imagePath={item.imagePath} />;
            })}
      </Row>
    </div>
  );
};
