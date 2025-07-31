import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import UsersManagement from '@/components/admin/UsersManagement';
import MembershipsManagement from '@/components/admin/MembershipsManagement';
import StoreManagement from '@/components/admin/StoreManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import PostsManagement from '@/components/admin/PostsManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import CMSManagement from '@/components/admin/CMSManagement';
import MembershipTiersManagement from '@/components/admin/MembershipTiersManagement';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'جاري التحميل...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="memberships" element={<MembershipsManagement />} />
        <Route path="store" element={<StoreManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="posts" element={<PostsManagement />} />
        <Route path="gallery" element={<GalleryManagement />} />
        <Route path="cms" element={<CMSManagement />} />
        <Route path="membership-tiers" element={<MembershipTiersManagement />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;