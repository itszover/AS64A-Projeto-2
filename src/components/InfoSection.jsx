import { memo, useContext } from 'react';
import { CardContext } from './CardContext.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function InfoSection() {
    const { cardName, cardImage, cardDescription } = useContext(CardContext);
    return (
        <Container className='border p-3'>
            <Row>
                <Col>
                    <h2>{cardName}</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <Image src={cardImage} alt={cardName} title={cardName} fluid />
                </Col>
                <Col>
                    <p className='fs-4'>{cardDescription}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default memo(InfoSection);