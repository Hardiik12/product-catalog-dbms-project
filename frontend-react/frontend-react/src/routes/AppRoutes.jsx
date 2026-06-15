import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import AiSearch from "../pages/AiSearch";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import SemanticSearch from "../pages/SemanticSearch";
import Checkout from "../pages/Checkout";
import Analytics from "../pages/Analytics";
import AdminProducts from "../pages/AdminProducts";
import AdminDashboard from "../pages/AdminDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import ManagerProducts from "../pages/ManagerProducts";
import UserDashboard from "../pages/UserDashboard";
import OrderSuccess from "../pages/OrderSuccess";
import Users from "../pages/Users";
import Inventory from "../pages/Inventory";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/search" element={<SemanticSearch />} />

      <Route path="/user-dashboard" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><UserDashboard /></ProtectedRoute>
      } />
      
      <Route path="/admin-dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>
      } />
      
      <Route path="/manager-dashboard" element={
          <ProtectedRoute allowedRoles={["MANAGER"]}><ManagerDashboard /></ProtectedRoute>
      } />

      <Route path="/manager-products" element={
          <ProtectedRoute allowedRoles={["MANAGER", "ADMIN"]}><ManagerProducts /></ProtectedRoute>
      } />

      <Route path="/cart" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><Cart /></ProtectedRoute>
      } />

      <Route path="/wishlist" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><Wishlist /></ProtectedRoute>
      } />

      <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><Profile /></ProtectedRoute>
      } />
      
      <Route path="/ai-search" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><AiSearch /></ProtectedRoute>
      } />

      <Route path="/checkout" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><Checkout /></ProtectedRoute>
      } />

      <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}><Analytics /></ProtectedRoute>
      } />

      <Route path="/admin-products" element={
          <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}><AdminProducts /></ProtectedRoute>
      } />

      <Route path="/users" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><Users /></ProtectedRoute>
      } />

      <Route path="/inventory" element={
          <ProtectedRoute allowedRoles={["ADMIN", "MANAGER"]}><Inventory /></ProtectedRoute>
      } />
      
      <Route path="/order-success" element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}><OrderSuccess /></ProtectedRoute>
      } />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
