import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
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
      } else {
        alert(response.data.message || "Login Failed");
      }
    } catch(error) {
      console.log(error);
      alert("Login Failed: Invalid credentials or server is down");
    }
  };

  return (
    <div style={{ 
      display:"flex", 
      justifyContent:"center", 
      alignItems:"center", 
      minHeight:"100vh", 
      background:"linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)",
      padding: "20px"
    }}>
      <div 
        className="premium-card" 
        style={{ 
          padding:"50px 40px", 
          borderRadius:"24px", 
          width:"100%",
          maxWidth:"460px", 
          display:"flex", 
          flexDirection:"column", 
          gap:"30px" 
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "64px", 
            height: "64px", 
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(6, 182, 212, 0.1))", 
            borderRadius: "16px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            margin: "0 auto 20px auto" 
          }}>
            <LogIn size={28} color="#4F46E5" />
          </div>
          <h1 style={{ fontSize:"32px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Welcome Back</h1>
          <p style={{ color: "#64748B", marginTop: "8px", fontSize: "15px", fontWeight: "500" }}>Log in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
              <Mail size={20} />
            </span>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-input"
              style={{ paddingLeft: "52px" }} 
            />
          </div>

          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
              <Lock size={20} />
            </span>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-input"
              style={{ paddingLeft: "52px" }} 
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: "10px", 
              marginTop: "10px" 
            }}
          >
            Login <ArrowRight size={18} />
          </button>
          
        </form>

        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ color:"#64748B", fontSize: "15px", fontWeight: "600" }}>
            Don't have an account? <Link to="/signup" style={{ color:"#4F46E5", fontWeight:"800", textDecoration:"none" }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
