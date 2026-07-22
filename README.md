# 🛒 VectorCart AI — Polyglot DBMS & Product Catalog Application

**VectorCart AI** is an enterprise-grade multi-tier DBMS application integrating **PostgreSQL** (relational data management) and **MongoDB Atlas** (document storage & vector/semantic search) powered by a microservice architecture with **Spring Boot**, **FastAPI**, **Node.js Express Gateway**, and a **React (Vite)** frontend.

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────┐
                                  │   React Frontend (Vite)   │
                                  │  (Port 5173 / Client UI)  │
                                  └─────────────┬─────────────┘
                                                │ REST API
                                                ▼
                                  ┌───────────────────────────┐
                                  │    Node.js Express Gateway│
                                  │        (Port 8000)        │
                                  └──────┬─────────────┬──────┘
                                         │             │
                    ┌────────────────────┘             └────────────────────┐
                    ▼                                                       ▼
  ┌───────────────────────────────────┐                   ┌───────────────────────────────────┐
  │      Spring Boot Microservice     │                   │        FastAPI Microservice       │
  │            (Port 8080)            │                   │            (Port 5000)            │
  ├───────────────────────────────────┤                   ├───────────────────────────────────┤
  │ • Relational Data Management      │                   │ • MongoDB Atlas Document Mirror   │
  │ • PostgreSQL JPA Persistence      │                   │ • Vector Embeddings & AI Search   │
  │ • Auth, Users, Products & Orders  │                   │ • Semantic Text Querying          │
  └───────────────────────────────────┘                   └───────────────────────────────────┘
```

---

## 🚀 Tech Stack

### **Frontend (`frontend-react/`)**
- **Framework**: React 18 + Vite
- **Styling**: Modern Vanilla CSS + Tailwind CSS
- **Features**: Product Catalog Grid, Product Detail Views, Admin Management Dashboard, Inventory Tracker, RBAC Guard Routes

### **API Gateway (`backend-node-gateway/`)**
- **Runtime**: Node.js & Express.js
- **Role**: Centralized API Gateway, Request Orchestration, Route Proxying, Auth Token Verification
- **Features**: JWT Middleware, Role-Based Access Control (`ADMIN`, `MANAGER`, `USER`), Mock Analytics & Inventory Endpoints, Automatic/Manual PostgreSQL → MongoDB Sync Proxying

### **Relational Microservice (`springboot-backend/`)**
- **Framework**: Java 17, Spring Boot 3.3.5, Spring Data JPA
- **Database**: PostgreSQL
- **Role**: Primary source of truth for transactional data (User Authentication, Roles, Products, Stock Levels)

### **Document & AI Search Microservice (`fastapi-backend/`)**
- **Framework**: Python 3.10+, FastAPI, Pydantic v2
- **Database**: MongoDB Atlas (PyMongo / Motor)
- **AI Engine**: Sentence Transformers / Vector Embeddings
- **Role**: Unstructured data storage, natural language descriptions, semantic product search, and instant document mirroring

---

## ✨ Features

- 🔐 **JWT Authentication & RBAC**: Granular permission model (`ADMIN`, `MANAGER`, `USER`).
- 🔄 **Real-Time Polyglot Sync**: Any product created, modified, or deleted in PostgreSQL is automatically mirrored to MongoDB Atlas alongside vector embeddings.
- ⚡ **Semantic & AI Search**: Natural language search powered by vector similarity across product descriptions.
- 📊 **Analytics & Inventory Management**: Dedicated management dashboards for tracking stock thresholds and category distributions.
- ⚙️ **One-Shot Bulk Sync**: Admin trigger endpoint to sync legacy PostgreSQL datasets into MongoDB.

---

## 🛠️ Project Structure

```directory
product-catalog-app/
├── frontend-react/           # React + Vite frontend application
│   └── frontend-react/       # Main source directory (App.jsx, pages, context, components)
├── backend-node-gateway/     # Express.js API gateway (routes, auth middleware, proxy services)
├── fastapi-backend/          # Python FastAPI service for MongoDB vector search & embeddings
│   ├── app/                  # FastAPI main application, routes, database connection
│   └── embed_server.py       # Embedding generation service
└── springboot-backend/       # Java Spring Boot service for PostgreSQL relational data
    └── backend/              # Maven project (pom.xml, src/)
```

---

## 🐳 One-Click Docker Deployment

You can launch all 5 containers (**PostgreSQL**, **Spring Boot**, **FastAPI**, **Node.js Gateway**, and **React Frontend**) with a single command:

```bash
docker compose up --build -d
```

### **Service Port Mapping**
- 🌐 **React Frontend**: `http://localhost:5173`
- 🚀 **Node.js Gateway**: `http://localhost:8000`
- 🍃 **FastAPI Backend**: `http://localhost:5000`
- ☕ **Spring Boot Backend**: `http://localhost:8080`
- 🐘 **PostgreSQL DB**: `localhost:5432`

To stop all running services:
```bash
docker compose down
```

---

## 🛠️ Local Development (Without Docker)

---

## 📡 Key API Endpoints

### **Authentication**
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | User authentication & JWT generation | ❌ |
| `POST` | `/api/auth/signup` | Register a new user | ❌ |

### **Products (PostgreSQL & MongoDB Mirror)**
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/products/all` | Fetch all products | ❌ |
| `GET` | `/api/products/:id` | Fetch product details | ❌ |
| `POST` | `/api/products/add` | Add product (syncs to Mongo) | `ADMIN` / `MANAGER` |
| `PUT` | `/api/products/update/:id` | Update product | `ADMIN` / `MANAGER` |
| `DELETE`| `/api/products/delete/:id` | Delete product | `ADMIN` |

### **Search & Sync**
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/search/semantic` | Vector search across product embeddings | ❌ |
| `POST` | `/api/admin/sync-products` | Bulk sync PostgreSQL → MongoDB | `ADMIN` |

---

## 📄 License
This project is released under the **MIT License**.
