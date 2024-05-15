import '../styles/App.css';
import { CardProvider } from './CardContext.js';
import { SearchProvider } from './SearchContext.js';
import SearchSection from './SearchSection.jsx';
import InfoSection from './InfoSection.jsx';
import Navbar1 from './Navbar.jsx';

function App() {
  return (
    <>
      <Navbar1 />
      <main className='container-xxl'>
        <CardProvider>
          <SearchProvider>
            <SearchSection />
          </SearchProvider>
          <InfoSection />
        </CardProvider>
      </main>
    </>
  );
}

export default App;