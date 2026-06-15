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
    <div style={{ display:"flex", background:"#f8fafc", minHeight:"100vh" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ flex:1, padding:"80px 8%", minHeight:"80vh" }}>
        <h1 style={{ fontSize:"56px", fontWeight:"900", color:"#0f172a", marginBottom:"50px" }}>Wishlist ❤️</h1>
        
        {wishlist.length === 0 ? (
          <div style={{ background:"white", padding:"50px", borderRadius:"24px", textAlign:"center", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"800", color:"#0f172a" }}>Your wishlist is empty</h2>
            <Link to="/products" style={{ display:"inline-block", marginTop:"20px", padding:"16px 32px", background:"#2563eb", color:"white", textDecoration:"none", borderRadius:"16px", fontWeight:"700" }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"24px" }}>
            {wishlist.map((item) => (
              <div key={item.id} style={{ background:"white", padding:"24px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width:"100%", height:"200px", objectFit:"cover", borderRadius:"16px" }} />
                <h2 style={{ marginTop:"20px", fontSize:"28px", fontWeight:"800", color:"#0f172a" }}>{item.name}</h2>
                <h3 style={{ marginTop:"10px", color:"#2563eb", fontSize:"24px", fontWeight:"900" }}>${item.price}</h3>
                
                <div style={{ display:"flex", gap:"10px", marginTop:"20px" }}>
                  <button onClick={() => handleMoveToCart(item)} style={{ flex:1, padding:"12px", background:"#2563eb", color:"white", border:"none", borderRadius:"12px", cursor:"pointer", fontWeight:"700", display:"flex", justifyContent:"center", alignItems:"center", gap:"8px" }}>
                    <ShoppingCart size={18} /> Move to Cart
                  </button>
                  <button onClick={() => removeFromWishlist(item.id)} style={{ padding:"12px", background:"#f1f5f9", color:"#ef4444", border:"none", borderRadius:"12px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center" }}>
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
