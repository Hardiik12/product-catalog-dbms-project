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

    <div
      style={{
        background:"#f8fafc",
        minHeight:"100vh",
      }}
    >

      <Navbar />

      <div
        style={{
          padding:"70px",
        }}
      >

        {/* HEADER */}

        <h1
          style={{
            fontSize:"60px",
            fontWeight:"900",
            color:"#0f172a",
          }}
        >

          AI Semantic Search 🤖

        </h1>

        <p
          style={{
            marginTop:"20px",
            fontSize:"20px",
            color:"#64748b",
            maxWidth:"800px",
            lineHeight:"34px",
          }}
        >

          Discover products intelligently using
          AI-powered semantic understanding and
          smart recommendations.

        </p>

        {/* SEARCH BAR */}

        <div
          style={{
            marginTop:"40px",
            display:"flex",
            gap:"20px",
          }}
        >

          <input
            type="text"
            placeholder="Search products intelligently..."
            value={query}
            onChange={(e)=>
              setQuery(e.target.value)
            }
            style={{
              flex:"1",
              padding:"20px",
              borderRadius:"18px",
              border:"1px solid #cbd5e1",
              fontSize:"18px",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              background:"#2563eb",
              color:"white",
              border:"none",
              padding:"0 36px",
              borderRadius:"18px",
              fontWeight:"700",
              fontSize:"17px",
              cursor:"pointer",
            }}
          >

            Search

          </button>

        </div>

        {/* RESULTS */}

        <div
          style={{
            marginTop:"60px",
            display:"grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap:"30px",
          }}
        >

          {results.map((product)=>(

            <div
              key={product.id}
              style={{
                background:"white",
                borderRadius:"24px",
                overflow:"hidden",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,0.08)",
              }}
            >

              <img
                src={product.image}
                alt=""
                style={{
                  width:"100%",
                  height:"220px",
                  objectFit:"cover",
                }}
              />

              <div
                style={{
                  padding:"24px",
                }}
              >

                <h2
                  style={{
                    fontSize:"28px",
                    fontWeight:"800",
                    color:"#0f172a",
                  }}
                >

                  {product.name}

                </h2>

                <p
                  style={{
                    marginTop:"10px",
                    color:"#64748b",
                  }}
                >

                  {product.category}

                </p>

                <h3
                  style={{
                    marginTop:"18px",
                    color:"#2563eb",
                    fontWeight:"900",
                    fontSize:"24px",
                  }}
                >

                  {product.price}

                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default SemanticSearch;