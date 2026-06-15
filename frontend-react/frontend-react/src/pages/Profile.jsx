import Sidebar from "../components/Sidebar";
import { User, Mail, Shield } from "lucide-react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER", fullname: "John Doe", email: "john@example.com" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role={user.role} />
      <div style={{ flex:1, padding:"60px" }}>
        
        <h1 style={{ fontSize:"48px", fontWeight:"900", color:"#0f172a", marginBottom:"40px" }}>My Profile</h1>

        <div style={{ background:"white", padding:"50px", borderRadius:"32px", boxShadow:"0 10px 40px rgba(0,0,0,0.05)", maxWidth:"600px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"30px", marginBottom:"40px" }}>
                <div style={{ width:"120px", height:"120px", background:"#dbeafe", borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <User size={60} color="#2563eb" />
                </div>
                <div>
                    <h2 style={{ fontSize:"32px", fontWeight:"800", color:"#0f172a" }}>{user.fullname}</h2>
                    <p style={{ fontSize:"18px", color:"#64748b", marginTop:"5px" }}>VectorCart Member</p>
                </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
                <div style={{ padding:"20px", background:"#f8fafc", borderRadius:"16px", display:"flex", alignItems:"center", gap:"15px" }}>
                    <Mail color="#64748b" />
                    <div>
                        <p style={{ fontSize:"14px", color:"#64748b", fontWeight:"700" }}>Email Address</p>
                        <p style={{ fontSize:"18px", color:"#0f172a", fontWeight:"600", marginTop:"5px" }}>{user.email}</p>
                    </div>
                </div>
                <div style={{ padding:"20px", background:"#f8fafc", borderRadius:"16px", display:"flex", alignItems:"center", gap:"15px" }}>
                    <Shield color="#64748b" />
                    <div>
                        <p style={{ fontSize:"14px", color:"#64748b", fontWeight:"700" }}>Account Role</p>
                        <p style={{ fontSize:"18px", color:"#0f172a", fontWeight:"600", marginTop:"5px" }}>{user.role}</p>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}
export default Profile;
