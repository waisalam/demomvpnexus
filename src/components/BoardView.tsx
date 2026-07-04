import React from 'react';
import { Board, Column as ColumnType } from '../types';
import useBoardStore from '../store/boardStore';
import Column from './Column';

export interface BoardViewProps {
  boardId: string;
}

export default function BoardView({ boardId }: BoardViewProps): JSX.Element {
  const board = useBoardStore((state) => state.boards.find(b => b.id === boardId));

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <div className="board-view">
      <div className="columns">
        {board.columns.map((column: ColumnType) => {
          const cards = column.cardIds.map(id => board.cardById[id]).filter(Boolean);
          return (
            <Column
              key={column.id}
              columnId={column.id}
              title={column.name}
              cards={cards}
              boardId={boardId}
            />
          );
        })}
      </div>
    </div>
  );
}