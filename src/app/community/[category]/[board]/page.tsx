export const dynamic = 'force-dynamic';

interface Board {
  category: string;
  board: string;
}

export default async function BoardPage() {
  const board: Board = {
    category: 'category',
    board: 'board',
  };

  return (
    <div>
      <h1>
        {board.category}-{board.board}
      </h1>
    </div>
  );
}
