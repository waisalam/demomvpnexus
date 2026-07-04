import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './components/Dashboard';
import BoardView from './components/BoardView';
import CardDetail from './components/CardDetail';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="board/:boardId" element={<BoardView />} />
        <Route path="board/:boardId/card/:cardId" element={<CardDetail />} />
      </Route>
    </Routes>
  );
};

export default App;