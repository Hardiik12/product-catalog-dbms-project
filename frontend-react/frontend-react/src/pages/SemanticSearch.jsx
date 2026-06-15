import { useState } from "react";

import Navbar from "../components/Navbar";

function SemanticSearch() {

  const [query,setQuery] = useState("");

  const [results,setResults] = useState([]);

  const products = [

    {
      id:1,
      name:"ASUS ROG Strix",
      category:"Gaming Laptop",
      price:"₹1,45,000",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    },

    {
      id:2,
      name:"MacBook Air M2",
      category:"Premium Laptop",
      price:"₹1,24,999",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },

    {
      id:3,
      name:"Sony WH-1000XM5",
      category:"Noise Cancelling Headphones",
      price:"₹24,999",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },

    {
      id:4,
      name:"Nike Air Max",
      category:"Running Shoes",
      price:"₹8,999",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
  ];

  const handleSearch = () => {

    const filtered = products.filter((product)=>

      product.name
        .toLowerCase()
        .includes(query.toLowerCase())

      ||

      product.category
        .toLowerCase()
        .includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div style={{ background:"#F8FAFC", minHeight:"100vh", fontFamily:"'Inter', sans-serif" }}>
      <Navbar />

      <div style={{ padding:"60px 8%" }}>

        {/* HEADER */}
        <div>
          <h1 style={{ fontSize:"40px", fontWeight:"900", color:"#111827", letterSpacing: "-1.5px" }}>AI Semantic Search 🤖</h1>
          <p style={{ marginTop:"8px", fontSize:"18px", color:"#64748B", maxWidth:"600px", lineHeight:"1.6", fontWeight: "500" }}>Discover products intelligently using AI-powered semantic understanding and smart recommendations.</p>
        </div>

        {/* SEARCH BAR */}
        <div style={{ marginTop:"40px", display:"flex", gap:"15px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search products intelligently... (e.g. Sony, Nike, ROG, MacBook)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
            style={{ flex:"1", minWidth: "250px", padding:"16px 20px", fontSize:"16px" }}
          />

          <button
            onClick={handleSearch}
            className="btn-primary"
            style={{ width: "auto", padding:"16px 36px", fontSize:"16px" }}
          >
            Search Catalog
          </button>
        </div>

        {/* RESULTS */}
        <div style={{ marginTop:"50px", display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"30px" }}>
          {results.map((product) => (
            <div key={product.id} className="premium-card" style={{ background:"white", padding:"20px", display: "flex", flexDirection: "column" }}>
              <img src={product.image} alt={product.name} style={{ width:"100%", height:"220px", objectFit:"cover", borderRadius:"18px" }} />
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                  <h2 style={{ fontSize:"18px", fontWeight:"800", color:"#111827", lineHeight: "1.3" }}>{product.name}</h2>
                  <span style={{ background: "#EEF2FF", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: "700", color: "#4F46E5", flexShrink: 0 }}>
                    {product.category}
                  </span>
                </div>
                <h3 style={{ marginTop:"16px", color:"#4F46E5", fontWeight:"900", fontSize:"22px" }}>{product.price}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default SemanticSearch;