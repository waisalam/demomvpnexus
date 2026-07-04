import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import Board from './components/Board';
import CardDetail from './components/CardDetail';
import Dashboard from './components/Dashboard';
// @ts-ignore
import StoreProvider from './store/StoreProvider';
// @ts-ignore
import { useBoardStore } from './store/useBoardStore';
import { getItem } from './utils/helpers';

const App: React.FC = () => {
  useEffect(() => {
    const savedTheme = getItem<string>('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const CardDetailRoute = () => {
    const { id } = useParams<{ id: string }>();
    const { cards, updateCard, addSubtask, toggleSubtask, removeSubtask, deleteCard } = useBoardStore();
    const card = cards.find((c: { id: string }) => c.id === id);
    if (!card) return <div>Card not found</div>;
    return (
      <CardDetail
        card={card}
        onUpdateCard={updateCard}
        onAddSubtask={addSubtask}
        onToggleSubtask={toggleSubtask}
        onRemoveSubtask={removeSubtask}
        onDeleteCard={deleteCard}
      />
    );
  };

  const DashboardRoute = () => {
    const { boards, cards } = useBoardStore();
    return <Dashboard boards={boards} cards={cards} />;
  };

  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/card/:id" element={<CardDetailRoute />} />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;