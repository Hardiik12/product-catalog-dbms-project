import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { Grid, ArrowUpRight } from "lucide-react";

function Products() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/all");
      setProducts(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display:"flex", flexDirection: user ? "row" : "column", background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      
      <div style={{ flex:1, padding: user ? "50px 60px" : "80px 8%", minHeight:"80vh" }}>
        
        {/* HEADER SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #E2E8F0", paddingBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>All Products</h1>
            <p style={{ color: "#64748B", fontSize: "16px", marginTop: "4px", fontWeight: "500" }}>Browse our complete collection of catalog items</p>
          </div>
          <div style={{ background: "rgba(79, 70, 229, 0.08)", color: "#4F46E5", padding: "10px 20px", borderRadius: "100px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
            <Grid size={18} /> {products.length} Products Available
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {products.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"30px" }}>
            {products.map(p => (
              <div key={p.id} className="premium-card" style={{ display:"flex", flexDirection:"column", overflow: "hidden", position: "relative" }}>
                <Link to={`/product/${p.id}`} style={{ textDecoration:"none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
                  
                  {/* Image Wrapper */}
                  <div style={{ overflow: "hidden", position: "relative", height: "220px" }}>
                    <img 
                      src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} 
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} 
                      alt={p.name || 'Product'} 
                      style={{ width:"100%", height:"100%", objectFit:"cover", transition: "transform 0.5s ease" }} 
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                    {p.category && (
                      <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(17, 24, 39, 0.75)", color: "white", padding: "6px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: "700", backdropFilter: "blur(4px)" }}>
                        {p.category}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding:"24px", display:"flex", flexDirection:"column", flexGrow: 1 }}>
                    <h2 style={{ fontSize:"20px", fontWeight:"800", color:"#111827", lineHeight: "1.3", marginBottom: "8px" }}>{p.name}</h2>
                    <p style={{ color:"#64748B", fontSize:"14px", lineHeight: "1.5", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom: "20px", fontWeight: "500" }}>
                      {p.description}
                    </p>
                    
                    {/* Footer Row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", borderTop: "1px solid #E2E8F0", paddingTop: "16px" }}>
                      <p style={{ color:"#4F46E5", fontWeight:"900", fontSize:"22px" }}>₹{p.price}</p>
                      <span style={{ color: "#4F46E5", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                        View details <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: "white", padding: "80px", borderRadius: "32px", textAlign: "center", border: "1px solid #E2E8F0" }}>
            <h3 style={{ fontSize: "24px", color: "#64748B", fontWeight: "700" }}>No products found in catalog.</h3>
          </div>
        )}
      </div>
      
      {!user && <Footer />}
    </div>
  );
}
export default Products;
