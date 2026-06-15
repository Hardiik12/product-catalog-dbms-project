import {
  Link,
} from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        width:"100%",
        padding:"18px 8%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        position:"sticky",
        top:"0",
        zIndex:"1000",
        background:"linear-gradient(135deg, #4F46E5, #7C3AED)",
        boxShadow: "0 4px 20px rgba(79, 70, 229, 0.15)",
        borderBottom:"1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* LOGO */}
      <Link to="/home" style={{ textDecoration: "none" }}>
        <h1
          style={{
            fontSize:"32px",
            fontWeight:"900",
            color:"#ffffff",
            letterSpacing: "-1.5px",
            textShadow: "0 2px 10px rgba(0,0,0,0.15)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          VectorCart <span style={{ fontSize: "14px", fontWeight: "700", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "100px", textShadow: "none" }}>AI</span>
        </h1>
      </Link>

      {/* MENU */}
      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"24px",
        }}
      >
        <Link
          to="/home"
          style={menuBtn}
          onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={menuBtn}
          onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.transform = "translateY(0)"; }}
        >
          Login
        </Link>

        <Link
          to="/signup"
          style={signupBtn}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 20px rgba(255,255,255,0.25)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"; }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

const menuBtn = {
  color:"#ffffff",
  fontWeight:"700",
  fontSize:"16px",
  padding:"10px 20px",
  borderRadius:"12px",
  transition: "all 0.2s ease",
  display: "inline-block"
};

const signupBtn = {
  background:"#ffffff",
  color:"#4F46E5",
  padding:"12px 24px",
  borderRadius:"14px",
  fontWeight:"800",
  fontSize:"16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  display: "inline-block"
};

export default Navbar;