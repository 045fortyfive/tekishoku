import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiagnosisPage from "./pages/DiagnosisPage";
import CareerPage from "./pages/CareerPage";
import MyPage from "./pages/MyPage"; // MyPage is not in NAV_ITEMS but route can exist
import ConsultationPage from "./pages/ConsultationPage";
import BottomNavigationBar from "./components/layout/BottomNavigationBar";
import { ErrorBoundary } from "./components/common";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDiagnosisPage =
    location.pathname === "/diagnosis" ||
    location.pathname.startsWith("/diagnosis");

  return (
    <div
      className="flex flex-col min-h-screen bg-slate-100 mobile-scroll"
      data-oid="md2odu_"
    >
      <main
        className={`flex-grow ${isDiagnosisPage ? "" : "pb-16 sm:pb-18"} safe-area-top`}
        data-oid="lujk5r_"
      >
        <Routes data-oid="dhhz2l3">
          <Route
            path="/"
            element={<HomePage data-oid="q__pfnb" />}
            data-oid="v_el9od"
          />

          <Route
            path="/diagnosis"
            element={<DiagnosisPage data-oid="v2g1w0c" />}
            data-oid="p:q5eig"
          />

          <Route
            path="/career"
            element={<CareerPage data-oid=":58:82:" />}
            data-oid="uc:v95g"
          />

          <Route
            path="/mypage"
            element={<MyPage data-oid="rukew6." />}
            data-oid="b_gmd-h"
          />

          <Route
            path="/consultation"
            element={<ConsultationPage data-oid="osk-zh9" />}
            data-oid="8obgrkv"
          />
        </Routes>
      </main>
      {!isDiagnosisPage && <BottomNavigationBar data-oid="0gi_iym" />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary data-oid="4-u9lvk">
      <HashRouter data-oid="b6-uy:m">
        <AppContent data-oid="wgimo-e" />
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
