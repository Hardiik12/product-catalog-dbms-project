import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Users, Package, DollarSign, Activity, BarChart3, Boxes, Plus } from "lucide-react";

function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchTotalProducts();
  }, []);

  const fetchTotalProducts = async () => {
    try {
      const response = await API.get("/products/all");
      setTotalProducts(response.data.length);
    } catch(err) {
      console.log(err);
    }
  };

  const mockActivity = [
    { id: 1, action: "New user registered", user: "john@example.com", time: "2 mins ago", status: "Success" },
    { id: 2, action: "Product updated", user: "Admin", time: "1 hour ago", status: "Success" },
    { id: 3, action: "Failed login attempt", user: "unknown@test.com", time: "3 hours ago", status: "Warning" },
    { id: 4, action: "Inventory stock low", user: "System", time: "5 hours ago", status: "Alert" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role="ADMIN" productRoute="/admin-products" />
      <div style={{ flex:1, padding:"40px" }}>
        
        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
            <div>
                <h1 style={{ fontSize:"64px", fontWeight:"900", color:"#0f172a" }}>Admin Dashboard 👑</h1>
                <p style={{ marginTop:"10px", fontSize:"20px", color:"#64748b" }}>Welcome back. Here's what's happening today.</p>
            </div>
            
            {/* QUICK ACTIONS */}
            <div style={{ display:"flex", gap:"15px" }}>
                <Link to="/admin-products" style={{ textDecoration:"none", background:"#2563eb", color:"white", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px" }}>
                    <Plus size={18} /> Add Product
                </Link>
                <Link to="/analytics" style={{ textDecoration:"none", background:"white", color:"#0f172a", border:"1px solid #cbd5e1", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 6px rgba(0,0,0,0.02)" }}>
                    <BarChart3 size={18} /> Analytics
                </Link>
                <Link to="/inventory" style={{ textDecoration:"none", background:"white", color:"#0f172a", border:"1px solid #cbd5e1", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 6px rgba(0,0,0,0.02)" }}>
                    <Boxes size={18} /> Inventory
                </Link>
            </div>
        </div>

        {/* METRICS GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:"24px", marginBottom:"40px" }}>
            
            {/* Metric 1 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Total Users</h2>
                    <div style={{ padding:"10px", background:"#dbeafe", borderRadius:"12px" }}><Users size={24} color="#2563eb" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>1,250</p>
                <p style={{ fontSize:"14px", color:"#10b981", fontWeight:"700", marginTop:"5px" }}>+12% from last month</p>
            </div>

            {/* Metric 2 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Total Products</h2>
                    <div style={{ padding:"10px", background:"#ede9fe", borderRadius:"12px" }}><Package size={24} color="#7c3aed" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>{totalProducts}</p>
                <p style={{ fontSize:"14px", color:"#10b981", fontWeight:"700", marginTop:"5px" }}>Real-time database sync</p>
            </div>

            {/* Metric 3 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>Revenue</h2>
                    <div style={{ padding:"10px", background:"#dcfce7", borderRadius:"12px" }}><DollarSign size={24} color="#16a34a" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>$45.2k</p>
                <p style={{ fontSize:"14px", color:"#10b981", fontWeight:"700", marginTop:"5px" }}>+8% from last month</p>
            </div>

            {/* Metric 4 */}
            <div style={{ background:"white", padding:"30px", borderRadius:"24px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"20px", color:"#64748b", fontWeight:"700" }}>System Health</h2>
                    <div style={{ padding:"10px", background:"#fef3c7", borderRadius:"12px" }}><Activity size={24} color="#d97706" /></div>
                </div>
                <p style={{ fontSize:"42px", fontWeight:"900", color:"#0f172a", marginTop:"15px" }}>99.9%</p>
                <p style={{ fontSize:"14px", color:"#64748b", fontWeight:"700", marginTop:"5px" }}>All systems operational</p>
            </div>

        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div style={{ background:"white", padding:"35px", borderRadius:"28px", boxShadow:"0 10px 40px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize:"28px", fontWeight:"900", color:"#0f172a", marginBottom:"25px" }}>Recent Activity</h2>
            
            <table style={{ width:"100%", borderCollapse:"collapse", textAlign:"left" }}>
                <thead>
                    <tr>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Action</th>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>User</th>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Time</th>
                        <th style={{ padding:"20px 15px", borderBottom:"1px solid #e2e8f0", color:"#64748b", fontWeight:"700", fontSize:"15px" }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockActivity.map(act => (
                        <tr key={act.id}>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9", fontWeight:"700", color:"#0f172a" }}>{act.action}</td>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9", color:"#64748b" }}>{act.user}</td>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9", color:"#64748b" }}>{act.time}</td>
                            <td style={{ padding:"20px 15px", borderBottom:"1px solid #f1f5f9" }}>
                                <span style={{
                                    padding:"6px 12px",
                                    borderRadius:"99px",
                                    fontSize:"13px",
                                    fontWeight:"800",
                                    background: act.status === "Success" ? "#dcfce7" : act.status === "Warning" ? "#fef3c7" : "#fee2e2",
                                    color: act.status === "Success" ? "#16a34a" : act.status === "Warning" ? "#d97706" : "#ef4444"
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
export default AdminDashboard;
