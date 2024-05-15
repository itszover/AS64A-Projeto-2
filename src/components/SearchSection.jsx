import { useContext } from 'react';
import { SearchContext } from './SearchContext.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default function SearchSection() {
    const { cardNameInput, errorText, visibility, size, options, handleEnterKey, handleInput, handleSearch } = useContext(SearchContext);

    return (
        <Container>
            <Row>
                <Col lg={6} className="mx-auto">
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor='card-input'>Nome da carta</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    value={cardNameInput}
                                    onKeyDown={handleEnterKey}
                                    onChange={handleInput}
                                    type='text'
                                    placeholder='Mago Negro'>
                                </Form.Control>
                                <Button onClick={handleSearch}>Pesquisar</Button>
                            </InputGroup>
                            <small>{errorText}</small>
                            <Form.Select onKeyDown={handleEnterKey} onChange={handleInput} className={visibility} htmlSize={size} id='cards-result'>
                                {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}