"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './Navbar.css'

const NavbarItem = ({ href, children, onClick }: { href: string, children: React.ReactNode }) => (
    <li onClick={onClick}>
        <Link href={href}>
            <span>{children}</span>
        </Link>
    </li>
);

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // checks if user is logged in
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login'; // redirects to login page
    };

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
            {isLoggedIn ? (
                <NavbarItem href="/login" onClick={handleLogout}>Log out</NavbarItem>
            ) : (
                <NavbarItem href="/login">Login</NavbarItem>
            )}
          </ul>
        </nav>
      </div>
    );
}
