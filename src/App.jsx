import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Screens/Login/Login';
import { UserStorage } from './Components/Storage/UserContext';
import AlunosLiberados from './Screens/AlunosLiberados/AlunosLiberados';
import SolicitarLiberacao from './Screens/SolicitarLiberacao/SolicitarLiberacao';
import Pendencias from './Screens/Pendencias/Pendencias';
import CriarUsuario from './Screens/CriarUsuario/CriarUsuario';
import LiberarAluno from './Screens/LiberarAluno/LiberarAluno';

const App = () => {
  return (
    <UserStorage>
      <div className="containerAll">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/alunos-liberados" element={<AlunosLiberados />} />
            <Route
              path="/solicitar-liberacao"
              element={<SolicitarLiberacao />}
            />
            <Route path="/liberar-aluno" element={<LiberarAluno />} />
            <Route path="/pendencias" element={<Pendencias />} />
            <Route path="/criar-usuarios" element={<CriarUsuario />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </UserStorage>
  );
};

export default App;
