import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Project Devops</div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/Predict" className="nav-link">Prediction</Link>
      </nav>
    </header>
  );
}

export default Header;