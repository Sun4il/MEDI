import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminAnalytics from "../pages/admin/Analytics";
import AdminDashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import VerifyShops from "../pages/admin/VerifyShops";
import ShopAddMedicine from "../pages/shop/AddMedicine";
import ShopDashboard from "../pages/shop/Dashboard";
import ShopInventory from "../pages/shop/Inventory";
import ShopProfile from "../pages/shop/ShopProfile";
import UserDashboard from "../pages/user/Dashboard";
import Results from "../pages/user/Results";
import SearchMedicine from "../pages/user/SearchMedicine";
import UploadPrescription from "../pages/user/UploadPrescription";
import ProtectedRoute from "./ProtectedRoute";

const AppLayout = () => {
  const location = useLocation();
  const isMarketing = location.pathname === "/" || location.pathname === "/about";

  return (
    <div className={isMarketing ? "app-shell app-shell--home" : "app-shell"}>
      <Navbar />
      <main className={isMarketing ? "app-main app-main--home" : "app-main"}>
        {isMarketing ? <Outlet /> : <div className="container"><Outlet /></div>}
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/search" element={<SearchMedicine />} />
        <Route path="/user/upload" element={<UploadPrescription />} />
        <Route path="/user/results" element={<Results />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["shop", "admin"]} />}>
        <Route path="/shop/dashboard" element={<ShopDashboard />} />
        <Route path="/shop/add-medicine" element={<ShopAddMedicine />} />
        <Route path="/shop/inventory" element={<ShopInventory />} />
        <Route path="/shop/profile" element={<ShopProfile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/verify-shops" element={<VerifyShops />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;