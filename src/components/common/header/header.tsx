import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-gray-50 border-b border-gray-200">
      <h1 className="text-2xl font-bold">My Next.js App</h1>
      <nav>
        <ul className="flex gap-4 mt-2">
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
