export const dynamic = 'force-dynamic';

interface Category {
  category: string;
}

export default async function CategoryPage() {
  const category: Category = {
    category: 'category',
  };

  return (
    <div>
      <h1>{category.category}</h1>
    </div>
  );
}
