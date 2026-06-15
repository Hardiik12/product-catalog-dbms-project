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
      const shuffled = response.data.sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} />
      
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        {/* PREMIUM HERO BANNER */}
        <div style={{ 
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", 
            borderRadius: "24px", 
            padding: "50px", 
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(79, 70, 229, 0.25)",
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
                <h1 style={{ fontSize: "44px", fontWeight: "900", letterSpacing: "-1.5px", marginBottom: "10px", lineHeight: "1.2" }}>
                    Welcome back, <br/> {user.fullname} 👋
                </h1>
                <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "500px", lineHeight: "1.6", fontWeight: "500" }}>
                    We've curated some amazing new products just for you today. Explore the latest tech and exclusive deals.
                </p>
            </div>
            
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ background: "rgba(255,255,255,0.15)", padding: "20px", borderRadius: "20px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", width: "220px" }}>
                    <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "5px", fontWeight: "700" }}>Reward Points</p>
                    <h2 style={{ fontSize: "36px", fontWeight: "900", display: "flex", alignItems: "center", gap: "10px" }}>2,450 <Zap color="#FFD700" size={28} /></h2>
                </div>
            </div>
        </div>

        {/* QUICK ACTION CARDS */}
        <div style={{ marginTop:"40px", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"30px" }}>
            
            <Link to="/products" style={{ textDecoration:"none" }}>
              <div 
                className="premium-card" 
                style={{ padding:"30px", display: "flex", alignItems: "center", gap: "20px", background: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(79, 70, 229, 0.15)"; e.currentTarget.style.borderColor = "#EEF2FF" }} 
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)" }}
              >
                <div style={{ width:"60px", height:"60px", background:"#EEF2FF", borderRadius:"16px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                    <Package size={28} color="#4F46E5" />
                </div>
                <div>
                    <h2 style={{ fontSize:"20px", color:"#111827", fontWeight:"800" }}>Browse Catalog</h2>
                    <p style={{ marginTop:"4px", color:"#64748B", fontSize:"14px", fontWeight: "500" }}>Explore new arrivals</p>
                </div>
                <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
              </div>
            </Link>

            <Link to="/cart" style={{ textDecoration:"none" }}>
              <div 
                className="premium-card" 
                style={{ padding:"30px", display: "flex", alignItems: "center", gap: "20px", background: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(6, 182, 212, 0.15)"; e.currentTarget.style.borderColor = "#ECFEFF" }} 
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)" }}
              >
                <div style={{ width:"60px", height:"60px", background:"#ECFEFF", borderRadius:"16px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                    <ShoppingBag size={28} color="#06B6D4" />
                </div>
                <div>
                    <h2 style={{ fontSize:"20px", color:"#111827", fontWeight:"800" }}>Active Cart</h2>
                    <p style={{ marginTop:"4px", color:"#64748B", fontSize:"14px", fontWeight: "500" }}>Ready for checkout</p>
                </div>
                <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
              </div>
            </Link>

            <Link to="/ai-search" style={{ textDecoration:"none" }}>
              <div 
                className="premium-card" 
                style={{ padding:"30px", display: "flex", alignItems: "center", gap: "20px", background: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(124, 58, 237, 0.15)"; e.currentTarget.style.borderColor = "#F5F3FF" }} 
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)" }}
              >
                <div style={{ width:"60px", height:"60px", background:"#F5F3FF", borderRadius:"16px", display:"flex", justifyContent:"center", alignItems:"center", flexShrink: 0 }}>
                    <Sparkles size={28} color="#7C3AED" />
                </div>
                <div>
                    <h2 style={{ fontSize:"20px", color:"#111827", fontWeight:"800" }}>AI Search</h2>
                    <p style={{ marginTop:"4px", color:"#64748B", fontSize:"14px", fontWeight: "500" }}>Find items instantly</p>
                </div>
                <ArrowRight size={20} color="#cbd5e1" style={{ marginLeft: "auto" }} />
              </div>
            </Link>

        </div>

        {/* FOR YOU SECTION */}
        <div style={{ marginTop:"50px", background: "white", borderRadius: "24px", padding: "40px", boxShadow:"0 10px 30px rgba(0,0,0,0.03)", border: "1px solid #E2E8F0" }}>
          
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: "#FEF2F2", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TrendingUp size={24} color="#EF4444" />
                </div>
                <h2 style={{ fontSize:"28px", fontWeight:"900", color:"#111827", letterSpacing: "-0.5px" }}>Trending For You</h2>
            </div>
            <Link to="/products" style={{ color:"#4F46E5", background: "#EEF2FF", padding: "10px 20px", borderRadius: "100px", fontWeight:"800", textDecoration:"none", fontSize:"14px", transition: "background 0.2s" }} onMouseEnter={(e) => e.target.style.background = "#E0E7FF"} onMouseLeave={(e) => e.target.style.background = "#EEF2FF"}>
                View all items
            </Link>
          </div>
          
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px" }}>
            {featuredProducts.map(p => (
              <div key={p.id} className="premium-card" style={{ 
                  background:"#F8FAFC", 
                  padding:"20px", 
                  display:"flex", 
                  flexDirection:"column",
                  cursor: "pointer"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#CBD5E1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.borderColor = "rgba(226, 232, 240, 0.8)"; }}
              >
                <Link to={`/product/${p.id}`} style={{ textDecoration:"none" }}>
                  <img src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} alt={p.name || 'Product'} style={{ width:"100%", height:"180px", objectFit:"cover", borderRadius:"14px", marginBottom:"16px" }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                      <h3 style={{ fontSize:"16px", fontWeight:"800", color:"#111827", lineHeight: "1.3" }}>{p.name}</h3>
                      <div style={{ background: "#E2E8F0", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: "700", color: "#64748B" }}>
                          {p.category}
                      </div>
                  </div>
                  
                  <p style={{ marginTop:"16px", color:"#4F46E5", fontWeight:"900", fontSize:"20px" }}>₹{p.price}</p>
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
