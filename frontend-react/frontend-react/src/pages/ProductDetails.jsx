import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { ShoppingCart, Heart } from "lucide-react";
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
          // Fallback static storage if CartContext is incomplete
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
      return <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"24px", fontWeight:"700" }}>Loading Product...</div>;
  }

  return (
    <div style={{ display:"flex", background:"#f8fafc", minHeight:"100vh" }}>
      {user ? <Sidebar role={user.role} /> : <Navbar />}
      <div style={{ padding:"80px 8%", minHeight:"80vh", display:"flex", gap:"60px", alignItems:"flex-start" }}>
        <div style={{ flex:1 }}>
            <img src={product.imageUrl || `https://loremflickr.com/800/600/${encodeURIComponent((product.name || 'product').split(' ')[0])},tech`} onError={(e) => { e.target.onerror = null; e.target.src = `https://loremflickr.com/800/600/${encodeURIComponent((product.name || 'product').split(' ')[0])},tech`; }} alt={product.name || 'Product'} style={{ width:"100%", height:"500px", objectFit:"cover", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }} />
        </div>
        <div style={{ flex:1 }}>
            <h1 style={{ fontSize:"56px", fontWeight:"900", color:"#0f172a" }}>{product.name}</h1>
            <h2 style={{ fontSize:"42px", fontWeight:"800", color:"#2563eb", marginTop:"20px" }}>${product.price}</h2>
            <p style={{ marginTop:"30px", fontSize:"18px", color:"#64748b", lineHeight:"1.8" }}>{product.description}</p>
            
            <div style={{ display:"flex", gap:"20px", marginTop:"50px" }}>
                <button onClick={handleAddToCart} style={{ flex:1, padding:"20px", background:"#2563eb", color:"white", borderRadius:"16px", border:"none", fontWeight:"800", fontSize:"18px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center", gap:"10px" }}>
                    <ShoppingCart /> Add To Cart
                </button>
                <button onClick={handleAddToWishlist} style={{ padding:"20px", background:"#f1f5f9", color:"#ef4444", borderRadius:"16px", border:"none", fontWeight:"800", fontSize:"18px", cursor:"pointer", display:"flex", justifyContent:"center", alignItems:"center", gap:"10px" }}>
                    <Heart /> Wishlist
                </button>
            </div>
        </div>
      </div>
      {!user && <Footer />}
    </div>
  );
}
export default ProductDetails;
