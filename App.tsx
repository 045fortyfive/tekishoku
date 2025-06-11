
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiagnosisPage from './pages/DiagnosisPage';
import CareerPage from './pages/CareerPage';
import MyPage from './pages/MyPage'; // MyPage is not in NAV_ITEMS but route can exist
import ConsultationPage from './pages/ConsultationPage';
import BottomNavigationBar from './components/layout/BottomNavigationBar';
import { ErrorBoundary } from './components/common';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDiagnosisPage = location.pathname === '/diagnosis' || location.pathname.startsWith('/diagnosis');

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 mobile-scroll">
      <main className={`flex-grow ${isDiagnosisPage ? '' : 'pb-16 sm:pb-18'} safe-area-top`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnosis" element={<DiagnosisPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
        </Routes>
      </main>
      {!isDiagnosisPage && <BottomNavigationBar />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;