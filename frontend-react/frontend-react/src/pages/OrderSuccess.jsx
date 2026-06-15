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
        background:"#f8fafc",
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"40px",
      }}
    >

      <div
        style={{
          background:"white",
          padding:"70px",
          borderRadius:"36px",
          textAlign:"center",
          maxWidth:"700px",
          width:"100%",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.08)",
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
              width:"130px",
              height:"130px",
              borderRadius:"50%",
              background:"#dcfce7",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
            }}
          >

            <CheckCircle
              size={80}
              color="green"
            />

          </div>

        </div>

        {/* TITLE */}

        <h1
          style={{
            marginTop:"40px",
            fontSize:"52px",
            fontWeight:"900",
            color:"#0f172a",
          }}
        >

          Order Placed Successfully 🎉

        </h1>

        <p
          style={{
            marginTop:"25px",
            color:"#64748b",
            fontSize:"20px",
            lineHeight:"34px",
          }}
        >

          Thank you for shopping with
          VectorCart AI. Your order has been
          confirmed and will be delivered soon.

        </p>

        {/* ORDER DETAILS */}

        <div
          style={{
            marginTop:"45px",
            background:"#f8fafc",
            padding:"30px",
            borderRadius:"24px",
            textAlign:"left",
          }}
        >

          <div style={infoRow}>

            <span>Order ID</span>

            <strong>#VC2026</strong>

          </div>

          <div style={infoRow}>

            <span>Payment</span>

            <strong>Successful</strong>

          </div>

          <div style={infoRow}>

            <span>Delivery</span>

            <strong>2-4 Business Days</strong>

          </div>

        </div>

        {/* BUTTONS */}

        <div
          style={{
            marginTop:"45px",
            display:"flex",
            justifyContent:"center",
            gap:"20px",
            flexWrap:"wrap",
          }}
        >

          <Link
            to="/products"
            style={{
              textDecoration:"none",
            }}
          >

            <button style={primaryBtn}>

              Continue Shopping

            </button>

          </Link>

          <Link
            to="/user-dashboard"
            style={{
              textDecoration:"none",
            }}
          >

            <button style={secondaryBtn}>

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

  padding:"18px 0",

  borderBottom:"1px solid #e2e8f0",

  fontSize:"17px",
};

const primaryBtn = {

  background:"#2563eb",

  color:"white",

  border:"none",

  padding:"18px 34px",

  borderRadius:"16px",

  fontWeight:"700",

  fontSize:"16px",

  cursor:"pointer",

  boxShadow:
    "0 10px 30px rgba(37,99,235,0.25)",
};

const secondaryBtn = {

  background:"white",

  color:"#0f172a",

  border:"1px solid #cbd5e1",

  padding:"18px 34px",

  borderRadius:"16px",

  fontWeight:"700",

  fontSize:"16px",

  cursor:"pointer",
};

export default OrderSuccess;
