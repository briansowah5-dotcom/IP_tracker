import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Authcontext';
import HomePage from './Home/page';
import LoginPage from './login/page';
import DashboardPage from './Dashboard/page';
import HistoryPage from './history/page';
import TrackerPage from './tracker.tsx/pages';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;