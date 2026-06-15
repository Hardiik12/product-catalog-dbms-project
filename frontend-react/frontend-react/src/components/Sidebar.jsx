import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Users, Boxes, BarChart3, LogOut, Heart, Sparkles, User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Sidebar({ role, productRoute }) {
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkStyle = { textDecoration:"none", color:"#64748b", fontSize:"18px", fontWeight:"600", display:"flex", alignItems:"center", gap:"10px" };

  return (
    <div style={{ width:"280px", background:"white", padding:"40px", display:"flex", flexDirection:"column", borderRight:"1px solid #e2e8f0" }}>
      <h2 style={{ fontSize:"28px", fontWeight:"900", color:"#0f172a", marginBottom:"60px" }}>VectorCart</h2>
      
      <div style={{ display:"flex", flexDirection:"column", gap:"20px", flex:1 }}>
        {role === "USER" ? (
          <>
            <Link to="/user-dashboard" style={linkStyle}><LayoutDashboard size={20} /> Dashboard</Link>
            <Link to="/products" style={linkStyle}><Package size={20} /> Products</Link>
            <Link to="/cart" style={{ ...linkStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingCart size={20} /> Cart
              </div>
              {cartCount > 0 && (
                <span style={{
                  background: "#eff6ff",
                  color: "#3b82f6",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  fontWeight: "700"
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/wishlist" style={linkStyle}><Heart size={20} /> Wishlist</Link>
            <Link to="/ai-search" style={linkStyle}><Sparkles size={20} /> AI Search</Link>
            <Link to="/profile" style={linkStyle}><User size={20} /> Profile</Link>
          </>
        ) : (
          <>
            <Link to={role === "ADMIN" ? "/admin-dashboard" : "/manager-dashboard"} style={linkStyle}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to={productRoute || "/products"} style={linkStyle}>
              <Package size={20} /> Products
            </Link>
            <Link to="/inventory" style={linkStyle}>
              <Boxes size={20} /> Inventory
            </Link>
            <Link to="/analytics" style={linkStyle}>
              <BarChart3 size={20} /> Analytics
            </Link>
            {role === "ADMIN" && (
                <Link to="/users" style={linkStyle}>
                <Users size={20} /> Users
                </Link>
            )}
          </>
        )}
      </div>

      <button onClick={handleLogout} style={{ padding:"16px", background:"#f1f5f9", color:"#ef4444", borderRadius:"16px", border:"none", fontWeight:"700", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", cursor:"pointer" }}>
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}
export default Sidebar;
