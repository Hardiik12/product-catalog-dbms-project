import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
    return (
        <div style={{ background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
            <Navbar />
            <div style={{ padding:"80px 8%", minHeight:"80vh" }}>
                <div style={{ marginBottom:"40px" }}>
                  <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1px" }}>Checkout 💳</h1>
                  <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Complete your purchase by entering payment details.</p>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "40px", alignItems: "start" }}>
                  
                  {/* FAKE BILLING FORM */}
                  <div className="premium-card" style={{ background: "white", padding: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", borderBottom: "1.5px solid #F1F5F9", paddingBottom: "15px" }}>Billing Details</h2>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>First Name</label>
                        <input type="text" placeholder="John" className="form-input" style={{ padding: "12px 16px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Last Name</label>
                        <input type="text" placeholder="Doe" className="form-input" style={{ padding: "12px 16px" }} />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Shipping Address</label>
                      <input type="text" placeholder="123 Luxury Ave, Apt 4B" className="form-input" style={{ padding: "12px 16px" }} />
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>City</label>
                        <input type="text" placeholder="Mumbai" className="form-input" style={{ padding: "12px 16px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#64748B", marginBottom: "6px" }}>Postal Code</label>
                        <input type="text" placeholder="400001" className="form-input" style={{ padding: "12px 16px" }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* FAKE ORDER SUMMARY */}
                  <div className="premium-card" style={{ background: "white", padding: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827", borderBottom: "1.5px solid #F1F5F9", paddingBottom: "15px" }}>Order Summary</h2>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", fontWeight: "500", fontSize: "15px" }}>
                      <span>Subtotal</span>
                      <span>₹0.00</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", fontWeight: "500", fontSize: "15px" }}>
                      <span>Shipping</span>
                      <span style={{ color: "#10B981" }}>Free</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#111827", fontWeight: "800", fontSize: "18px", borderTop: "1.5px solid #F1F5F9", paddingTop: "15px" }}>
                      <span>Total</span>
                      <span style={{ color: "#4F46E5" }}>₹0.00</span>
                    </div>
                    
                    <Link to="/order-success" style={{ textDecoration: "none" }}>
                      <button className="btn-primary" style={{ padding: "14px", fontSize: "16px", marginTop: "10px", background: "linear-gradient(135deg, #10B981, #059669)", boxShadow: "0 8px 20px rgba(16, 185, 129, 0.2)" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.35)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(16, 185, 129, 0.2)"; }}>Place Order</button>
                    </Link>
                  </div>
                  
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Checkout;
