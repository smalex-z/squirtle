import Link from 'next/link';
import './Navbar.css'

const NavbarItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
        <Link href={href}>
            <span>{children}</span>
        </Link>
    </li>
);

export default function Navbar() {
    return (
        <nav>
          <ul className="navbar">
            <li>
              <Link href="/">
                Squirtle
                {/* <span><img src="/logoSquirtle.png" alt="Home" /></span> */}
              </Link>
            </li>
            <NavbarItem href="/about">About</NavbarItem>
            <NavbarItem href="/dashboard">Dashboard</NavbarItem>
            <NavbarItem href="/profile">Profile</NavbarItem>
            <NavbarItem href="/login">Login</NavbarItem>
          </ul>
        </nav>
    );
}