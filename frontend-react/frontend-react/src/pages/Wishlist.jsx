import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div style={{ display:"flex", flexDirection: user ? "row" : "column", background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ flex:1, padding:"80px 8%", minHeight:"80vh" }}>
        
        <div style={{ marginBottom:"40px" }}>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Wishlist ❤️</h1>
          <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Your saved items and products you love.</p>
        </div>
        
        {wishlist.length === 0 ? (
          <div style={{ background:"white", padding:"60px 40px", borderRadius:"24px", textAlign:"center", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <h2 style={{ fontSize:"28px", fontWeight:"800", color:"#111827", letterSpacing: "-0.5px" }}>Your wishlist is empty</h2>
            <p style={{ color: "#64748B", marginTop: "8px", fontSize: "16px", fontWeight: "500" }}>Save products you love and they will show up here.</p>
            <Link to="/products" style={{ display:"inline-block", marginTop:"24px", padding:"14px 32px", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", textDecoration:"none", borderRadius:"14px", fontWeight:"700", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"30px" }}>
            {wishlist.map((item) => (
              <div key={item.id} className="premium-card" style={{ background:"white", padding:"20px", display:"flex", flexDirection:"column" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"18px" }} />
                <h2 style={{ marginTop:"20px", fontSize:"20px", fontWeight:"800", color:"#111827", lineHeight: "1.3" }}>{item.name}</h2>
                <h3 style={{ marginTop:"8px", color:"#4F46E5", fontSize:"24px", fontWeight:"900" }}>₹{item.price}</h3>
                
                <div style={{ display:"flex", gap:"10px", marginTop:"20px" }}>
                  <button onClick={() => handleMoveToCart(item)} style={{ flex:1, padding:"12px 18px", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", border:"none", borderRadius:"12px", cursor:"pointer", fontWeight:"700", display:"flex", justifyContent:"center", alignItems:"center", gap:"8px", transition: "all 0.3s", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.95"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                    <ShoppingCart size={16} /> Move to Cart
                  </button>
                  <button onClick={() => removeFromWishlist(item.id)} style={{ padding:"12px", background:"#FEF2F2", color:"#EF4444", border:"none", borderRadius:"12px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#FEE2E2"} onMouseLeave={(e) => e.currentTarget.style.background = "#FEF2F2"}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {!user && <Footer />}
    </div>
  );
}
export default Wishlist;
