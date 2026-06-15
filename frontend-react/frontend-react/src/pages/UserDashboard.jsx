import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, Sparkles, Zap, Star, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import API from "../services/api";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER", fullname: "User" };
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/all");
      // Get a random selection of products to make it look "Recommended"
      const shuffled = response.data.sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} />
      
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        {/* PREMIUM HERO BANNER */}
        <div style={{ 
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)", 
            borderRadius: "32px", 
            padding: "50px", 
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 20px 50px rgba(59, 130, 246, 0.25)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Abstract Decorative Elements */}
            <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            <div style={{ position: "absolute", bottom: "-80px", right: "100px", width: "250px", height: "250px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>

            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{ background: "rgba(255,255,255,0.2)", padding: "6px 12px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", backdropFilter: "blur(10px)" }}>
                        <ShieldCheck size={16} /> Verified Member
                    </div>
                    <div style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700", padding: "6px 12px", borderRadius: "100px", display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", backdropFilter: "blur(10px)" }}>
                        <Star size={16} /> Gold Tier
                    </div>
                </div>
                <h1 style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "10px" }}>
                    Welcome back, <br/> {user.fullname} 👋
                </h1>
                <p style={{ fontSize: "18px", opacity: 0.9, maxWidth: "500px", lineHeight: "1.6" }}>
                    We've curated some amazing new products just for you today. Explore the latest tech and exclusive deals.
                </p>
            </div>
            
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ background: "rgba(255,255,255,0.15)", padding: "20px", borderRadius: "24px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", width: "220px" }}>
                    <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "5px" }}>Reward Points</p>
                    <h2 style={{ fontSize: "36px", fontWeight: "900", display: "flex", alignItems: "center", gap: "10px" }}>2,450 <Zap color="#FFD700" size={28} /></h2>
                </div>
            </div>
        </div>

        {/* QUICK ACTION CARDS */}
        <div style={{ marginTop:"40px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"30px" }}>
            
            <Link to="/products" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)", transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor:"pointer", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "20px" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(37, 99, 235, 0.1)"; e.currentTarget.style.borderColor = "#bfdbfe" }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#f1f5f9" }}>
                    <div style={{ width:"70px", height:"70px", background:"#eff6ff", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                        <Package size={32} color="#3b82f6" />
                    </div>
                    <div>
                        <h2 style={{ fontSize:"22px", color:"#0f172a", fontWeight:"800" }}>Browse Catalog</h2>
                        <p style={{ marginTop:"4px", color:"#64748b", fontSize:"14px" }}>Explore new arrivals</p>
                    </div>
                    <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
                </div>
            </Link>

            <Link to="/cart" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)", transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor:"pointer", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "20px" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(22, 163, 74, 0.1)"; e.currentTarget.style.borderColor = "#bbf7d0" }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#f1f5f9" }}>
                    <div style={{ width:"70px", height:"70px", background:"#f0fdf4", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                        <ShoppingBag size={32} color="#22c55e" />
                    </div>
                    <div>
                        <h2 style={{ fontSize:"22px", color:"#0f172a", fontWeight:"800" }}>Active Cart</h2>
                        <p style={{ marginTop:"4px", color:"#64748b", fontSize:"14px" }}>Ready for checkout</p>
                    </div>
                    <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
                </div>
            </Link>

            <Link to="/ai-search" style={{ textDecoration:"none" }}>
                <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)", transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor:"pointer", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "20px" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "#e9d5ff" }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#f1f5f9" }}>
                    <div style={{ width:"70px", height:"70px", background:"#faf5ff", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                        <Sparkles size={32} color="#a855f7" />
                    </div>
                    <div>
                        <h2 style={{ fontSize:"22px", color:"#0f172a", fontWeight:"800" }}>AI Search</h2>
                        <p style={{ marginTop:"4px", color:"#64748b", fontSize:"14px" }}>Find items instantly</p>
                    </div>
                    <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
                </div>
            </Link>

        </div>

        {/* FOR YOU SECTION */}
        <div style={{ marginTop:"50px", background: "white", borderRadius: "32px", padding: "40px", boxShadow:"0 10px 40px rgba(0,0,0,0.02)", border: "1px solid #f8fafc" }}>
          
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "#fef2f2", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TrendingUp size={24} color="#ef4444" />
                </div>
                <h2 style={{ fontSize:"32px", fontWeight:"900", color:"#0f172a", letterSpacing: "-0.5px" }}>Trending For You</h2>
            </div>
            <Link to="/products" style={{ color:"#3b82f6", background: "#eff6ff", padding: "10px 20px", borderRadius: "100px", fontWeight:"700", textDecoration:"none", fontSize:"15px", transition: "background 0.2s" }} onMouseEnter={(e) => e.target.style.background = "#dbeafe"} onMouseLeave={(e) => e.target.style.background = "#eff6ff"}>
                View all items
            </Link>
          </div>
          
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"24px" }}>
            {featuredProducts.map(p => (
              <div key={p.id} style={{ 
                  background:"#f8fafc", 
                  padding:"20px", 
                  borderRadius:"24px", 
                  display:"flex", 
                  flexDirection:"column",
                  transition: "all 0.3s ease",
                  border: "1px solid transparent",
                  cursor: "pointer"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.08)", e.currentTarget.style.transform = "scale(1.02)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.boxShadow = "none", e.currentTarget.style.transform = "scale(1)" }}
              >
                <Link to={`/product/${p.id}`} style={{ textDecoration:"none" }}>
                  <img src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} alt={p.name || 'Product'} style={{ width:"100%", height:"180px", objectFit:"cover", borderRadius:"16px", marginBottom:"16px" }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                      <h3 style={{ fontSize:"18px", fontWeight:"800", color:"#0f172a", lineHeight: "1.3" }}>{p.name}</h3>
                      <div style={{ background: "#f1f5f9", padding: "4px 8px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", color: "#64748b" }}>
                          {p.category}
                      </div>
                  </div>
                  
                  <p style={{ marginTop:"16px", color:"#3b82f6", fontWeight:"900", fontSize:"22px" }}>${p.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
export default UserDashboard;
