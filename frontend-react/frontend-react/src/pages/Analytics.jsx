import Sidebar from "../components/Sidebar";

import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  ResponsiveContainer,

  BarChart,

  Bar,

} from "recharts";

function Analytics() {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "ADMIN" };

  const revenueData = [

    {
      month:"Jan",
      revenue:4000,
    },

    {
      month:"Feb",
      revenue:7000,
    },

    {
      month:"Mar",
      revenue:5000,
    },

    {
      month:"Apr",
      revenue:9000,
    },

    {
      month:"May",
      revenue:12000,
    },

    {
      month:"Jun",
      revenue:15000,
    },
  ];

  const productData = [

    {
      name:"Laptops",
      sales:120,
    },

    {
      name:"Phones",
      sales:240,
    },

    {
      name:"Shoes",
      sales:90,
    },

    {
      name:"Headphones",
      sales:180,
    },
  ];

  return (
    <div style={{ display:"flex", background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      <Sidebar role={user.role} productRoute={user.role === "MANAGER" ? "/manager-products" : "/admin-products"} />
      <div style={{ flex:1, padding:"40px 50px" }}>

        {/* HEADER */}
        <div style={{ marginBottom:"40px" }}>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1.5px" }}>Analytics Dashboard 📈</h1>
          <p style={{ marginTop:"6px", fontSize:"16px", color:"#64748B", fontWeight: "500" }}>Monitor sales, product performance, revenue growth and AI platform insights.</p>
        </div>

        {/* TOP CARDS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"24px", marginBottom:"40px" }}>
          
          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#4F46E5", letterSpacing: "-1px" }}>₹15L+</h2>
            <p style={{ fontSize:"14px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>Total Revenue</p>
          </div>

          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#7C3AED", letterSpacing: "-1px" }}>2.5K</h2>
            <p style={{ fontSize:"14px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>Total Orders</p>
          </div>

          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#10B981", letterSpacing: "-1px" }}>98%</h2>
            <p style={{ fontSize:"14px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>AI Accuracy</p>
          </div>

          <div className="premium-card" style={{ padding:"30px", background: "white" }}>
            <h2 style={{ fontSize:"36px", fontWeight:"900", color:"#06B6D4", letterSpacing: "-1px" }}>1.2K</h2>
            <p style={{ fontSize:"14px", color:"#64748B", fontWeight:"700", marginTop:"5px" }}>Customers</p>
          </div>

        </div>

        {/* CHARTS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:"30px" }}>

          {/* REVENUE CHART */}
          <div className="premium-card" style={{ background:"white", padding:"30px" }}>
            <h2 style={{ fontSize:"20px", fontWeight:"800", color:"#111827", marginBottom:"25px", letterSpacing: "-0.5px" }}>Revenue Growth</h2>
            
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} dot={{ fill: '#4F46E5', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* PRODUCT SALES */}
          <div className="premium-card" style={{ background:"white", padding:"30px" }}>
            <h2 style={{ fontSize:"20px", fontWeight:"800", color:"#111827", marginBottom:"25px", letterSpacing: "-0.5px" }}>Product Sales</h2>
            
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
                <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                <Bar dataKey="sales" fill="#7C3AED" radius={[6,6,0,0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Analytics;