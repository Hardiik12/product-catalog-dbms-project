import { Boxes } from "lucide-react";
import Sidebar from "../components/Sidebar";

function Inventory() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "MANAGER" };
  const products = [
    { name:"iPhone 15", stock:25, color:"#2563eb" },
    { name:"MacBook Air", stock:12, color:"#7c3aed" },
    { name:"Samsung S24", stock:30, color:"#16a34a" },
    { name:"Sony Headphones", stock:8, color:"#f59e0b" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role={user.role} productRoute={user.role === "MANAGER" ? "/manager-products" : "/admin-products"} />
      <div style={{ flex:1, padding:"40px" }}>
        <h1 style={{ fontSize:"58px", fontWeight:"900", color:"#0f172a" }}>Inventory 📦</h1>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"20px", marginTop:"40px" }}>
          {products.map((product, index) => (
            <div key={index} style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
              <div style={{ width:"60px", height:"60px", borderRadius:"18px", background:product.color, marginBottom:"20px" }}></div>
              <h2 style={{ fontSize:"28px", fontWeight:"800", color:"#0f172a" }}>{product.name}</h2>
              <p style={{ marginTop:"10px", color:"#64748b", fontSize:"18px" }}>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Inventory;
