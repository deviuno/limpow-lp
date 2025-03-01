import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Institutional from './pages/Institutional';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Categories from './pages/Categories';
import AppPage from './pages/App';
import Club from './pages/Club';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminNewPost from './pages/admin/NewPost';
import AdminWriterVirtual from './pages/admin/WriterVirtual';
import AdminAIGenerator from './pages/admin/AIGenerator';
import AdminCategories from './pages/admin/Categories';
import AdminLanding from './pages/admin/Landing';
import AdminPages from './pages/admin/Pages';
import AdminPlans from './pages/admin/Plans';
import AdminSettings from './pages/admin/Settings';
import Cursos from './pages/Cursos';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Telemedicine from './pages/Telemedicine';
import Login from './pages/admin/Login';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

function AppRoot() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {!isAdminPage && <Header />}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Institutional />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/club" element={<Club />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/telemedicina" element={<Telemedicine />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/lp" element={<LandingPage />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/*" element={
            <PrivateRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="landing" element={<AdminLanding />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="posts/new" element={<AdminNewPost />} />
                  <Route path="writer-virtual" element={<AdminWriterVirtual />} />
                  <Route path="ai-generator" element={<AdminAIGenerator />} />
                  <Route path="posts/edit/:id" element={<AdminNewPost />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="plans" element={<AdminPlans />} />
                  <Route path="pages" element={<AdminPages />} />
                  <Route path="pages/edit/:id" element={<AdminPages />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default AppRoot