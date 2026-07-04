import { Routes, Route, Outlet, useParams } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './components/Dashboard';
import BoardView from './components/BoardView';
import CardDetail from './components/CardDetail';

function LayoutWrapper() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

function BoardViewWrapper() {
  const { boardId } = useParams<{ boardId: string }>();
  return <BoardView boardId={boardId!} />;
}

const App = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route index element={<Dashboard />} />
        <Route path="board/:boardId" element={<BoardViewWrapper />} />
        <Route path="board/:boardId/card/:cardId" element={<CardDetail />} />
      </Route>
    </Routes>
  );
};

export default App;