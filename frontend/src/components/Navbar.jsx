import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Physio Center</div>

      <ul className="navLinks">
        <li>Home</li>
        <li>Services</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

    </nav>
  );
}