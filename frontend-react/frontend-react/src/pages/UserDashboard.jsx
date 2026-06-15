import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Package, Sparkles } from "lucide-react";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER", fullname: "User" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role={user.role} />
      <div style={{ flex:1, padding:"50px" }}>
        
        {/* HEADER */}
        <h1 style={{ fontSize:"54px", fontWeight:"900", color:"#0f172a" }}>Welcome back, {user.fullname} 👋</h1>
        <p style={{ marginTop:"10px", fontSize:"20px", color:"#64748b" }}>Ready to discover something new?</p>

        {/* METRICS / QUICK LINKS */}
        <div style={{ marginTop:"50px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"30px" }}>
            
            <Link to="/products" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"40px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <div style={{ width:"70px", height:"70px", background:"#dbeafe", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"25px" }}>
                        <Package size={34} color="#2563eb" />
                    </div>
                    <h2 style={{ fontSize:"28px", color:"#0f172a", fontWeight:"800" }}>Browse Products</h2>
                    <p style={{ marginTop:"10px", color:"#64748b", fontSize:"16px" }}>Explore our latest catalog</p>
                </div>
            </Link>

            <Link to="/cart" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"40px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <div style={{ width:"70px", height:"70px", background:"#dcfce7", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"25px" }}>
                        <ShoppingBag size={34} color="#16a34a" />
                    </div>
                    <h2 style={{ fontSize:"28px", color:"#0f172a", fontWeight:"800" }}>Your Cart</h2>
                    <p style={{ marginTop:"10px", color:"#64748b", fontSize:"16px" }}>Checkout your items</p>
                </div>
            </Link>

            <Link to="/ai-search" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"40px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                    <div style={{ width:"70px", height:"70px", background:"#ede9fe", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"25px" }}>
                        <Sparkles size={34} color="#7c3aed" />
                    </div>
                    <h2 style={{ fontSize:"28px", color:"#0f172a", fontWeight:"800" }}>AI Search</h2>
                    <p style={{ marginTop:"10px", color:"#64748b", fontSize:"16px" }}>Find exactly what you need</p>
                </div>
            </Link>

        </div>

      </div>
    </div>
  );
}
export default UserDashboard;
