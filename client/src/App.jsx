import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import LearnHome from './pages/learn/LearnHome';
import QaidaPage from './pages/learn/QaidaPage';
import TajweedPage from './pages/learn/TajweedPage';
import DuasPage from './pages/learn/DuasPage';
import NamazPage from './pages/learn/NamazPage';
import JanazaPage from './pages/learn/JanazaPage';

import QuranHome from './pages/quran/QuranHome';
import SurahPage from './pages/quran/SurahPage';

import HifzHome from './pages/hifz/HifzHome';
import NewLog from './pages/hifz/NewLog';
import MistakesPage from './pages/hifz/MistakesPage';

import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';

function PrivateRoute({ role }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/qaida" element={<QaidaPage />} />
          <Route path="/learn/tajweed" element={<TajweedPage />} />
          <Route path="/learn/duas" element={<DuasPage />} />
          <Route path="/learn/namaz" element={<NamazPage />} />
          <Route path="/learn/janaza" element={<JanazaPage />} />

          <Route path="/quran" element={<QuranHome />} />
          <Route path="/quran/:surahNum" element={<SurahPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/hifz" element={<HifzHome />} />
            <Route path="/hifz/new-log" element={<NewLog />} />
            <Route path="/hifz/mistakes" element={<MistakesPage />} />
          </Route>

          <Route element={<PrivateRoute role="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
          </Route>
          <Route element={<PrivateRoute role="teacher" />}>
            <Route path="/teacher" element={<TeacherDashboard />} />
          </Route>
          <Route element={<PrivateRoute role="parent" />}>
            <Route path="/parent" element={<ParentDashboard />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
