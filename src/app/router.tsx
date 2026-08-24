import { Route, Routes } from 'react-router-dom';
import { ListingDetailsPage } from '../pages/ListingDetailsPage';
import { ListingsPage } from '../pages/ListingsPage';
import { LoginPage } from '../pages/LoginPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
