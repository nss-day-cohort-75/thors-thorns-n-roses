import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSSFolder/NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/Nurseries"className="navbar-link">Nurseries</Link>
      </li>
      <li className="navbar-item">
        <Link to="/Retailers"className="navbar-link">Retailers</Link>
      </li>
      <li className="navbar-item">
        <Link to="/Distributors"className="navbar-link">Distributors</Link>
      </li>
      
{localStorage.getItem("thorn_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("thorn_user")
        navigate("/login", { replace: true })
      }}
    >
      Logout 
      </Link>
      </li>
    ) : (
    
  ""
)} 
    </ul>
  );
};
