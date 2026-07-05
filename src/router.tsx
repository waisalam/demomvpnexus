import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import BoardPage from './pages/BoardPage';
import CardDetailPage from './pages/CardDetailPage';

export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
        <Route path="/board/:boardId/card/:cardId" element={<CardDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}