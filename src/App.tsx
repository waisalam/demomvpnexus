import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Board from './components/Board';
import CardDetail from './components/CardDetail';
import Dashboard from './components/Dashboard';
import StoreProvider from './components/StoreProvider';
import { getItem } from './utils/helpers';

const App: React.FC = () => {
  useEffect(() => {
    const savedTheme = getItem<string>('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/card/:id" element={<CardDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;