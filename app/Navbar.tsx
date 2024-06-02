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
      <div className="navbar_container">
        <div className="squirtle_logo">
          <Link href="/">
            <img src="/logoSquirtle.png" alt="Home" />
          </Link>
        </div>
        <nav className="nav_menu">
          <ul className="navbar_items">
            <NavbarItem href="/dashboard">Dashboard</NavbarItem>
            <NavbarItem href="/search">Rides</NavbarItem>
            <NavbarItem href="/profile">Profile</NavbarItem>
            <NavbarItem href="/login">Login</NavbarItem>
          </ul>
        </nav>
      </div>
    );
}
