import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Checkout() {
    return (
        <div style={{ background:"#f8fafc", minHeight:"100vh" }}>
            <Navbar />
            <div style={{ padding:"80px 8%", minHeight:"80vh" }}>
                <h1 style={{ fontSize:"48px", fontWeight:"900", color:"#0f172a" }}>Checkout</h1>
                <p style={{ marginTop:"10px", fontSize:"22px", color:"#64748b" }}>Complete your purchase.</p>
            </div>
            <Footer />
        </div>
    );
}
export default Checkout;
