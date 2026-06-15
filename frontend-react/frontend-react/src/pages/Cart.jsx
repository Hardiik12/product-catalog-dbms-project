import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

function Cart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (Number(item.price || 0) * item.quantity), 0);

  return (
    <div style={{ display:"flex", flexDirection: user ? "row" : "column", background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ flex:1, padding:"80px 8%", minHeight:"80vh" }}>
        
        <div style={{ marginBottom:"40px" }}>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Shopping Cart 🛒</h1>
          <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Review your items and proceed to secure checkout.</p>
        </div>
        
        {cart.length === 0 ? (
          <div style={{ background:"white", padding:"60px 40px", borderRadius:"24px", textAlign:"center", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <h2 style={{ fontSize:"28px", fontWeight:"800", color:"#111827", letterSpacing: "-0.5px" }}>Your cart is empty 😔</h2>
            <p style={{ color: "#64748B", marginTop: "8px", fontSize: "16px", fontWeight: "500" }}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" style={{ display:"inline-block", marginTop:"24px", padding:"14px 32px", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", textDecoration:"none", borderRadius:"14px", fontWeight:"700", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
            {cart.map((item) => (
              <div key={item.id} className="premium-card" style={{ background:"white", padding:"24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"20px", flex: 1 }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width:"90px", height:"90px", borderRadius:"14px", objectFit:"cover" }} />
                  <div>
                    <h2 style={{ fontSize:"18px", fontWeight:"800", color:"#111827", lineHeight: "1.3" }}>{item.name}</h2>
                    <p style={{ marginTop:"4px", color:"#64748B", fontSize: "14px", fontWeight: "500", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{item.description}</p>
                  </div>
                </div>
                
                <div style={{ display:"flex", alignItems:"center", gap:"40px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"15px", background:"#F1F5F9", padding:"8px 16px", borderRadius:"12px" }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", color: "#64748B" }}><Minus size={16} /></button>
                    <span style={{ fontSize:"16px", fontWeight:"800", color: "#111827", minWidth: "15px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", color: "#64748B" }}><Plus size={16} /></button>
                  </div>
                  
                  <div style={{ textAlign:"right", minWidth:"150px" }}>
                    <h2 style={{ color:"#4F46E5", fontWeight:"900", fontSize:"22px" }}>₹{(item.price * item.quantity).toFixed(2)}</h2>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginTop:"8px", background:"none", border:"none", color:"#EF4444", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", marginLeft:"auto", fontSize:"13px", fontWeight:"700" }}>
                      <Trash2 size={14}/> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{ marginTop:"20px", background:"white", padding:"30px 40px", borderRadius:"24px", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ fontSize: "14px", color: "#64748B", fontWeight: "700" }}>Grand Total</p>
                <h2 style={{ fontSize:"32px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>₹{total.toFixed(2)}</h2>
              </div>
              <Link to="/checkout" style={{ textDecoration:"none", background:"linear-gradient(135deg, #10B981, #059669)", color:"white", padding:"16px 36px", borderRadius:"14px", fontWeight:"800", fontSize:"16px", boxShadow: "0 8px 20px rgba(16, 185, 129, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.2)"; }}>Proceed To Checkout</Link>
            </div>
          </div>
        )}
      </div>
      {!user && <Footer />}
    </div>
  );
}
export default Cart;
