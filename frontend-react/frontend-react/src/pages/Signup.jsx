import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Shield, ArrowRight } from "lucide-react";
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
          padding:"40px", 
          borderRadius:"24px", 
          width:"100%",
          maxWidth:"460px", 
          display:"flex", 
          flexDirection:"column", 
          gap:"25px" 
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
            margin: "0 auto 15px auto" 
          }}>
            <UserPlus size={28} color="#4F46E5" />
          </div>
          <h1 style={{ fontSize:"32px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Create Account</h1>
          <p style={{ color: "#64748B", marginTop: "6px", fontSize: "15px", fontWeight: "500" }}>Join VectorCart to start shopping</p>
        </div>

        <form onSubmit={handleSignup} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
          
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
              <User size={20} />
            </span>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullname} 
              onChange={(e) => setFullname(e.target.value)} 
              required 
              className="form-input"
              style={{ paddingLeft: "52px" }} 
            />
          </div>

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
          
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", zIndex: 1 }}>
              <Shield size={20} />
            </span>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="form-input"
              style={{ 
                paddingLeft: "52px", 
                appearance: "none", 
                cursor: "pointer", 
                background: "#f8fafc url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%2364748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>') no-repeat right 16px center", 
                backgroundSize: "16px" 
              }}
            >
              <option value="USER">User Role (Browse & Buy)</option>
              <option value="MANAGER">Manager Role (Update Catalog)</option>
              <option value="ADMIN">Admin Role (Full Access)</option>
            </select>
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
            Register <ArrowRight size={18} />
          </button>
          
        </form>

        <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ color:"#64748B", fontSize: "15px", fontWeight: "600" }}>
            Already have an account? <Link to="/login" style={{ color:"#4F46E5", fontWeight:"800", textDecoration:"none" }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
