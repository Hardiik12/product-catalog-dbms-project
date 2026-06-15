import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { ShoppingCart } from "lucide-react";

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
    <div style={{ display:"flex", background:"#f8fafc", minHeight:"100vh" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ flex:1, padding:"80px 8%", minHeight:"80vh" }}>
        <h1 style={{ fontSize:"48px", fontWeight:"900", color:"#0f172a", marginBottom:"40px" }}>All Products</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"30px" }}>
          {products.map(p => (
            <div key={p.id} style={{ background:"white", padding:"24px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column" }}>
              <Link to={`/product/${p.id}`} style={{ textDecoration:"none" }}>
                <img src={p.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((p.name || 'product').split(' ')[0])},tech`; }} alt={p.name || 'Product'} style={{ width:"100%", height:"200px", objectFit:"cover", borderRadius:"16px", marginBottom:"20px" }} />
                <h2 style={{ fontSize:"22px", fontWeight:"800", color:"#0f172a" }}>{p.name}</h2>
                <p style={{ marginTop:"8px", color:"#64748b", fontSize:"14px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.description}</p>
                <p style={{ marginTop:"16px", color:"#2563eb", fontWeight:"800", fontSize:"24px" }}>${p.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {!user && <Footer />}
    </div>
  );
}
export default Products;
