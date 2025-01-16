import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Para navegação e obter localização
import "./Header.css";
import { FaWandMagic } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import CINEINFLogo from "../assets/CINEINF-BG.png"; // Importando a imagem

const API_KEY = "38c007f28d5b66f36b9c3cf8d8452a4b";

const SearchBar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      navigate("/search");
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Pesquise por um filme..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FaWandMagic size={18} />
      </button>
    </div>
  );
};

const generateColor = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
};

export default ({ black, setSearchResults }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtendo a localização atual da URL
  const currentUser = localStorage.getItem("username");
  const userInitial = currentUser ? currentUser.charAt(0).toUpperCase() : "U";
  const userColor = currentUser ? generateColor(currentUser) : "#3498db";

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("favorites");
    navigate("/login");
  };

  return (
    <div>
      <header className={black ? "black" : ""}>
        <div className="header--logo">
          <a href="/">
            <img src="" alt="Logo" />
          </a>
        </div>

        {/* Só exibe a barra de pesquisa se não estiver na página de login */}
        {location.pathname !== "/login" && (
          <div className="header-inputQuery">
            <SearchBar setSearchResults={setSearchResults} />
          </div>
        )}

        <div className="header--user">
          <div className="header--user--adult">
            <p>Mostrar Conteúdo Adulto?</p>
            <button></button>
          </div>
          <div
            className="header--user-card"
            style={{ backgroundColor: userColor }}
          >
            {userInitial}
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>
    </div>
  );
};
