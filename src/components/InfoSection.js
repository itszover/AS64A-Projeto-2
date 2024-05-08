import Card from "react-bootstrap/Card"

export default function InfoSection({ cardName, cardImage, cardDescription }) {
    return (
        <Card className="info-section">
            <Card.Title>{cardName}</Card.Title>
            <Card.Body className="img-desc-container">
                <Card.Img className="card-img" variant="left" src={cardImage} alt={cardName} title={cardName} />
                <Card.Text className="card-desc">{cardDescription}</Card.Text>
            </Card.Body>
        </Card>
    )
}