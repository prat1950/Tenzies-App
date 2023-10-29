import React from "react"
import Card from 'react-bootstrap/Card';

export default function Die(props) {
    return (
        <div>
            <Card className="shadow-sm card">
                <Card.Body className="text-center fw-bold">
                    <Card.Title>{props.value}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}