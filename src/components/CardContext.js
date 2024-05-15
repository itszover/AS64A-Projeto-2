import { createContext, useState } from "react";
import placeholder from '../assets/placeholder.jpg';

export const CardContext = createContext();

export function CardProvider({ children }) {
    const [cardName, setCardName] = useState('Pessoas Correndo às Voltas');
    const [cardImage, setCardImage] = useState(placeholder);
    const [cardDescription, setCardDescription] = useState('Embora sofram sempre em silêncio, eles juram inevitavelmente revoltarem-se.');

    return (
        <CardContext.Provider value={{ cardName, setCardName, cardImage, setCardImage, cardDescription, setCardDescription }}>
            {children}
        </CardContext.Provider>
    )
}