import { createContext, useContext, useState } from 'react';
import { CardContext } from './CardContext.js';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const { setCardName, setCardImage, setCardDescription } = useContext(CardContext);

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

    async function handleSearch() {
        const cardName = cardNameInput.trim();
        setErrorText('');

        try {
            if (cardName === '') {
                setVisibility('hidden');
                throw new Error('Campo vazio.');
            }

            await displayRelatedCards();

            if (localStorage.getItem(cardName)) {
                displayCardInfo(cardName);
            } else {
                const { name, desc, card_images } = await fetchCardInfo(cardName);
                cacheData(name, card_images[0].image_url_cropped, desc);
                displayCardInfo(name);
            }

        } catch (error) {
            console.error(error);
            setErrorText(error.message);
        }
    }

    async function displayRelatedCards() {
        const cardName = cardNameInput.trim();
        
        const response = await fetch(`${API_URL}?fname=${cardName}&language=pt`);

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
        <SearchContext.Provider value={{ cardNameInput, setCardNameInput, errorText, setErrorText, visibility, setVisibility, size, setSize, options, setOptions, handleEnterKey, handleInput, handleSearch }}>
            {children}
        </SearchContext.Provider>
    );
}