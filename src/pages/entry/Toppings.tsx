import React from 'react';
import { Col } from 'react-bootstrap';

type Props = {
  name: string;
  imagePath: string;
};
export const Toppings = ({ imagePath, name }: Props) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img style={{ width: '75%' }} src={`http://localhost:3030${imagePath}`} alt={`${name} toppings`} />
    </Col>
  );
};
