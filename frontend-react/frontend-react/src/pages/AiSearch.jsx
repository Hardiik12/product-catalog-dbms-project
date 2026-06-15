import Sidebar from "../components/Sidebar";
import { Sparkles, Search } from "lucide-react";

function AiSearch() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "USER" };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} />
      <div style={{ flex:1, padding:"60px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        
        <div className="premium-card" style={{ background:"white", padding:"60px 40px", textAlign:"center", maxWidth:"700px", width:"100%", border: "1px solid rgba(226, 232, 240, 0.8)" }}>
            <div style={{ width:"80px", height:"80px", background:"#F5F3FF", borderRadius:"24px", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto", marginBottom:"30px" }}>
                <Sparkles size={36} color="#7C3AED" />
            </div>
            <h1 style={{ fontSize:"36px", fontWeight:"900", color:"#111827", marginBottom:"15px", letterSpacing: "-1px" }}>AI Smart Search</h1>
            <p style={{ fontSize:"17px", color:"#64748B", marginBottom:"40px", lineHeight: "1.6", fontWeight: "500" }}>Describe what you're looking for in natural language, and our AI will find the perfect products.</p>
            
            <div style={{ display:"flex", background:"#F8FAFC", padding:"8px", borderRadius:"16px", border:"1.5px solid #E2E8F0", gap: "10px", flexWrap: "wrap" }}>
                <input type="text" placeholder="e.g., 'I need a fast laptop for video editing under ₹1,20,000'" style={{ flex:1, minWidth: "200px", padding:"12px 16px", fontSize:"15px", border:"none", background:"transparent", outline:"none", color: "#111827", fontWeight: "500" }} />
                <button style={{ background:"linear-gradient(135deg, #7C3AED, #4F46E5)", color:"white", border:"none", padding:"12px 24px", borderRadius:"12px", fontSize:"15px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = 0.95} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                    <Search size={16} /> Search
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
export default AiSearch;
