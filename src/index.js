import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Layout from "./pages/Layout";
import Accueil from "./pages/Accueil";
import NoPage from "./pages/NoPage";
import FilmDetails from "./pages/FilmDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/film/:id" element={<FilmDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);