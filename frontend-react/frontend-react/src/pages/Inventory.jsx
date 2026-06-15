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
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} productRoute={user.role === "MANAGER" ? "/manager-products" : "/admin-products"} />
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        <div style={{ marginBottom:"40px" }}>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Inventory 📦</h1>
          <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Monitor stock levels and warehouse quantities.</p>
        </div>
        
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"30px" }}>
          {products.map((product, index) => (
            <div key={index} className="premium-card" style={{ background:"white", padding:"30px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ width:"54px", height:"54px", borderRadius:"14px", background:product.color, opacity: 0.15, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                </div>
                <div style={{ position: "absolute", margin: "15px", width: "24px", height: "24px", borderRadius: "50%", background: product.color, border: "4px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}></div>
                <span style={{
                  padding: "6px 12px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: "800",
                  background: product.stock < 10 ? "#FEF2F2" : "#ECFDF5",
                  color: product.stock < 10 ? "#EF4444" : "#10B981"
                }}>
                  {product.stock < 10 ? "Low Stock" : "In Stock"}
                </span>
              </div>
              <h2 style={{ fontSize:"20px", fontWeight:"800", color:"#111827", lineHeight: "1.3" }}>{product.name}</h2>
              <p style={{ marginTop:"15px", color:"#64748B", fontSize:"15px", fontWeight: "700" }}>Warehouse Quantity: <span style={{ color: "#111827", fontSize: "18px", fontWeight: "900", marginLeft: "4px" }}>{product.stock}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Inventory;
