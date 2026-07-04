import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/pages/Dashboard';
import BoardView from '@/pages/BoardView';
import CardDetail from '@/pages/CardDetail';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board/:boardId" element={<BoardView />} />
            <Route path="/board/:boardId/card/:cardId" element={<CardDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;