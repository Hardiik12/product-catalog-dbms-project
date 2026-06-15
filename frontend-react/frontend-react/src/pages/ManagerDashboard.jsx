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
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role="MANAGER" productRoute="/manager-products" />
      <div style={{ flex:1, padding:"40px 50px" }}>
        
        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
            <div>
                <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Manager Dashboard 📊</h1>
                <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Manage your catalog, inventory, and insights.</p>
            </div>
            
            {/* QUICK ACTIONS */}
            <div style={{ display:"flex", gap:"15px" }}>
                <Link to="/manager-products" style={{ textDecoration:"none", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>
                    <Edit size={18} /> Manage Catalog
                </Link>
                <Link to="/inventory" style={{ textDecoration:"none", background:"white", color:"#111827", border:"1px solid #E2E8F0", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 10px rgba(0,0,0,0.03)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#CBD5E1"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
                    <Boxes size={18} /> Inventory
                </Link>
                <Link to="/analytics" style={{ textDecoration:"none", background:"white", color:"#111827", border:"1px solid #E2E8F0", padding:"14px 24px", borderRadius:"14px", fontWeight:"700", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 4px 10px rgba(0,0,0,0.03)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#CBD5E1"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#E2E8F0"; }}>
                    <BarChart3 size={18} /> Analytics
                </Link>
            </div>
        </div>

        {/* METRICS GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px", marginBottom:"40px" }}>
            
            {/* Metric 1 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Active Products</h2>
                    <div style={{ padding:"10px", background:"#EEF2FF", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Package size={22} color="#4F46E5" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>{activeProducts}</p>
                <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>Live catalog count</p>
            </div>

            {/* Metric 2 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Low Stock Alerts</h2>
                    <div style={{ padding:"10px", background:"#FEF2F2", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><AlertTriangle size={22} color="#EF4444" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>3</p>
                <p style={{ fontSize:"13px", color:"#EF4444", fontWeight:"700", marginTop:"5px" }}>Requires attention</p>
            </div>

            {/* Metric 3 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Total Orders</h2>
                    <div style={{ padding:"10px", background:"#ECFDF5", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><ShoppingCart size={22} color="#10B981" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>842</p>
                <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>+24 today</p>
            </div>

            {/* Metric 4 */}
            <div className="premium-card" style={{ padding:"30px", background: "white" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Pending Reviews</h2>
                    <div style={{ padding:"10px", background:"#FFFBEB", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><MessageSquare size={22} color="#F59E0B" /></div>
                </div>
                <p style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>12</p>
                <p style={{ fontSize:"13px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>Awaiting approval</p>
            </div>

        </div>

        {/* RECENT CATALOG ACTIVITY TABLE */}
        <div style={{ background:"white", padding:"35px", borderRadius:"24px", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <h2 style={{ fontSize:"24px", fontWeight:"900", color:"#111827", marginBottom:"25px", letterSpacing: "-0.5px" }}>Recent Catalog Activity</h2>
            
            <div style={{ overflowX: "auto" }}>
              <table className="premium-table">
                  <thead>
                      <tr>
                          <th>Action</th>
                          <th>Time</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {mockActivity.map(act => (
                          <tr key={act.id}>
                              <td style={{ fontWeight:"700", color:"#111827" }}>{act.action}</td>
                              <td style={{ color:"#64748B" }}>{act.time}</td>
                              <td>
                                  <span style={{
                                      padding:"6px 14px",
                                      borderRadius:"99px",
                                      fontSize:"12px",
                                      fontWeight:"800",
                                      background: act.status === "Update" ? "#EEF2FF" : act.status === "Added" ? "#ECFDF5" : "#FEF2F2",
                                      color: act.status === "Update" ? "#4F46E5" : act.status === "Added" ? "#10B981" : "#EF4444"
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
export default ManagerDashboard;
