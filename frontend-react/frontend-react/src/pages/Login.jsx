import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      console.log("Login Response:", response.data);

      if (response.data.success && response.data.token) {
        localStorage.setItem("user", JSON.stringify({
            token: response.data.token,
            role: response.data.role,
            email: response.data.email,
            fullname: response.data.fullname
        }));
        
        console.log("Saved User:", localStorage.getItem("user"));
        alert("Login Successful");

        if (response.data.role === "ADMIN") navigate("/admin-dashboard");
        else if (response.data.role === "MANAGER") navigate("/manager-dashboard");
        else navigate("/user-dashboard");
      }
    } catch(error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#f8fafc" }}>
      <form onSubmit={handleLogin} style={{ background:"white", padding:"40px", borderRadius:"24px", width:"400px", boxShadow:"0 10px 30px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", gap:"20px" }}>
        <h1 style={{ fontSize:"36px", fontWeight:"900", color:"#0f172a", textAlign:"center" }}>Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding:"16px", borderRadius:"12px", border:"1px solid #e2e8f0", fontSize:"16px" }} />
        <button type="submit" style={{ padding:"16px", borderRadius:"12px", background:"#2563eb", color:"white", fontWeight:"700", fontSize:"16px", border:"none", cursor:"pointer" }}>Login</button>
        <p style={{ textAlign:"center", color:"#64748b" }}>Don't have an account? <Link to="/signup" style={{ color:"#2563eb", fontWeight:"700", textDecoration:"none" }}>Signup</Link></p>
      </form>
    </div>
  );
}
export default Login;
