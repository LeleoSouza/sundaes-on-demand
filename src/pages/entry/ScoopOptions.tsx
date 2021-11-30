import { Col, Image } from 'react-bootstrap';

type Props = {
  name: string;
  imagePath: string;
};
const ScoopOptions = ({ name, imagePath }: Props) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img style={{ width: '75%' }} src={`http://localhost:3030${imagePath}`} alt={`${name} scoop`} />
    </Col>
  );
};
export default ScoopOptions;
