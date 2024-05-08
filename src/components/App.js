import '../styles/App.css';
import SearchSection from './SearchSection.jsx';
import InfoSection from './InfoSection.jsx';
import Navbar1 from './Navbar.jsx';
import placeholder from '../assets/placeholder.jpg';
import { useState } from 'react';

function App() {
  const [cardName, setCardName] = useState('Pessoas Correndo às Voltas');
  const [cardImage, setCardImage] = useState(placeholder);
  const [cardDescription, setCardDescription] = useState('Embora sofram sempre em silêncio, eles juram inevitavelmente revoltarem-se.');

  return (
    <>
    <header>
      <Navbar1 />
    </header>
    <main className='container-xxl'>
        <SearchSection setCardName={setCardName} setCardImage={setCardImage} setCardDescription={setCardDescription} />
        <InfoSection cardName={cardName} cardImage={cardImage} cardDescription={cardDescription} />
    </main>
    </>
  );
}

export default App;