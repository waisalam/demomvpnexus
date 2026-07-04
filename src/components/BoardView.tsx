import React from 'react';
import { Board } from '../types';
import useBoardStore from '../store/boardStore';
import Column from './Column';

export interface BoardViewProps {
  boardId: string;
}

export default function BoardView({ boardId }: BoardViewProps): JSX.Element {
  const board = useBoardStore((state) => state.boards[boardId]);
  const openAddCardModal = useBoardStore((state) => state.openAddCardModal);

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-view">
      <button onClick={openAddCardModal}>Add New Card</button>
      <div className="columns">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            columnId={column.id}
            title={column.title}
            cards={column.cards}
            boardId={boardId}
          />
        ))}
      </div>
    </div>
  );
}
