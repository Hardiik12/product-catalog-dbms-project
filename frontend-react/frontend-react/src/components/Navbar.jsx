import {

  Link,

} from "react-router-dom";

function Navbar() {

  return (

    <div
      style={{
        width:"100%",
        padding:"22px 8%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        position:"sticky",
        top:"0",
        zIndex:"1000",
        background:"rgba(255,255,255,0.92)",
        backdropFilter:"blur(12px)",
        borderBottom:"1px solid #e2e8f0",
      }}
    >

      {/* LOGO */}

      <h1
        style={{
          fontSize:"42px",
          fontWeight:"900",
          color:"#2563eb",
        }}
      >

        VectorCart AI

      </h1>

      {/* MENU */}

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:"20px",
        }}
      >

        <Link
          to="/home"
          style={menuBtn}
        >

          Home

        </Link>

        <Link
          to="/login"
          style={menuBtn}
        >

          Login

        </Link>

        <Link
          to="/signup"
          style={signupBtn}
        >

          Signup

        </Link>

      </div>

    </div>
  );
}

const menuBtn = {

  color:"#0f172a",

  fontWeight:"700",

  fontSize:"18px",

  padding:"12px 18px",

  borderRadius:"12px",
};

const signupBtn = {

  background:"#2563eb",

  color:"white",

  padding:"14px 28px",

  borderRadius:"16px",

  fontWeight:"700",

  boxShadow:
    "0 10px 30px rgba(37,99,235,0.25)",
};

export default Navbar;