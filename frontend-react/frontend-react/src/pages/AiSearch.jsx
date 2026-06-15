import Sidebar from "../components/Sidebar";
import { Sparkles, Search } from "lucide-react";

function AiSearch() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Sidebar role={user.role} />
      <div style={{ flex:1, padding:"60px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        
        <div style={{ background:"white", padding:"60px", borderRadius:"32px", boxShadow:"0 20px 60px rgba(0,0,0,0.05)", textAlign:"center", maxWidth:"800px", width:"100%" }}>
            <div style={{ width:"100px", height:"100px", background:"#ede9fe", borderRadius:"30px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"30px" }}>
                <Sparkles size={50} color="#7c3aed" />
            </div>
            <h1 style={{ fontSize:"54px", fontWeight:"900", color:"#0f172a", marginBottom:"20px" }}>AI Smart Search</h1>
            <p style={{ fontSize:"22px", color:"#64748b", marginBottom:"50px" }}>Describe what you're looking for in natural language, and our AI will find the perfect products.</p>
            
            <div style={{ display:"flex", background:"#f8fafc", padding:"10px", borderRadius:"24px", border:"2px solid #e2e8f0" }}>
                <input type="text" placeholder="e.g., 'I need a fast laptop for video editing under $1500'" style={{ flex:1, padding:"20px", fontSize:"18px", border:"none", background:"transparent", outline:"none" }} />
                <button style={{ background:"#7c3aed", color:"white", border:"none", padding:"0 40px", borderRadius:"16px", fontSize:"18px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
                    <Search size={20} /> Search
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
export default AiSearch;
