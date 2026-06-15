import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
    } else {
      setEditingId(null);
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !imageUrl) {
        alert("Please fill all fields");
        return;
    }
    
    const payload = { name, description, price: parseFloat(price), imageUrl };

    try {
      if (editingId) {
        await API.put(`/products/update/${editingId}`, payload);
      } else {
        await API.post("/products/add", payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch(err) {
      console.log(err);
      alert("Failed to save product.");
    }
  };

  const handleDelete = async (id) => {
      if(!window.confirm("Are you sure?")) return;
      try {
          await API.delete(`/products/delete/${id}`);
          fetchProducts();
      } catch(err) {
          console.log(err);
      }
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role="ADMIN" productRoute="/admin-products" />
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
          <div>
            <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Admin Products 📦</h1>
            <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Manage your catalog products and descriptions.</p>
          </div>
          <button onClick={() => openModal()} style={{ padding:"14px 24px", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", borderRadius:"14px", fontWeight:"700", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>
            <Plus size={18} /> Add Product
          </button>
        </div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"30px" }}>
          {products.map(product => (
            <div key={product.id} className="premium-card" style={{ background:"white", padding:"20px", display: "flex", flexDirection: "column" }}>
              <img src={product.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"; }} alt={product.name} style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"18px" }} />
              <h2 style={{ marginTop:"20px", fontSize:"20px", color:"#111827", fontWeight:"800", lineHeight: "1.3" }}>{product.name}</h2>
              <p style={{ marginTop:"8px", color:"#64748B", fontSize: "14px", fontWeight: "500", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", flexGrow: 1 }}>{product.description}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3 style={{ color:"#4F46E5", fontSize:"24px", fontWeight:"900" }}>₹{product.price}</h3>
                <div style={{ display:"flex", gap:"10px" }}>
                  <button onClick={() => openModal(product)} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"10px 14px", border:"1px solid #E2E8F0", background:"white", color:"#111827", borderRadius:"10px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.background = "#F8FAFC"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "white"; }}>
                    <Pencil size={14}/> Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"10px 14px", border:"none", background:"#FEF2F2", color:"#EF4444", borderRadius:"10px", cursor:"pointer", fontWeight:"700", fontSize:"13px", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}>
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
          <div style={{ position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(15, 23, 42, 0.4)", backdropFilter: "blur(4px)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:100 }}>
              <form onSubmit={handleSubmit} style={{ background:"white", padding:"40px", borderRadius:"24px", width:"480px", display:"flex", flexDirection:"column", gap:"20px", position:"relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
                  <button type="button" onClick={closeModal} style={{ position:"absolute", top:"24px", right:"24px", background:"none", border:"none", cursor:"pointer", color:"#64748B", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#111827"} onMouseLeave={(e) => e.currentTarget.style.color = "#64748B"}><X size={24} /></button>
                  <h2 style={{ fontSize:"26px", fontWeight:"900", color:"#111827", marginBottom: "5px", letterSpacing: "-0.5px" }}>{editingId ? "Update Product" : "Add New Product"}</h2>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Product Name</label>
                    <input type="text" placeholder="e.g. Sony WH-1000XM4" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" style={{ padding: "12px 16px" }} />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Description</label>
                    <textarea placeholder="Product description..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="form-input" style={{ padding: "12px 16px", resize:"none", fontFamily:"inherit" }} />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Price (INR)</label>
                    <input type="number" step="0.01" placeholder="e.g. 19999" value={price} onChange={(e) => setPrice(e.target.value)} required className="form-input" style={{ padding: "12px 16px" }} />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Image URL</label>
                    <input type="url" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="form-input" style={{ padding: "12px 16px" }} />
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ padding:"14px", fontSize:"16px", marginTop:"10px" }}>{editingId ? "Update Product" : "Create Product"}</button>
              </form>
          </div>
      )}
    </div>
  );
}
export default AdminProducts;
