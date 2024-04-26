import { useState } from 'react';

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
        if (event.key === 'Enter') handleSearch();
    }

    function handleInput(event) {
        setCardNameInput(event.target.value);
    }

    return (
        <section className='search-section'>
            <div className='input-container'>
                <label className='card-input-label' htmlFor='card-input' />
                <input value={cardNameInput} onKeyDown={handleEnterKey} onChange={handleInput} name='card-name' id='card-input' type='text' placeholder='Nome da carta' />
                <button onClick={handleSearch} className='search-button' type='button'>Pesquisar</button>
                <small className='error-text'>{errorText}</small>
                <select onKeyDown={handleEnterKey} onChange={handleInput} className={visibility} size={size} name='cards-result' id='cards-result'>
                    {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                </select>
            </div>
        </section>
    );
}