import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import ScoopOptions from './ScoopOptions';
import ts from 'typescript';
type Props = {
  optionsType: string;
};
interface Res {
  name: string;
  imagePath: string;
}

export const Options = ({ optionsType }: Props) => {
  const [items, setItems]: [Res[], (response: Res[]) => void] = useState<Res[]>([]);

  useEffect(() => {
    axios
      .get<Res[], Res[]>(`http://localhost:3030/${optionsType}`)

      .then((response) => setItems(response))
      .catch((err) => console.log(err));
  }, [optionsType]);

  return (
    <>
      {optionsType === 'scoops'
        ? items.map((item, index) => {
            <ScoopOptions key={item.name} name={item.name} imagePath={item.imagePath} />;
          })
        : null}
    </>
  );
};
