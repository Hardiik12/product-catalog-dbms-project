import {

  CheckCircle,

} from "lucide-react";

import {

  Link,

} from "react-router-dom";

function OrderSuccess() {

  return (

    <div
      style={{
        background:"#F8FAFC",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"40px",
        fontFamily:"'Inter', sans-serif"
      }}
    >

      <div
        className="premium-card"
        style={{
          background:"white",
          padding:"60px 40px",
          textAlign:"center",
          maxWidth:"600px",
          width:"100%",
          border: "1px solid rgba(226, 232, 240, 0.8)"
        }}
      >

        {/* SUCCESS ICON */}
        <div
          style={{
            display:"flex",
            justifyContent:"center",
          }}
        >
          <div
            style={{
              width:"100px",
              height:"100px",
              borderRadius:"50%",
              background:"#ECFDF5",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
            }}
          >
            <CheckCircle
              size={56}
              color="#10B981"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1
          style={{
            marginTop:"30px",
            fontSize:"32px",
            fontWeight:"900",
            color:"#111827",
            letterSpacing: "-0.5px"
          }}
        >
          Order Placed Successfully 🎉
        </h1>

        <p
          style={{
            marginTop:"15px",
            color:"#64748B",
            fontSize:"16px",
            lineHeight:"1.6",
            fontWeight: "500"
          }}
        >
          Thank you for shopping with VectorCart AI. Your order has been confirmed and will be delivered soon.
        </p>

        {/* ORDER DETAILS */}
        <div
          style={{
            marginTop:"30px",
            background:"#F8FAFC",
            padding:"20px 30px",
            borderRadius:"16px",
            textAlign:"left",
            border: "1.5px solid #E2E8F0"
          }}
        >
          <div style={infoRow}>
            <span>Order ID</span>
            <strong>#VC2026</strong>
          </div>

          <div style={infoRow}>
            <span>Payment</span>
            <strong style={{ color: "#10B981" }}>Successful</strong>
          </div>

          <div style={{ ...infoRow, borderBottom: "none" }}>
            <span>Delivery</span>
            <strong>2-4 Business Days</strong>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            marginTop:"40px",
            display:"flex",
            justifyContent:"center",
            gap:"15px",
            flexWrap:"wrap",
          }}
        >
          <Link
            to="/products"
            style={{
              textDecoration:"none",
            }}
          >
            <button className="btn-primary" style={{ padding: "14px 28px", width: "auto", fontSize: "15px" }}>
              Continue Shopping
            </button>
          </Link>

          <Link
            to="/user-dashboard"
            style={{
              textDecoration:"none",
            }}
          >
            <button style={secondaryBtn} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.background = "#F8FAFC"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.background = "white"; }}>
              Go To Dashboard
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

/* STYLES */

const infoRow = {
  display:"flex",
  justifyContent:"space-between",
  padding:"14px 0",
  borderBottom:"1px solid #E2E8F0",
  fontSize:"15px",
  fontWeight: "500",
  color: "#64748B"
};

const secondaryBtn = {
  background:"white",
  color:"#111827",
  border:"1px solid #E2E8F0",
  padding:"14px 28px",
  borderRadius:"14px",
  fontWeight:"700",
  fontSize:"15px",
  cursor:"pointer",
  transition: "all 0.3s"
};

export default OrderSuccess;
