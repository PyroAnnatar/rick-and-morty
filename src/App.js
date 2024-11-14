// import logo from './logo.svg';
import "./App.css";
import CharacterList from "./pages/CharacterList";
import Nav from "./components/Nav";
import NotFoundPage from "./pages/NotFoundPage";
import LocationList from "./pages/LocationList";
import HomePage from "./pages/HomePage";
import CharacterDetails from "./pages/CharacterDetails";
import RandomCharacter from "./pages/RandomCharacter";
import Footer from "./components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CharacterProvider } from "./contexts/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter>
        <Nav />
        <div className="w-full p-4 bg-[#26b1c6] min-h-screen flex items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters" element={<CharacterList />} />
            {/* Template literal sözdizimi ile dinamik yönlendirme */}
            <Route path="/characters/:id" element={<CharacterDetails />} />
            <Route path="/locations" element={<LocationList />} />
            <Route path="/random" element={<RandomCharacter />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </CharacterProvider>
  );
}

export default App;
