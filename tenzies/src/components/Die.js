import React from "react"
import Card from 'react-bootstrap/Card';

export default function Die(props) {
    
    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "white",
    }
    return (
        <div>
            <Card className="shadow-sm card" onClick={props.holdDice}>
                <Card.Body className="text-center fw-bold" style={styles}>
                    <Card.Title >{props.value}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}