import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSSFolder/NavBar.css";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); 


  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };
  
    updateCartCount(); // Run once on load
    window.addEventListener("storage", updateCartCount); // Listen for storage updates
  
    return () => window.removeEventListener("storage", updateCartCount); // Cleanup
  }, []);



  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/Nurseries"className="navbar-link">Nurseries</Link>
      </li>
      <li className="navbar-item">
        <Link to="/Distributors"className="navbar-link">Distributors</Link>
      </li>
      <li className="navbar-item">
        <Link to="/Retailers"className="navbar-link">Retailers</Link>
      </li>
      <li className="navbar-item">
        <Link to="/ShoppingCart"className="navbar-link">Cart{cartCount > 0 && <span className="cart-count">({cartCount})</span>}</Link>
      </li>
      
      
{localStorage.getItem("thorn_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("thorn_user")
        localStorage.removeItem("cart"); // Clear cart data
        window.dispatchEvent(new Event("storage")); // Notify navbar
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
