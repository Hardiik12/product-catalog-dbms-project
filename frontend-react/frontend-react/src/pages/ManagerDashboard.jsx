import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Package, AlertTriangle, ShoppingCart, MessageSquare, BarChart3, Boxes, Edit } from "lucide-react";

function ManagerDashboard() {
  const [activeProducts, setActiveProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products/all");
      setActiveProducts(response.data.length);
    } catch(err) {
      console.log(err);
    }
  };

  const mockActivity = [
    { id: 1, action: "iPhone 15 Pro Max stock replenished", time: "10 mins ago", status: "Update" },
    { id: 2, action: "New product 'Sony Headphones' added", time: "2 hours ago", status: "Added" },
    { id: 3, action: "MacBook Air M3 marked as Out of Stock", time: "5 hours ago", status: "Alert" },
    { id: 4, action: "Price updated for Samsung S24", time: "1 day ago", status: "Update" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role="MANAGER" productRoute="/manager-products" />
      <div style={{ flex:1, padding:"40px" }}>
        
        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
            <div>
                <h1 style={{ fontSize:"64px", fontWeight:"900", color:"#0f172a" }}>Manager Dashboard 📊</h1>
                <p style={{ marginTop:"10px", fontSize:"20px", color:"#64748b" }}>Manage your catalog, inventory, and insights.</p>
            </div>
            
            {/* QUICK ACTIONS */}
            <div style={{ display:"flex", gap:"15px" }}>
                <Link to="/manager-products" style={{ textDecoration:"none", background:"#2563eb", color:"white", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px" }}>
                    <Edit size={18} /> Manage Catalog
                </Link>
                <Link to="/inventory" style={{ textDecoration:"none", background:"white", color:"#0f172a", border:"1px solid #cbd5e1", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 6px rgba(0,0,0,0.02)" }}>
                    <Boxes size={18} /> Inventory
                </Link>
                <Link to="/analytics" style={{ textDecoration:"none", background:"white", color:"#0f172a", border:"1px solid #cbd5e1", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 6px rgba(0,0,0,0.02)" }}>
                    <BarChart3 size={18} /> Analytics
                </Link>
            </div>
        </div>

        {/* METRICS GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"24px", marginBottom:"40px" }}>
            
            {/* Metric 1 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Active Products</h2>
                    <div style={{ padding:"10px", background:"#dbeafe", borderRadius:"12px" }}><Package size={24} color="#2563eb" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>{activeProducts}</p>
                <p style={{ fontSize:"14px", color:"#10b981", fontWeight:"700", marginTop:"5px" }}>Live catalog count</p>
            </div>

            {/* Metric 2 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Low Stock Alerts</h2>
                    <div style={{ padding:"10px", background:"#fee2e2", borderRadius:"12px" }}><AlertTriangle size={24} color="#ef4444" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>3</p>
                <p style={{ fontSize:"14px", color:"#ef4444", fontWeight:"700", marginTop:"5px" }}>Requires attention</p>
            </div>

            {/* Metric 3 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Total Orders</h2>
                    <div style={{ padding:"10px", background:"#dcfce7", borderRadius:"12px" }}><ShoppingCart size={24} color="#16a34a" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>842</p>
                <p style={{ fontSize:"14px", color:"#10b981", fontWeight:"700", marginTop:"5px" }}>+24 today</p>
            </div>

            {/* Metric 4 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Pending Reviews</h2>
                    <div style={{ padding:"10px", background:"#fef3c7", borderRadius:"12px" }}><MessageSquare size={24} color="#d97706" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>12</p>
                <p style={{ fontSize:"14px", color:"#64748b", fontWeight:"700", marginTop:"5px" }}>Awaiting approval</p>
            </div>

        </div>

        {/* RECENT CATALOG ACTIVITY TABLE */}
        <div style={{ background:"white", padding:"35px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize:"28px", fontWeight:"900", color:"#0f172a", marginBottom:"25px" }}>Recent Catalog Activity</h2>
            
            <table style={{ width:"100%", borderCollapse:"collapse", textAlign:"left" }}>
                <thead>
                    <tr>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Action</th>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Time</th>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockActivity.map(act => (
                        <tr key={act.id}>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9", fontWeight:"700", color:"#0f172a" }}>{act.action}</td>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9", color:"#64748b" }}>{act.time}</td>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9" }}>
                                <span style={{
                                    padding:"6px 12px",
                                    borderRadius:"99px",
                                    fontSize:"13px",
                                    fontWeight:"800",
                                    background: act.status === "Update" ? "#dbeafe" : act.status === "Added" ? "#dcfce7" : "#fee2e2",
                                    color: act.status === "Update" ? "#2563eb" : act.status === "Added" ? "#16a34a" : "#ef4444"
                                }}>
                                    {act.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </div>
    </div>
  );
}
export default ManagerDashboard;
