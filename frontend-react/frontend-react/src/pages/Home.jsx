import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Brain, Zap, ShieldCheck, ArrowRight, ShoppingBag } from "lucide-react";
import API from "../services/api";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/all");
      // Get the last 3 products to feature them
      setFeaturedProducts(response.data.slice(-3).reverse());
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* HERO SECTION */}
      <div style={{ padding: "80px 8%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "center", gap: "60px", minHeight: "75vh" }}>
          <div>
            <div style={{ background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(6, 182, 212, 0.1))", color: "#4F46E5", width: "fit-content", padding: "10px 20px", borderRadius: "999px", fontWeight: "800", fontSize: "14px", border: "1.5px solid rgba(79, 70, 229, 0.2)" }}>
              🚀 AI-Powered E-Commerce Platform
            </div>
            <h1 style={{ marginTop: "25px", fontSize: "62px", lineHeight: "1.15", fontWeight: "900", color: "#111827", letterSpacing: "-2px" }}>
              Smart Shopping <br />Starts Here.
            </h1>
            <p style={{ marginTop: "25px", fontSize: "20px", lineHeight: "1.6", color: "#64748B", maxWidth: "600px", fontWeight: "500" }}>
              Discover premium products intelligently using AI-powered search, analytics, smart recommendations and role-based e-commerce management.
            </p>

            <div style={{ marginTop: "40px", display: "flex", gap: "16px" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button style={{ padding: "16px 32px", fontSize: "16px", fontWeight: "700", borderRadius: "14px", background: "linear-gradient(135deg, #4F46E5, #06B6D4)", color: "white", border: "none", cursor: "pointer", display:"flex", alignItems:"center", gap:"10px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>
                  Get Started <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button style={{ padding: "16px 32px", fontSize: "16px", fontWeight: "700", borderRadius: "14px", background: "white", color: "#4F46E5", border: "2px solid #E2E8F0", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4F46E5"; e.currentTarget.style.background = "#EEF2FF"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "white"; }}>
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
              alt="Ecommerce Dashboard"
              style={{ width: "100%", maxWidth: "550px", borderRadius: "24px", boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.15)", border: "1px solid rgba(226, 232, 240, 0.8)" }}
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ padding: "100px 8%", background:"white", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <h2 style={{ fontSize:"38px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Why Choose VectorCart AI</h2>
              <p style={{ fontSize:"18px", color:"#64748B", marginTop:"10px", fontWeight: "500" }}>The next generation of shopping experiences.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"40px" }}>
              <div className="premium-card" style={{ padding:"40px", background:"#F8FAFC", textAlign:"center", cursor:"pointer" }}>
                  <div style={{ width:"70px", height:"70px", background:"#EEF2FF", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <Brain size={32} color="#4F46E5" />
                  </div>
                  <h3 style={{ fontSize:"22px", fontWeight:"800", color:"#111827", marginBottom:"12px" }}>Smart Recommendations</h3>
                  <p style={{ fontSize:"15px", color:"#64748B", lineHeight:"1.6", fontWeight: "500" }}>Our AI analyzes your preferences to suggest products you'll truly love, saving you time and effort.</p>
              </div>
              <div className="premium-card" style={{ padding:"40px", background:"#F8FAFC", textAlign:"center", cursor:"pointer" }}>
                  <div style={{ width:"70px", height:"70px", background:"#ECFEFF", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <Zap size={32} color="#06B6D4" />
                  </div>
                  <h3 style={{ fontSize:"22px", fontWeight:"800", color:"#111827", marginBottom:"12px" }}>Lightning Fast Checkout</h3>
                  <p style={{ fontSize:"15px", color:"#64748B", lineHeight:"1.6", fontWeight: "500" }}>Experience seamless, optimized, and instantly responsive checkout flows without any annoying delays.</p>
              </div>
              <div className="premium-card" style={{ padding:"40px", background:"#F8FAFC", textAlign:"center", cursor:"pointer" }}>
                  <div style={{ width:"70px", height:"70px", background:"#ECFDF5", borderRadius:"20px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <ShieldCheck size={32} color="#10B981" />
                  </div>
                  <h3 style={{ fontSize:"22px", fontWeight:"800", color:"#111827", marginBottom:"12px" }}>Secure Transactions</h3>
                  <p style={{ fontSize:"15px", color:"#64748B", lineHeight:"1.6", fontWeight: "500" }}>Enterprise-grade security using advanced encryption guarantees that your data is safe with us.</p>
              </div>
          </div>
      </div>

      {/* FEATURED PRODUCTS SECTION */}
      <div style={{ padding: "100px 8%" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"50px" }}>
              <div>
                <h2 style={{ fontSize:"38px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Featured Products</h2>
                <p style={{ color: "#64748B", fontSize: "16px", fontWeight: "500", marginTop: "4px" }}>Check out our fresh new catalog arrivals.</p>
              </div>
              <Link to="/products" style={{ fontSize:"16px", fontWeight:"700", color:"#4F46E5", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px", background: "#EEF2FF", padding: "10px 20px", borderRadius: "100px" }}>View All <ArrowRight size={16}/></Link>
          </div>
          {featuredProducts.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                  {featuredProducts.map(p => (
                      <div key={p.id} className="premium-card" style={{ background: "white", padding: "20px", display: "flex", flexDirection: "column" }}>
                          <Link to={`/product/${p.id}`} style={{ textDecoration: "none", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                              <img src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} alt={p.name || 'Product'} style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"16px", marginBottom:"20px" }} />
                              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", lineHeight: "1.3" }}>{p.name}</h3>
                              <p style={{ marginTop: "8px", color: "#64748B", fontSize: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1, fontWeight: "500" }}>{p.description}</p>
                              <p style={{ marginTop: "16px", color: "#4F46E5", fontWeight: "900", fontSize: "24px" }}>₹{p.price}</p>
                          </Link>
                      </div>
                  ))}
              </div>
          ) : (
              <div style={{ background:"white", padding:"60px 40px", borderRadius:"24px", textAlign:"center", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
                 <ShoppingBag size={44} color="#CBD5E1" style={{ marginBottom:"15px" }} />
                 <h3 style={{ fontSize:"20px", color:"#64748B", fontWeight:"700" }}>No products added yet!</h3>
              </div>
          )}
      </div>

      {/* CATEGORIES SECTION */}
      <div style={{ padding: "100px 8%", background:"linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)", color:"white" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <h2 style={{ fontSize:"38px", fontWeight:"900", letterSpacing: "-1px" }}>Shop By Category</h2>
              <p style={{ fontSize: "16px", opacity: 0.8, marginTop: "8px", fontWeight: "500" }}>Quickly navigate categories you are looking for.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px" }}>
              <div style={{ position:"relative", height:"220px", borderRadius:"20px", overflow:"hidden", cursor:"pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                  <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" alt="Electronics" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.55, transition: "transform 0.5s" }} onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                  <h3 style={{ position:"absolute", bottom:"24px", left:"24px", fontSize:"24px", fontWeight:"900", textShadow:"0 2px 8px rgba(0,0,0,0.6)" }}>Tech</h3>
              </div>
              <div style={{ position:"relative", height:"220px", borderRadius:"20px", overflow:"hidden", cursor:"pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                  <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80" alt="Fashion" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.55, transition: "transform 0.5s" }} onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                  <h3 style={{ position:"absolute", bottom:"24px", left:"24px", fontSize:"24px", fontWeight:"900", textShadow:"0 2px 8px rgba(0,0,0,0.6)" }}>Fashion</h3>
              </div>
              <div style={{ position:"relative", height:"220px", borderRadius:"20px", overflow:"hidden", cursor:"pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                  <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="Home" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.55, transition: "transform 0.5s" }} onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                  <h3 style={{ position:"absolute", bottom:"24px", left:"24px", fontSize:"24px", fontWeight:"900", textShadow:"0 2px 8px rgba(0,0,0,0.6)" }}>Home</h3>
              </div>
              <div style={{ position:"relative", height:"220px", borderRadius:"20px", overflow:"hidden", cursor:"pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="Shoes" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.55, transition: "transform 0.5s" }} onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"} onMouseLeave={(e) => e.target.style.transform = "scale(1)"} />
                  <h3 style={{ position:"absolute", bottom:"24px", left:"24px", fontSize:"24px", fontWeight:"900", textShadow:"0 2px 8px rgba(0,0,0,0.6)" }}>Shoes</h3>
              </div>
          </div>
      </div>

      {/* CTA / NEWSLETTER */}
      <div style={{ padding: "100px 8%" }}>
          <div style={{ background:"linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)", padding:"60px 40px", borderRadius:"32px", textAlign:"center", color:"white", boxShadow:"0 20px 40px rgba(79,70,229,0.2)" }}>
              <h2 style={{ fontSize:"38px", fontWeight:"900", marginBottom:"16px", letterSpacing: "-1px" }}>Join the AI Shopping Revolution</h2>
              <p style={{ fontSize:"18px", opacity:0.9, maxWidth:"600px", margin:"0 auto", marginBottom:"40px", lineHeight: "1.6", fontWeight: "500" }}>Subscribe to our newsletter to get early access to new AI features and exclusive product discounts.</p>
              <div style={{ display:"flex", justifyContent:"center", gap:"12px", maxWidth:"500px", margin:"0 auto", flexWrap: "wrap" }}>
                  <input type="email" placeholder="Enter your email address..." style={{ flex:1, minWidth: "250px", padding:"16px 24px", borderRadius:"14px", border:"none", fontSize:"16px", outline:"none", color: "#111827", fontWeight: "500" }} />
                  <button style={{ padding:"16px 32px", borderRadius:"14px", border:"none", background:"#111827", color:"white", fontWeight:"800", fontSize:"16px", cursor:"pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#000"} onMouseLeave={(e) => e.currentTarget.style.background = "#111827"}>Subscribe</button>
              </div>
          </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
