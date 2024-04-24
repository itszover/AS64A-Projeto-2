import React, { useState } from "react";

export default function SearchSection() {
    const API_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const MAX_OPTIONS = 7;
    const [cardName, setCardName] = useState('');
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

    async function handleSearch() {
        setErrorText('');

        try {
            if (cardName.trim() === '') {
                setVisibility('hidden');
                throw new Error('Campo vazio.');
            }

            await fn();

            // const inputValue = cardInputElement.value.trim();

            // if (localStorage.getItem(inputValue)) {
            //     displayCardInfo(inputValue);
            // } else {
            const { name, desc, card_images } = await fetchCardInfo(cardName);
            // cacheData(name, card_images[0].image_url_cropped, desc);
            // displayCardInfo(name);
            alert(name)
            // }

        } catch (error) {
            console.error(error);
            setErrorText(error.message);
        }
    }

    async function fn() {
        setVisibility("hidden");

        if (cardName.trim() === '') {
            return;
        }

        const response = await fetch(`${API_URL}?fname=${cardName.trim()}&language=pt`);

        if (!response.ok) {
            throw new Error("Carta não encontrada.");
        }

        const cards = await response.json();
        const newSize = Math.min(cards.data.length, MAX_OPTIONS);
        
        setOptions(cards.data.map(card => card.name));
        setSize(newSize);
        setVisibility(newSize === 1 ? "hidden" : "visible");
    }

    function handleEnterKey(event) {
        if (event.key === 'Enter') handleSearch();
    }

    function handleInputChange(event) {
        setCardName(event.target.value);
    }

    return (
        <section className="search-section">
            <div className="input-container">
                <label className="card-input-label" htmlFor="card-input" />
                <input onKeyDown={handleEnterKey} onChange={handleInputChange} name="card-name" id="card-input" type="text" placeholder="Nome da carta" />
                <button onClick={handleSearch} className="search-button" type="button">Pesquisar</button>
                <small className="error-text">{errorText}</small>
                <select className={visibility} size={size} name="cards-result" id="cards-result">
                    {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                </select>
            </div>
        </section>
    );
}