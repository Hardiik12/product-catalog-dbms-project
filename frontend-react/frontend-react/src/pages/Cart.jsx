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
    <div style={{ display:"flex", background:"#f8fafc", minHeight:"100vh" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ flex:1, padding:"80px 8%", minHeight:"80vh" }}>
        <h1 style={{ fontSize:"56px", fontWeight:"900", color:"#0f172a" }}>Shopping Cart 🛒</h1>
        
        {cart.length === 0 ? (
          <div style={{ marginTop:"50px", background:"white", padding:"50px", borderRadius:"24px", textAlign:"center", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"800", color:"#0f172a" }}>Your cart is empty 😔</h2>
            <Link to="/products" style={{ display:"inline-block", marginTop:"20px", padding:"16px 32px", background:"#2563eb", color:"white", textDecoration:"none", borderRadius:"16px", fontWeight:"700" }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ marginTop:"50px", display:"flex", flexDirection:"column", gap:"24px" }}>
            {cart.map((item) => (
              <div key={item.id} style={{ background:"white", padding:"30px", borderRadius:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width:"100px", height:"100px", borderRadius:"16px", objectFit:"cover" }} />
                  <div>
                    <h2 style={{ fontSize:"28px", fontWeight:"800", color:"#0f172a" }}>{item.name}</h2>
                    <p style={{ marginTop:"8px", color:"#64748b", display:"-webkit-box", WebkitLineClamp:1, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{item.description}</p>
                  </div>
                </div>
                
                <div style={{ display:"flex", alignItems:"center", gap:"40px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"15px", background:"#f1f5f9", padding:"10px 20px", borderRadius:"16px" }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Minus size={18} /></button>
                    <span style={{ fontSize:"20px", fontWeight:"800" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex" }}><Plus size={18} /></button>
                  </div>
                  
                  <div style={{ textAlign:"right", minWidth:"150px" }}>
                    <h2 style={{ color:"#2563eb", fontWeight:"900", fontSize:"28px" }}>${(item.price * item.quantity).toFixed(2)}</h2>
                    <button onClick={() => removeFromCart(item.id)} style={{ marginTop:"15px", background:"#ef4444", color:"white", border:"none", padding:"10px 16px", borderRadius:"12px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", marginLeft:"auto" }}>
                      <Trash2 size={16}/> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{ marginTop:"30px", background:"white", padding:"40px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#0f172a" }}>Total: <span style={{ color:"#2563eb" }}>${total.toFixed(2)}</span></h2>
              <Link to="/checkout" style={{ textDecoration:"none", background:"#10b981", color:"white", padding:"20px 40px", borderRadius:"16px", fontWeight:"800", fontSize:"18px" }}>Proceed To Checkout</Link>
            </div>
          </div>
        )}
      </div>
      {!user && <Footer />}
    </div>
  );
}
export default Cart;
