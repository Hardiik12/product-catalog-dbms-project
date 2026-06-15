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

    <div
      style={{
        display:"flex",
        background:"#f8fafc",
        minHeight:"100vh",
      }}
    >

      <Sidebar role={user.role} productRoute={user.role === "MANAGER" ? "/manager-products" : "/admin-products"} />

      <div
        style={{
          marginLeft:"280px",
          width:"100%",
          padding:"50px",
        }}
      >

        {/* HEADER */}

        <h1
          style={{
            fontSize:"52px",
            fontWeight:"900",
            color:"#0f172a",
          }}
        >

          Analytics Dashboard 📈

        </h1>

        <p
          style={{
            marginTop:"15px",
            color:"#64748b",
            fontSize:"18px",
          }}
        >

          Monitor sales, product performance,
          revenue growth and AI platform insights.

        </p>

        {/* TOP CARDS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap:"30px",
            marginTop:"50px",
          }}
        >

          <div style={cardStyle}>

            <h2 style={numberStyle}>

              ₹15L+

            </h2>

            <p>Total Revenue</p>

          </div>

          <div style={cardStyle}>

            <h2 style={numberStyle}>

              2.5K

            </h2>

            <p>Total Orders</p>

          </div>

          <div style={cardStyle}>

            <h2 style={numberStyle}>

              98%

            </h2>

            <p>AI Accuracy</p>

          </div>

          <div style={cardStyle}>

            <h2 style={numberStyle}>

              1.2K

            </h2>

            <p>Customers</p>

          </div>

        </div>

        {/* CHARTS */}

        <div
          style={{
            marginTop:"60px",
            display:"grid",
            gridTemplateColumns:"2fr 1fr",
            gap:"30px",
          }}
        >

          {/* REVENUE CHART */}

          <div
            style={{
              background:"white",
              padding:"30px",
              borderRadius:"24px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                fontSize:"28px",
                fontWeight:"800",
                marginBottom:"30px",
              }}
            >

              Revenue Growth

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <LineChart data={revenueData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* PRODUCT SALES */}

          <div
            style={{
              background:"white",
              padding:"30px",
              borderRadius:"24px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.08)",
            }}
          >

            <h2
              style={{
                fontSize:"28px",
                fontWeight:"800",
                marginBottom:"30px",
              }}
            >

              Product Sales

            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={productData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#2563eb"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const cardStyle = {

  background:"white",

  padding:"35px",

  borderRadius:"24px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.08)",
};

const numberStyle = {

  fontSize:"46px",

  color:"#2563eb",

  fontWeight:"900",
};

export default Analytics;