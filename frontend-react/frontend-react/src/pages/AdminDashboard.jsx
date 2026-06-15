import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Users, Package, IndianRupee, Activity, BarChart3, Boxes, Plus } from "lucide-react";

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
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role="ADMIN" productRoute="/admin-products" />
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
            <div>
                <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Admin Dashboard 👑</h1>
                <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Welcome back. Here's what's happening today.</p>
            </div>
            
            {/* QUICK ACTIONS */}
            <div style={{ display:"flex", gap:"15px" }}>
                <Link to="/admin-products" style={{ textDecoration:"none", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>
                    <Plus size={18} /> Add Product
                </Link>
                <Link to="/analytics" style={{ textDecoration:"none", background:"white", color:"#111827", border:"1px solid #E2E8F0", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 10px rgba(0,0,0,0.03)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#CBD5E1"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
                    <BarChart3 size={18} /> Analytics
                </Link>
                <Link to="/inventory" style={{ textDecoration:"none", background:"white", color:"#111827", border:"1px solid #E2E8F0", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 10px rgba(0,0,0,0.03)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#CBD5E1"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
                    <Boxes size={18} /> Inventory
                </Link>
            </div>
        </div>

        {/* METRICS GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px", marginBottom:"40px" }}>
            
            {/* Metric 1 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Total Users</h2>
                    <div style={{ padding:"10px", background:"#EEF2FF", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Users size={22} color="#4F46E5" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>1,250</p>
                <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>+12% from last month</p>
            </div>

            {/* Metric 2 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Total Products</h2>
                    <div style={{ padding:"10px", background:"#F5F3FF", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Package size={22} color="#7C3AED" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>{totalProducts}</p>
                <p style={{ fontSize:"13px", color:"#06B6D4", fontWeight:"700", marginTop:"5px" }}>Real-time database sync</p>
            </div>

            {/* Metric 3 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Revenue</h2>
                    <div style={{ padding:"10px", background:"#ECFDF5", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><IndianRupee size={22} color="#10B981" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>₹45.2k</p>
                <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>+8% from last month</p>
            </div>

            {/* Metric 4 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>System Health</h2>
                    <div style={{ padding:"10px", background:"#FFFBEB", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Activity size={22} color="#F59E0B" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>99.9%</p>
                <p style={{ fontSize:"13px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>All systems operational</p>
            </div>

        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div style={{ background:"white", padding:"35px", borderRadius:"24px", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <h2 style={{ fontSize:"24px", fontWeight:"900", color:"#111827", marginBottom:"25px", letterSpacing: "-0.5px" }}>Recent Activity</h2>
            
            <div style={{ overflowX: "auto" }}>
              <table className="premium-table">
                  <thead>
                      <tr>
                          <th>Action</th>
                          <th>User</th>
                          <th>Time</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {mockActivity.map(act => (
                          <tr key={act.id}>
                              <td style={{ fontWeight:"700", color:"#111827" }}>{act.action}</td>
                              <td style={{ color:"#64748B" }}>{act.user}</td>
                              <td style={{ color:"#64748B" }}>{act.time}</td>
                              <td>
                                  <span style={{
                                      padding:"6px 14px",
                                      borderRadius:"99px",
                                      fontSize:"12px",
                                      fontWeight:"800",
                                      background: act.status === "Success" ? "#ECFDF5" : act.status === "Warning" ? "#FFFBEB" : "#FEF2F2",
                                      color: act.status === "Success" ? "#10B981" : act.status === "Warning" ? "#F59E0B" : "#EF4444"
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
    </div>
  );
}
export default AdminDashboard;
