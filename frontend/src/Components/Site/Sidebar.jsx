import { Home, Wallet, Briefcase, User, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from "../../api/axios";
import { MdCategory } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await API.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error', err);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <aside className="w-16 md:w-64 h-[90vh] fixed top-[10vh] left-0 bg-white dark:bg-gray-900 shadow-xl flex flex-col justify-between z-40 transition-all duration-300">
      {/* Profil */}
      <div>
        <div className="flex items-center gap-3 p-3 md:p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold ring-2 ring-cyan-300/30 overflow-hidden shadow-md flex-shrink-0">
            {profile?.profileUrl ? (
              <img 
                src={profile.profileUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span className="text-sm md:text-base">{getInitials(profile?.username)}</span>
            )}
          </div>
          <div className="hidden md:block min-w-0">
            <h2 className="font-semibold text-gray-800 dark:text-white text-sm truncate">
              {profile?.username || 'User'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {profile?.email || ''}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 md:mt-6 px-2 md:px-3">
          <ul className="space-y-1 md:space-y-2">
            <li>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 p-2 md:p-3 text-gray-800 dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Home className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/expense')}
                className="flex items-center gap-3 p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Wallet className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="hidden md:inline">Expenses</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/incomes')}
                className="flex items-center gap-3 p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <Briefcase className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="hidden md:inline">Incomes</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/category')}
                className="flex items-center gap-3 p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
              >
                <MdCategory className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="hidden md:inline">Category</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
        <ul className="space-y-1 md:space-y-2">
          <li>
            <button  
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
            >
              <User className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="hidden md:inline">Profile</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 p-2 md:p-3 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-700/30 rounded-xl transition-all duration-300 w-full text-left"
            >
              <Settings className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;