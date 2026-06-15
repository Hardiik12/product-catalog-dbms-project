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
    <div style={{ width: "100%", minHeight: "100vh", background: "linear-gradient(to right, #f8fafc, #eef2ff)" }}>
      <Navbar />

      {/* HERO SECTION */}
      <div style={{ padding: "80px 8%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "60px", minHeight: "80vh" }}>
          <div>
            <div style={{ background: "#dbeafe", color: "#2563eb", width: "fit-content", padding: "12px 24px", borderRadius: "999px", fontWeight: "800", fontSize: "15px" }}>
              🚀 AI Powered Ecommerce Platform
            </div>
            <h1 style={{ marginTop: "35px", fontSize: "72px", lineHeight: "82px", fontWeight: "900", color: "#0f172a" }}>
              Smart Shopping<br />Starts Here.
            </h1>
            <p style={{ marginTop: "35px", fontSize: "24px", lineHeight: "42px", color: "#64748b", maxWidth: "700px" }}>
              Discover premium products intelligently using AI-powered search, analytics, smart recommendations and role-based ecommerce management.
            </p>

            <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
              <Link to="/signup">
                <button style={{ padding: "16px 32px", fontSize: "18px", fontWeight: "700", borderRadius: "12px", background: "linear-gradient(to right, #2563eb, #7c3aed)", color: "white", border: "none", cursor: "pointer", display:"flex", alignItems:"center", gap:"10px" }}>
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/login">
                <button style={{ padding: "16px 32px", fontSize: "18px", fontWeight: "700", borderRadius: "12px", background: "transparent", color: "#2563eb", border: "2px solid #2563eb", cursor: "pointer" }}>
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
              alt="Ecommerce Dashboard"
              style={{ width: "100%", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div style={{ padding: "100px 8%", background:"white" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <h2 style={{ fontSize:"48px", fontWeight:"900", color:"#0f172a" }}>Why Choose VectorCart AI</h2>
              <p style={{ fontSize:"20px", color:"#64748b", marginTop:"15px" }}>The next generation of shopping experiences.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"40px" }}>
              <div style={{ padding:"40px", background:"#f8fafc", borderRadius:"28px", textAlign:"center", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ width:"80px", height:"80px", background:"#dbeafe", borderRadius:"24px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <Brain size={40} color="#2563eb" />
                  </div>
                  <h3 style={{ fontSize:"24px", fontWeight:"800", color:"#0f172a", marginBottom:"15px" }}>Smart Recommendations</h3>
                  <p style={{ fontSize:"16px", color:"#64748b", lineHeight:"1.6" }}>Our AI analyzes your preferences to suggest products you'll truly love, saving you time and effort.</p>
              </div>
              <div style={{ padding:"40px", background:"#f8fafc", borderRadius:"28px", textAlign:"center", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ width:"80px", height:"80px", background:"#fef3c7", borderRadius:"24px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <Zap size={40} color="#d97706" />
                  </div>
                  <h3 style={{ fontSize:"24px", fontWeight:"800", color:"#0f172a", marginBottom:"15px" }}>Lightning Fast Checkout</h3>
                  <p style={{ fontSize:"16px", color:"#64748b", lineHeight:"1.6" }}>Experience seamless, optimized, and instantly responsive checkout flows without any annoying delays.</p>
              </div>
              <div style={{ padding:"40px", background:"#f8fafc", borderRadius:"28px", textAlign:"center", transition:"transform 0.3s ease", cursor:"pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ width:"80px", height:"80px", background:"#dcfce7", borderRadius:"24px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"25px" }}>
                      <ShieldCheck size={40} color="#16a34a" />
                  </div>
                  <h3 style={{ fontSize:"24px", fontWeight:"800", color:"#0f172a", marginBottom:"15px" }}>Secure Transactions</h3>
                  <p style={{ fontSize:"16px", color:"#64748b", lineHeight:"1.6" }}>Enterprise-grade security using advanced encryption guarantees that your data is safe with us.</p>
              </div>
          </div>
      </div>

      {/* FEATURED PRODUCTS SECTION */}
      <div style={{ padding: "100px 8%" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"60px" }}>
              <h2 style={{ fontSize:"48px", fontWeight:"900", color:"#0f172a" }}>Featured Products</h2>
              <Link to="/products" style={{ fontSize:"18px", fontWeight:"700", color:"#2563eb", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px" }}>View All <ArrowRight size={18}/></Link>
          </div>
          {featuredProducts.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                  {featuredProducts.map(p => (
                      <div key={p.id} style={{ background: "white", padding: "24px", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
                          <Link to={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                              <img src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} alt={p.name || 'Product'} style={{ width:"100%", height:"250px", objectFit:"cover", borderRadius:"20px", marginBottom:"20px" }} />
                              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>{p.name}</h3>
                              <p style={{ marginTop: "8px", color: "#64748b", fontSize: "15px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
                              <p style={{ marginTop: "16px", color: "#2563eb", fontWeight: "800", fontSize: "24px" }}>${p.price}</p>
                          </Link>
                      </div>
                  ))}
              </div>
          ) : (
              <div style={{ background:"white", padding:"50px", borderRadius:"24px", textAlign:"center", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
                 <ShoppingBag size={48} color="#cbd5e1" style={{ marginBottom:"20px" }} />
                 <h3 style={{ fontSize:"24px", color:"#64748b", fontWeight:"700" }}>No products added yet!</h3>
              </div>
          )}
      </div>

      {/* CATEGORIES SECTION */}
      <div style={{ padding: "100px 8%", background:"#0f172a", color:"white" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <h2 style={{ fontSize:"48px", fontWeight:"900" }}>Shop By Category</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"20px" }}>
              <div style={{ position:"relative", height:"250px", borderRadius:"24px", overflow:"hidden", cursor:"pointer" }}>
                  <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" alt="Electronics" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
                  <h3 style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", fontSize:"32px", fontWeight:"900", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>Tech</h3>
              </div>
              <div style={{ position:"relative", height:"250px", borderRadius:"24px", overflow:"hidden", cursor:"pointer" }}>
                  <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80" alt="Fashion" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
                  <h3 style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", fontSize:"32px", fontWeight:"900", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>Fashion</h3>
              </div>
              <div style={{ position:"relative", height:"250px", borderRadius:"24px", overflow:"hidden", cursor:"pointer" }}>
                  <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80" alt="Home" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
                  <h3 style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", fontSize:"32px", fontWeight:"900", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>Home</h3>
              </div>
              <div style={{ position:"relative", height:"250px", borderRadius:"24px", overflow:"hidden", cursor:"pointer" }}>
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" alt="Shoes" style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.6 }} />
                  <h3 style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", fontSize:"32px", fontWeight:"900", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>Shoes</h3>
              </div>
          </div>
      </div>

      {/* CTA / NEWSLETTER */}
      <div style={{ padding: "100px 8%" }}>
          <div style={{ background:"linear-gradient(to right, #2563eb, #7c3aed)", padding:"60px", borderRadius:"32px", textAlign:"center", color:"white", boxShadow:"0 20px 40px rgba(37,99,235,0.2)" }}>
              <h2 style={{ fontSize:"48px", fontWeight:"900", marginBottom:"20px" }}>Join the AI Shopping Revolution</h2>
              <p style={{ fontSize:"20px", opacity:0.9, maxWidth:"600px", margin:"0 auto", marginBottom:"40px" }}>Subscribe to our newsletter to get early access to new AI features and exclusive product discounts.</p>
              <div style={{ display:"flex", justifyContent:"center", gap:"15px", maxWidth:"500px", margin:"0 auto" }}>
                  <input type="email" placeholder="Enter your email address..." style={{ flex:1, padding:"18px 24px", borderRadius:"16px", border:"none", fontSize:"16px", outline:"none" }} />
                  <button style={{ padding:"18px 32px", borderRadius:"16px", border:"none", background:"#0f172a", color:"white", fontWeight:"800", fontSize:"16px", cursor:"pointer" }}>Subscribe</button>
              </div>
          </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
