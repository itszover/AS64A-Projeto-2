import { useState } from 'react';
import Button from 'react-bootstrap/Button'; 
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default function SearchSection({ setCardName, setCardImage, setCardDescription }) {
    const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const MAX_OPTIONS = 7;
    const [cardNameInput, setCardNameInput] = useState('');
    const [errorText, setErrorText] = useState('');
    const [visibility, setVisibility] = useState('hidden');
    const [size, setSize] = useState(0);
    const [options, setOptions] = useState([]);

    async function fetchCardInfo(cardName) {
        const response = await fetch(`${API_URL}?name=${cardName}&language=pt`);

        if (!response.ok) {
            setVisibility('visible');
            throw new Error('Tente por:');
        }

        const cardData = await response.json();
        return cardData.data[0];
    }

    async function handleSearch(event) {
        setErrorText('');
        setCardNameInput(cardNameInput.trim());

        try {
            if (cardNameInput === '') {
                setVisibility('hidden');
                throw new Error('Campo vazio.');
            }

            await displayRelatedCards();

            if (localStorage.getItem(cardNameInput)) {
                displayCardInfo(cardNameInput);
            } else {
                const { name, desc, card_images } = await fetchCardInfo(cardNameInput);
                cacheData(name, card_images[0].image_url_cropped, desc);
                displayCardInfo(name);
            }

        } catch (error) {
            console.error(error);
            setErrorText(error.message);
        }
    }

    async function displayRelatedCards() {
        setCardNameInput(cardNameInput.trim());

        const response = await fetch(`${API_URL}?fname=${cardNameInput}&language=pt`);

        if (!response.ok) {
            setVisibility('hidden');
            throw new Error('Carta não encontrada.');
        }

        const cards = await response.json();
        const newSize = Math.min(cards.data.length, MAX_OPTIONS);

        setOptions(cards.data.map(card => card.name));
        setSize(newSize);
        setVisibility(newSize === 1 ? 'hidden' : 'visible');
    }


    function displayCardInfo(name) {
        const card = JSON.parse(localStorage.getItem((name)));
        setCardName(name);
        setCardImage(card.imageUrl);
        setCardDescription(card.desc);
    }

    function cacheData(name, imageUrl, desc) {
        if (!localStorage.getItem(name)) {
            localStorage.setItem(name, JSON.stringify({ imageUrl, desc }));
        }
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
        event.preventDefault();
            handleSearch();
        } 
    }

    function handleInput(event) {
        setCardNameInput(event.target.value);
    }

    return (
            <Form>
                <Form.Group>
                <Form.Label htmlFor='card-input'>Nome da carta</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            value={cardNameInput} 
                            onKeyDown={handleEnterKey} 
                            onChange={handleInput} 
                            type='text' 
                            placeholder='Mago Negro'></Form.Control>
                        <Button onClick={handleSearch}>Pesquisar</Button>
                    </InputGroup>
                    <small className='error-text'>{errorText}</small>
                    <Form.Select onKeyDown={handleEnterKey} onChange={handleInput} className={visibility} htmlSize={size} id='cards-result'>
                        {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                    </Form.Select>
                </Form.Group>
            </Form>
    );
}