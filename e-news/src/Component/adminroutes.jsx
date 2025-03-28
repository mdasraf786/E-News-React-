import { Routes, Route } from "react-router-dom";
import AdminLayout from "./adminlayout"; 
import AdminDashboard from "./admindashboard";
import AddedNews from "./AddedNews";
import AvailableReviews from "./AvailableReviews";
import AvailableUsers from "./AvailableUsers";
import AddNews from "./AddNews";
import AvailableNews from "./AvailableNews";
import AddUsers from "./AddUsers";
import AdminSettings from "./adminsettings";
import AdminProfile from "./adminprofile";
import TotalUsers from "./totalusers";
 
import ManageAds from "./manageads";   
import Drafts from "./drafts"; 

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="added-news" element={<AddedNews />} />
        <Route path="reviews" element={<AvailableReviews />} />
        <Route path="available-users" element={<AvailableUsers />} />
        <Route path="add-news" element={<AddNews />} />
        <Route path="available-news" element={<AvailableNews />} />
        <Route path="add-user" element={<AddUsers />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="users" element={<TotalUsers />} />
        

        <Route path="manage-ads" element={<ManageAds />} />
        <Route path="drafts" element={<Drafts />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
