import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ProductDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  let cartMethods = {};
  let wishlistMethods = {};
  try {
      cartMethods = useContext(CartContext);
      wishlistMethods = useContext(WishlistContext);
  } catch(e) {}

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch(err) {
      console.log(err);
    }
  };

  const handleAddToCart = () => {
      if (cartMethods && cartMethods.addToCart) {
          cartMethods.addToCart(product);
          alert("Added to cart!");
      } else {
          const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
          currentCart.push({...product, quantity: 1});
          localStorage.setItem("cart", JSON.stringify(currentCart));
          alert("Added to cart locally!");
      }
  };

  const handleAddToWishlist = () => {
      if (wishlistMethods && wishlistMethods.addToWishlist) {
          wishlistMethods.addToWishlist(product);
          alert("Added to wishlist!");
      }
  };

  if (!product) {
      return (
        <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"20px", fontWeight:"700", color: "#64748B" }}>
          Loading Product Details...
        </div>
      );
  }

  return (
    <div style={{ display:"flex", flexDirection: user ? "row" : "column", background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      
      <div style={{ flex:1, padding: user ? "50px 60px" : "80px 8%", minHeight:"80vh" }}>
        
        {/* BACK NAVIGATION */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            background: "none", 
            border: "none", 
            color: "#64748B", 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            fontSize: "16px", 
            fontWeight: "600", 
            marginBottom: "35px", 
            cursor: "pointer",
            transition: "color 0.2s" 
          }}
          onMouseEnter={(e) => e.target.style.color = "#111827"}
          onMouseLeave={(e) => e.target.style.color = "#64748B"}
        >
          <ArrowLeft size={18} /> Back to Catalog
        </button>

        {/* CONTAINER GRID */}
        <div style={{ 
          display:"grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
          gap:"60px", 
          background: "white", 
          padding: "50px", 
          borderRadius: "24px", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)", 
          border: "1px solid #E2E8F0",
          alignItems:"center" 
        }}>
          
          {/* IMAGE BLOCK */}
          <div style={{ overflow: "hidden", borderRadius: "20px", boxShadow: "0 15px 35px rgba(0, 0, 0, 0.04)" }}>
            <img 
              src={product.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((product.name || 'product').split(' ')[0])},tech`} 
              onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((product.name || 'product').split(' ')[0])},tech`; }} 
              alt={product.name || 'Product'} 
              style={{ width:"100%", maxHeight:"480px", objectFit:"cover", display: "block" }} 
            />
          </div>

          {/* CONTENT BLOCK */}
          <div>
            {product.category && (
              <span style={{ background: "rgba(79, 70, 229, 0.08)", color: "#4F46E5", padding: "6px 16px", borderRadius: "100px", fontSize: "14px", fontWeight: "700" }}>
                {product.category}
              </span>
            )}
            
            <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px", lineHeight: "1.2" }}>
              {product.name}
            </h1>
            
            <h2 style={{ fontSize:"36px", fontWeight:"800", color:"#4F46E5", marginTop:"15px" }}>
              ₹{product.price}
            </h2>
            
            <p style={{ marginTop:"25px", fontSize:"17px", color:"#64748B", lineHeight:"1.7", fontWeight: "500" }}>
              {product.description}
            </p>
            
            {/* ACTION BUTTONS */}
            <div style={{ display:"flex", gap:"20px", marginTop:"40px" }}>
              <button 
                onClick={handleAddToCart} 
                className="btn-primary"
                style={{ 
                  flex: 1, 
                  display:"flex", 
                  justifyContent:"center", 
                  alignItems:"center", 
                  gap:"10px", 
                  padding: "18px 24px" 
                }}
              >
                <ShoppingCart size={20} /> Add To Cart
              </button>
              
              <button 
                onClick={handleAddToWishlist} 
                style={{ 
                  padding:"18px 24px", 
                  background:"#FFE4E6", 
                  color:"#F43F5E", 
                  borderRadius:"14px", 
                  border:"none", 
                  fontWeight:"700", 
                  fontSize:"16px", 
                  cursor:"pointer", 
                  display:"flex", 
                  justifyContent:"center", 
                  alignItems:"center", 
                  gap:"10px",
                  boxShadow: "0 8px 20px rgba(244, 63, 94, 0.12)",
                  transition: "all 0.2s" 
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 25px rgba(244, 63, 94, 0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(244, 63, 94, 0.12)"; }}
              >
                <Heart size={20} fill="#F43F5E" /> Wishlist
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {!user && <Footer />}
    </div>
  );
}
export default ProductDetails;
