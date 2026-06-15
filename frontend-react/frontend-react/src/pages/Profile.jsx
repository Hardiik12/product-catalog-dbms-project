import Sidebar from "../components/Sidebar";
import { User, Mail, Shield } from "lucide-react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER", fullname: "John Doe", email: "john@example.com" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} />
      <div style={{ flex:1, padding:"60px 50px" }}>
        
        <div style={{ marginBottom:"40px" }}>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1.5px" }}>My Profile</h1>
          <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Manage your account settings and credentials.</p>
        </div>

        <div className="premium-card" style={{ background:"white", padding:"50px 40px", maxWidth:"600px", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"30px", marginBottom:"40px" }}>
                <div style={{ width:"100px", height:"100px", background:"#EEF2FF", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <User size={48} color="#4F46E5" />
                </div>
                <div>
                    <h2 style={{ fontSize:"26px", fontWeight:"800", color:"#111827", letterSpacing: "-0.5px" }}>{user.fullname}</h2>
                    <p style={{ fontSize:"15px", color:"#64748B", marginTop:"4px", fontWeight: "500" }}>VectorCart Member</p>
                </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
                <div style={{ padding:"20px", background:"#F8FAFC", borderRadius:"16px", display:"flex", alignItems:"center", gap:"15px", border: "1px solid #E2E8F0" }}>
                    <div style={{ color: "#64748B" }}><Mail size={20} /></div>
                    <div>
                        <p style={{ fontSize:"13px", color:"#64748B", fontWeight:"700" }}>Email Address</p>
                        <p style={{ fontSize:"16px", color:"#111827", fontWeight:"700", marginTop:"3px" }}>{user.email}</p>
                    </div>
                </div>
                <div style={{ padding:"20px", background:"#F8FAFC", borderRadius:"16px", display:"flex", alignItems:"center", gap:"15px", border: "1px solid #E2E8F0" }}>
                    <div style={{ color: "#64748B" }}><Shield size={20} /></div>
                    <div>
                        <p style={{ fontSize:"13px", color:"#64748B", fontWeight:"700" }}>Account Role</p>
                        <span style={{ 
                          display: "inline-block",
                          marginTop: "6px", 
                          padding: "4px 12px", 
                          borderRadius: "100px", 
                          background: user.role === "ADMIN" ? "#EEF2FF" : user.role === "MANAGER" ? "#F5F3FF" : "#ECFEFF",
                          color: user.role === "ADMIN" ? "#4F46E5" : user.role === "MANAGER" ? "#7C3AED" : "#06B6D4",
                          fontSize: "12px",
                          fontWeight: "800"
                        }}>
                          {user.role}
                        </span>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}
export default Profile;
