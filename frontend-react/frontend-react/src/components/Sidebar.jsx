import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, Boxes, BarChart3, LogOut, Heart, Sparkles, User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Sidebar({ role, productRoute }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      textDecoration: "none",
      color: isActive ? "#4F46E5" : "#64748B",
      background: isActive ? "#EEF2FF" : "transparent",
      fontSize: "16px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 20px",
      borderRadius: "14px",
      transition: "all 0.2s ease",
      width: "100%"
    };
  };

  return (
    <div style={{ 
      width:"280px", 
      background:"white", 
      padding:"40px 24px", 
      display:"flex", 
      flexDirection:"column", 
      borderRight:"1px solid #e2e8f0",
      height: "100vh",
      position: "sticky",
      top: 0
    }}>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h2 style={{ fontSize:"26px", fontWeight:"900", color:"#111827", marginBottom:"40px", letterSpacing: "-1px", display: "flex", alignItems: "center", gap: "8px" }}>
          VectorCart <span style={{ fontSize: "11px", background: "linear-gradient(135deg, #4F46E5, #06B6D4)", color: "white", padding: "2px 6px", borderRadius: "6px" }}>AI</span>
        </h2>
      </Link>
      
      <div style={{ display:"flex", flexDirection:"column", gap:"8px", flex:1 }}>
        {role === "USER" ? (
          <>
            <Link to="/user-dashboard" style={linkStyle("/user-dashboard")}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/products" style={linkStyle("/products")}>
              <Package size={20} /> Products
            </Link>
            <Link to="/cart" style={{ ...linkStyle("/cart"), display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ShoppingCart size={20} /> Cart
              </div>
              {cartCount > 0 && (
                <span style={{
                  background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
                  color: "#ffffff",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: "800",
                  boxShadow: "0 4px 10px rgba(6, 182, 212, 0.2)"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" style={linkStyle("/wishlist")}>
              <Heart size={20} /> Wishlist
            </Link>
            <Link to="/ai-search" style={linkStyle("/ai-search")}>
              <Sparkles size={20} /> AI Search
            </Link>
            <Link to="/profile" style={linkStyle("/profile")}>
              <User size={20} /> Profile
            </Link>
          </>
        ) : (
          <>
            <Link to={role === "ADMIN" ? "/admin-dashboard" : "/manager-dashboard"} style={linkStyle(role === "ADMIN" ? "/admin-dashboard" : "/manager-dashboard")}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to={productRoute || "/products"} style={linkStyle(productRoute || "/products")}>
              <Package size={20} /> Products
            </Link>
            <Link to="/inventory" style={linkStyle("/inventory")}>
              <Boxes size={20} /> Inventory
            </Link>
            <Link to="/analytics" style={linkStyle("/analytics")}>
              <BarChart3 size={20} /> Analytics
            </Link>
            {role === "ADMIN" && (
              <Link to="/users" style={linkStyle("/users")}>
                <Users size={20} /> Users
              </Link>
            )}
          </>
        )}
      </div>

      <button 
        onClick={handleLogout} 
        style={{ 
          padding:"16px", 
          background:"#fff1f2", 
          color:"#ef4444", 
          borderRadius:"14px", 
          border:"none", 
          fontWeight:"700", 
          fontSize:"15px", 
          display:"flex", 
          alignItems:"center", 
          justifyContent:"center", 
          gap:"10px", 
          cursor:"pointer",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#ffe4e6"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#fff1f2"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
export default Sidebar;
