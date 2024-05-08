import '../styles/App.css';
import SearchSection from './SearchSection.js';
import placeholder from '../assets/placeholder.jpg';
import InfoSection from './InfoSection.js';
import { useState } from 'react';

function App() {
  const [cardName, setCardName] = useState('Pessoas Correndo às Voltas');
  const [cardImage, setCardImage] = useState(placeholder);
  const [cardDescription, setCardDescription] = useState('Embora sofram sempre em silêncio, eles juram inevitavelmente revoltarem-se.');

  return (
    <div className='container'>
      <SearchSection setCardName={setCardName} setCardImage={setCardImage} setCardDescription={setCardDescription}/>
      <InfoSection cardName={cardName} cardImage={cardImage} cardDescription={cardDescription}/>
    </div>
  );
}

export default App;