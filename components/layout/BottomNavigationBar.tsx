import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../constants";

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 safe-area-bottom"
      data-oid="12koztt"
    >
      <div
        className="max-w-screen-sm mx-auto flex justify-around items-stretch h-16 sm:h-18"
        data-oid="x:n7gzs"
      >
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/diagnosis" &&
              location.pathname.startsWith("/diagnosis"));
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 text-center transition-colors duration-200 touch-target mobile-transition
                ${isActive ? "text-blue-600" : "text-slate-500 hover:text-blue-500 active:text-blue-400"}`}
              aria-current={isActive ? "page" : undefined}
              role="tab"
              aria-selected={isActive}
              data-oid="f4iw8k-"
            >
              <item.Icon
                className={`w-6 h-6 mb-0.5 transition-colors duration-200 ${isActive ? "stroke-blue-600" : "stroke-slate-500"}`}
                data-oid="dqan78g"
              />

              <span
                className={`text-xs leading-tight transition-all duration-200 ${isActive ? "font-semibold text-blue-600" : "font-normal"}`}
                data-oid="hy3_ujb"
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;
