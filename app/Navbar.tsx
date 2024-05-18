import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul className="flex justify-around p-4">
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}