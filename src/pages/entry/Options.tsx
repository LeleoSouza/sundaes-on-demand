import axios from 'axios';
import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import { Row } from 'react-bootstrap';

type Props = {
  optionsType: string;
};
interface Res {
  name: string;
  imagePath: string;
}

export const Options = ({ optionsType }: Props) => {
  const [items, setItems] = useState<Res[]>([]);
  useEffect(() => {
    axios
      .get<Res[], Res[]>(`http://localhost:3030/${optionsType}`)
      //   @ts-ignore
      .then((response) => setItems(response.data))
      .catch((err) => console.log(err));
  }, [optionsType]);

  return (
    <div>
      <Row>
        {optionsType === 'scoops'
          ? items.map((item, index) => {
              return <ScoopOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
            })
          : null}
      </Row>
    </div>
  );
};
