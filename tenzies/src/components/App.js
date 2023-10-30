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
import Confetti from 'react-confetti'

export default function App() {
  const containerStyle = {
    width: '90%',
    height: '85%',
  };

  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [rolls, setRolls] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allValues = dice.map(die => die.value);
    const allValuesAreTheSame = allValues.every(value => value === allValues[0]);
    if(allHeld && allValuesAreTheSame)
    {
      setTenzies(true);
      
    }
    
    
    
  }
  , [dice]);

  function allNewDice() {
    return Array.from({ length: 10 }, () => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id:nanoid()
    }));
}

function generateNewDie() {
  return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
}


  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Generate the dice elements
  const diceElements = dice.map((die, index) => 
  <Die 
  value={die.value} 
  isHeld={die.isHeld}
  holdDice={()=>holdDice(die.id)}


  />
);

  // Calculate number of columns based on screen size
  const numColumns = isSmallScreen ? 2 : 5;

  // Generate rows dynamically based on the number of columns
  const rows = [];
  for (let i = 0; i < diceElements.length; i += numColumns) {
    rows.push(diceElements.slice(i, i + numColumns));
  }

 

function rollDice() {
    setRolls(prevRolls => prevRolls + 1); // Increment rolls count
    tenzies
        ? setDice(() => allNewDice())
        : setDice(oldDice =>
            oldDice.map(die => (die.isHeld ? die : generateNewDie()))
          );
    if (tenzies) {
        setTenzies(false);
        setRolls(0);
    }
}



  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
}
  return (
    <div className="surround mx-auto bg-custom-darkblue text-white vh-100 d-flex justify-content-center align-items-center" style={{ marginTop: '20px' }}>
      {tenzies && <Confetti/>}
      <Container className="bg-white p-4 rounded text-black" style={containerStyle}>
      <h1 className="Title">Tenzies</h1>
        <h5 className="inst">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h5>
        <h4> Rolls: {rolls}</h4>
        {rows.map((row, rowIndex) => (
  <React.Fragment key={rowIndex}>
    <Row className={`mx-auto g-3 ${isSmallScreen ? 'flex' : 'align-items-center'} ${rowIndex % 2 === 0 ? 'row_centered_1' : 'row_centered_2'}`}>
      {row.map((col, colIndex) => (
        <Col key={colIndex} md={2} xs={6} className="col" >
          {col}
        </Col>
      ))}
    </Row>
  </React.Fragment>
))}

  <Button className="button mx-auto" onClick={rollDice}>
   {tenzies? "New Game" : "Roll Dice"}
  </Button>

      </Container>
    </div>
  );
}
