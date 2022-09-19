import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/Orders";
import MorePage from "./pages/More";
import DiscountPage from "./pages/Discount";
import SearchPage from "./pages/Search";
import FilterPage from "./pages/Filter";
import ResetFormPage from "./pages/ResetForm";
import DscntshopContext from "./store/dscntshop-context";

function App() {
  const ctx = useContext(DscntshopContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/:email" element={<HomePage />} />

      {ctx.isLoggedIn && ctx.isAdmin && (
        <Route path="/admin/:page" element={<AdminPage />} />
      )}
      {ctx.isLoggedIn && (
        <Route path="/profile/:page" element={<ProfilePage />} />
      )}

      <Route path="/orders" element={<OrdersPage />} />

      {/* :category is used to hold parameters */}
      <Route path="/more/:category" element={<MorePage />} />

      {/* :search is used to hold parameters */}
      <Route path="/search/:search" element={<SearchPage />} />

      {/* (/:lower_band) represents optional parameter */}
      <Route
        path="/discountgroup/:upper_bound/:lower_bound"
        element={<DiscountPage />}
      />

      {/* (/:lower_band) represents optional parameter */}
      <Route path="/filter" element={<FilterPage />} />

      <Route
        path="/reset_password/:email/:cipher_text/:expiry_date"
        element={<ResetFormPage />}
      />
      {/* TODO: Load pageNotFound when a route that is not specified is entered by user. For now just redirect to index page */}
      <Route path="*" element={<HomePage />} />
      {/* Clear cart */}
      <Route
        path="/checkout_completed"
        element={<HomePage clearCart={true} />}
      />
    </Routes>
  );
}

export default App;
