
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants';

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 shadow-lg z-50 safe-area-bottom" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
      <div className="max-w-screen-sm mx-auto flex justify-around items-stretch h-16 sm:h-18">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/diagnosis' && location.pathname.startsWith('/diagnosis'));
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 text-center transition-colors duration-200 touch-target mobile-transition
                ${isActive ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400 active:text-orange-600'}`}
              aria-current={isActive ? 'page' : undefined}
              role="tab"
              aria-selected={isActive}
            >
              <div className={`p-2 rounded-full transition-colors duration-200 ${isActive ? 'bg-lime-400' : 'bg-transparent'}`}>
                <item.Icon className={`w-6 h-6 transition-colors duration-200 ${isActive ? 'stroke-orange-500' : 'stroke-gray-500'}`} />
              </div>
              <span className={`text-xs leading-tight transition-all duration-200 ${isActive ? 'font-bold text-orange-500' : 'font-medium text-gray-600'}`}>
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