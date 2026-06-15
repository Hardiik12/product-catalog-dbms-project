import {
  Users,
  Shield,
  UserCheck,
  Plus,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

function UsersPage() {

  const users = [

    {
      id:1,
      name:"Hardik",
      email:"hardik@gmail.com",
      role:"ADMIN",
      status:"Active",
    },

    {
      id:2,
      name:"Kuldeep",
      email:"kuldeep@gmail.com",
      role:"MANAGER",
      status:"Active",
    },

    {
      id:3,
      name:"Rohan",
      email:"rohan@gmail.com",
      role:"USER",
      status:"Active",
    },
  ];

  return (

    <div
      style={{
        display:"flex",
        minHeight:"100vh",
        background:"#f8fafc",
      }}
    >

      <Sidebar role="ADMIN" productRoute="/admin-products" />

      <div
        style={{
          flex:1,
          padding:"40px",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"40px",
          }}
        >

          <div>

            <h1
              style={{
                fontSize:"58px",
                fontWeight:"900",
                color:"#0f172a",
              }}
            >

              Users Management 👥

            </h1>

            <p
              style={{
                marginTop:"10px",
                color:"#64748b",
                fontSize:"20px",
              }}
            >

              Manage platform users,
              roles and permissions.

            </p>

          </div>

          <button style={{ padding:"16px 24px", background:"#2563eb", color:"white", borderRadius:"16px", fontWeight:"700", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
            <Plus /> Add Admin
          </button>

        </div>

        {/* STATS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap:"24px",
            marginBottom:"40px",
          }}
        >

          <div style={cardStyle}>

            <Users
              size={34}
              color="#2563eb"
            />

            <h2 style={numberStyle}>
              1,250
            </h2>

            <p>Total Users</p>

          </div>

          <div style={cardStyle}>

            <Shield
              size={34}
              color="#7c3aed"
            />

            <h2 style={numberStyle}>
              12
            </h2>

            <p>Admins</p>

          </div>

          <div style={cardStyle}>

            <UserCheck
              size={34}
              color="#16a34a"
            />

            <h2 style={numberStyle}>
              98%
            </h2>

            <p>Active Users</p>

          </div>

        </div>

        {/* TABLE */}

        <div style={tableContainer}>

          <table
            style={{
              width:"100%",
              borderCollapse:"collapse",
            }}
          >

            <thead>

              <tr>

                <th style={thStyle}>
                  ID
                </th>

                <th style={thStyle}>
                  Name
                </th>

                <th style={thStyle}>
                  Email
                </th>

                <th style={thStyle}>
                  Role
                </th>

                <th style={thStyle}>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user)=>(

                <tr key={user.id}>

                  <td style={tdStyle}>
                    {user.id}
                  </td>

                  <td style={tdStyle}>
                    {user.name}
                  </td>

                  <td style={tdStyle}>
                    {user.email}
                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        padding:
                          "8px 16px",
                        borderRadius:
                          "30px",
                        background:
                          user.role ===
                          "ADMIN"

                          ? "#dbeafe"

                          : "#ede9fe",

                        color:
                          user.role ===
                          "ADMIN"

                          ? "#2563eb"

                          : "#7c3aed",

                        fontWeight:"700",
                      }}
                    >

                      {user.role}

                    </span>

                  </td>

                  <td style={tdStyle}>

                    <span
                      style={{
                        color:"#16a34a",
                        fontWeight:"700",
                      }}
                    >

                      ● Active

                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

const cardStyle = {

  background:"white",

  padding:"30px",

  borderRadius:"24px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.05)",
};

const numberStyle = {

  fontSize:"42px",

  marginTop:"20px",

  marginBottom:"8px",

  color:"#0f172a",

  fontWeight:"900",
};

const tableContainer = {

  background:"white",

  padding:"30px",

  borderRadius:"28px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.05)",
};

const thStyle = {

  textAlign:"left",

  padding:"18px",

  borderBottom:
    "1px solid #e2e8f0",

  color:"#64748b",

  fontSize:"15px",
};

const tdStyle = {

  padding:"22px 18px",

  borderBottom:
    "1px solid #f1f5f9",

  fontWeight:"600",
};

export default UsersPage;