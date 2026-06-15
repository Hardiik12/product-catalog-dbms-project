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
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role="ADMIN" productRoute="/admin-products" />
      <div style={{ flex:1, padding:"40px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
          <h1 style={{ fontSize:"58px", fontWeight:"900", color:"#0f172a" }}>Admin Products 📦</h1>
          <button onClick={() => openModal()} style={{ padding:"16px 24px", background:"#2563eb", color:"white", borderRadius:"16px", fontWeight:"700", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
            <Plus /> Add Product
          </button>
        </div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"24px" }}>
          {products.map(product => (
            <div key={product.id} style={{ background:"white", padding:"20px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
              <img src={product.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"} onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"; }} alt={product.name} style={{ width:"100%", height:"240px", objectFit:"cover", borderRadius:"22px" }} />
              <h2 style={{ marginTop:"20px", fontSize:"28px", color:"#0f172a", fontWeight:"800" }}>{product.name}</h2>
              <p style={{ marginTop:"8px", color:"#64748b", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{product.description}</p>
              <h3 style={{ marginTop:"15px", color:"#2563eb", fontSize:"28px", fontWeight:"900" }}>${product.price}</h3>
              <div style={{ display:"flex", gap:"14px", marginTop:"24px" }}>
                <button onClick={() => openModal(product)} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"12px 18px", border:"none", background:"#2563eb", color:"white", borderRadius:"12px", cursor:"pointer", fontWeight:"700" }}>
                  <Pencil size={18}/> Edit
                </button>
                <button onClick={() => handleDelete(product.id)} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"12px 18px", border:"none", background:"#ef4444", color:"white", borderRadius:"12px", cursor:"pointer", fontWeight:"700" }}>
                  <Trash2 size={18}/> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
          <div style={{ position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:100 }}>
              <form onSubmit={handleSubmit} style={{ background:"white", padding:"40px", borderRadius:"28px", width:"500px", display:"flex", flexDirection:"column", gap:"20px", position:"relative" }}>
                  <button type="button" onClick={closeModal} style={{ position:"absolute", top:"20px", right:"20px", background:"none", border:"none", cursor:"pointer", color:"#64748b" }}><X size={28} /></button>
                  <h2 style={{ fontSize:"32px", fontWeight:"900", color:"#0f172a" }}>{editingId ? "Update Product" : "Add Product"}</h2>
                  <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding:"16px", borderRadius:"14px", border:"1px solid #cbd5e1", fontSize:"16px" }} />
                  <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} style={{ padding:"16px", borderRadius:"14px", border:"1px solid #cbd5e1", fontSize:"16px", resize:"none", fontFamily:"inherit" }} />
                  <input type="number" step="0.01" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding:"16px", borderRadius:"14px", border:"1px solid #cbd5e1", fontSize:"16px" }} />
                  <input type="url" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required style={{ padding:"16px", borderRadius:"14px", border:"1px solid #cbd5e1", fontSize:"16px" }} />
                  <button type="submit" style={{ padding:"16px", background:"#2563eb", color:"white", borderRadius:"14px", border:"none", fontWeight:"700", fontSize:"18px", cursor:"pointer", marginTop:"10px" }}>{editingId ? "Update" : "Submit"}</button>
              </form>
          </div>
      )}
    </div>
  );
}
export default AdminProducts;
