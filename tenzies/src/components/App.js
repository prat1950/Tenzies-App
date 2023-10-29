import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Die from './Die';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import { useMediaQuery } from 'react-responsive';
import React from 'react';
import Button from 'react-bootstrap/Button';
import {nanoid} from 'nanoid';

export default function App() {
  const containerStyle = {
    width: '90%',
    height: '85%',
  };

  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    return Array.from({ length: 10 }, () => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false
    }));
}


  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Generate the dice elements
  const diceElements = dice.map((die, index) => <Die key={index} value={die.value}  />);

  // Calculate number of columns based on screen size
  const numColumns = isSmallScreen ? 2 : 5;

  // Generate rows dynamically based on the number of columns
  const rows = [];
  for (let i = 0; i < diceElements.length; i += numColumns) {
    rows.push(diceElements.slice(i, i + numColumns));
  }

  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <div className="surround mx-auto bg-custom-darkblue text-white vh-100 d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
      <Container className="bg-white p-4 rounded text-black" style={containerStyle}>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} className={`mx-auto g-3 ${isSmallScreen ? 'flex' : 'align-items-center'} ${rowIndex % 2 === 0 ? 'row_centered_1' : 'row_centered_2'}`}>
            {row.map((col, colIndex) => (
              <Col key={colIndex} md={2} xs={6} className="col" >
                {col}
              </Col>
            ))}
          </Row>
        ))}
        <Button className="button mx-auto mt-5" onClick={rollDice}>
          Roll Dice
        </Button>
      </Container>
    </div>
  );
}
