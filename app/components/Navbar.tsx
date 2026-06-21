"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">CredoSec</div>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/services">Services</Link>
        <Link href="/solutions">Solutions</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <button className="cta">Get Audit</button>
    </nav>
  );
}
