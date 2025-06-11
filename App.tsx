
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiagnosisPage from './pages/DiagnosisPage';
import CareerPage from './pages/CareerPage';
import MyPage from './pages/MyPage'; // MyPage is not in NAV_ITEMS but route can exist
import ConsultationPage from './pages/ConsultationPage';
import BottomNavigationBar from './components/layout/BottomNavigationBar';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-100 mobile-scroll">
        <main className="flex-grow pb-16 sm:pb-18 safe-area-top"> {/* pb-16 for bottom nav space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/career" element={<CareerPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
          </Routes>
        </main>
        <BottomNavigationBar />
      </div>
    </HashRouter>
  );
};

export default App;