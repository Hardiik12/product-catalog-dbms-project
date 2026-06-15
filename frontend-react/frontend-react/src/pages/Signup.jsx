import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { fullname: fullname, email, password, role });
      alert("Signup Successful");
      navigate("/login");
    } catch(error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#f8fafc" }}>
      <form onSubmit={handleSignup} style={{ background:"white", padding:"40px", borderRadius:"24px", width:"400px", boxShadow:"0 10px 30px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", gap:"20px" }}>
        <h1 style={{ fontSize:"36px", fontWeight:"900", color:"#0f172a", textAlign:"center" }}>Signup</h1>
        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px" }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px" }} />
        
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px", background:"white", cursor:"pointer" }}>
            <option value="USER">User</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" style={{ padding:"16px", borderRadius:"12px", background:"#2563eb", color:"white", fontWeight:"700", fontSize:"16px", border:"none", cursor:"pointer" }}>Signup</button>
        <p style={{ textAlign:"center", color:"#64748b" }}>Already have an account? <Link to="/login" style={{ color:"#2563eb", fontWeight:"700", textDecoration:"none" }}>Login</Link></p>
      </form>
    </div>
  );
}
export default Signup;
