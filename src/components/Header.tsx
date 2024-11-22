import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1>YCHUB</h1>
      </Link>
      <nav>
        <Link href="/">home</Link>
        <Link href="/utils">utils</Link>
      </nav>
    </header>
  );
}
