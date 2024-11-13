// import logo from './logo.svg';
import "./App.css";
import CharacterList from "./CharacterList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import NotFoundPage from "./NotFoundPage";
import LocationList from "./LocationList";
import HomePage from "./HomePage";
import CharacterDetails from "./CharacterDetails";
import RandomCharacter from "./RandomCharacter";
import Footer from "./Footer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#26b1c6",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
  );
}

export default App;
