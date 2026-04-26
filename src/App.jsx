import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import { AdminProvider, useAdmin } from './context/AdminContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import DigitalLearning from './pages/DigitalLearning'
import TeacherSupport from './pages/TeacherSupport'
import Scholarships from './pages/Scholarships'
import CollegeReadiness from './pages/CollegeReadiness'
import Wellness from './pages/Wellness'
import Team from './pages/Team'
import Donate from './pages/Donate'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminOverview from './admin/pages/AdminOverview'
import AdminBlog from './admin/pages/AdminBlog'
import AdminGallery from './admin/pages/AdminGallery'
import AdminDonations from './admin/pages/AdminDonations'
import AdminTeam from './admin/pages/AdminTeam'
import AdminUsers from './admin/pages/AdminUsers'
import AdminPrograms from './admin/pages/AdminPrograms'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin()
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/digital-learning" element={<PublicLayout><DigitalLearning /></PublicLayout>} />
            <Route path="/teacher-support" element={<PublicLayout><TeacherSupport /></PublicLayout>} />
            <Route path="/scholarships" element={<PublicLayout><Scholarships /></PublicLayout>} />
            <Route path="/college-readiness" element={<PublicLayout><CollegeReadiness /></PublicLayout>} />
            <Route path="/wellness" element={<PublicLayout><Wellness /></PublicLayout>} />
            <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
            <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="donations" element={<AdminDonations />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="programs" element={<AdminPrograms />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </SiteProvider>
  )
}
