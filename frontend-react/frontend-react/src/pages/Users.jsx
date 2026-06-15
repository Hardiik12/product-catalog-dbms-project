import {
  Users,
  Shield,
  UserCheck,
  Plus,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function UsersPage() {

  const users = [

    {
      id:1,
      name:"Hardik",
      email:"hardik@gmail.com",
      role:"ADMIN",
      status:"Active",
    },

    {
      id:2,
      name:"Kuldeep",
      email:"kuldeep@gmail.com",
      role:"MANAGER",
      status:"Active",
    },

    {
      id:3,
      name:"Rohan",
      email:"rohan@gmail.com",
      role:"USER",
      status:"Active",
    },
  ];

  return (

    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role="ADMIN" productRoute="/admin-products" />
      <div style={{ flex:1, padding:"40px 50px" }}>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
          <div>
            <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Users Management 👥</h1>
            <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Manage platform users, roles and permissions.</p>
          </div>
          <button style={{ padding:"14px 24px", background:"linear-gradient(135deg, #4F46E5, #06B6D4)", color:"white", borderRadius:"14px", fontWeight:"700", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", boxShadow: "0 8px 20px rgba(79, 70, 229, 0.2)", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(79, 70, 229, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 70, 229, 0.2)"; }}>
            <Plus size={18} /> Add Admin
          </button>
        </div>

        {/* STATS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px", marginBottom:"40px" }}>
          
          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Total Users</h2>
              <div style={{ padding:"10px", background:"#EEF2FF", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Users size={22} color="#4F46E5" /></div>
            </div>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>1,250</h2>
            <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>Active members</p>
          </div>

          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Admins</h2>
              <div style={{ padding:"10px", background:"#F5F3FF", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><Shield size={22} color="#7C3AED" /></div>
            </div>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>12</h2>
            <p style={{ fontSize:"13px", color:"#7C3AED", fontWeight:"700", marginTop:"5px" }}>System administrators</p>
          </div>

          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h2 style={{ fontSize:"16px", color:"#64748B", fontWeight:"700" }}>Active Users</h2>
              <div style={{ padding:"10px", background:"#ECFDF5", borderRadius:"12px", display: "flex", justifyContent: "center", alignItems: "center" }}><UserCheck size={22} color="#10B981" /></div>
            </div>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginTop:"15px", letterSpacing: "-1px" }}>98%</h2>
            <p style={{ fontSize:"13px", color:"#10B981", fontWeight:"700", marginTop:"5px" }}>Retention rate</p>
          </div>

        </div>

        {/* TABLE */}
        <div style={{ background:"white", padding:"35px", borderRadius:"24px", boxShadow:"var(--shadow-premium)", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user)=>(
                  <tr key={user.id}>
                    <td style={{ color: "#64748B" }}>{user.id}</td>
                    <td style={{ fontWeight:"700", color:"#111827" }}>{user.name}</td>
                    <td style={{ color:"#64748B" }}>{user.email}</td>
                    <td>
                      <span
                        style={{
                          padding: "6px 14px",
                          borderRadius: "99px",
                          background: user.role === "ADMIN" ? "#EEF2FF" : "#F5F3FF",
                          color: user.role === "ADMIN" ? "#4F46E5" : "#7C3AED",
                          fontWeight:"800",
                          fontSize:"12px"
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span style={{ color:"#10B981", fontWeight:"700", fontSize:"14px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}></span> Active
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

export default UsersPage;