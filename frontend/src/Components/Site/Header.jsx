import { LogOut, Bell, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../api/axios';
import Logo from '../../assets/favicon.png'; 

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [balanceRemaining, setBalanceRemaining] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      localStorage.clear();
      navigate('/signin');
    }
  };

  const handleNotificationClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await API.get('/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalanceRemaining(Number(res.data.remainingBalance || 0));
      setShowNotification(!showNotification);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setBalanceRemaining(0);
      setShowNotification(!showNotification);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md h-[10vh] w-full flex items-center fixed top-0 left-0 z-50 px-3 sm:px-6">
      {/* Logo & Title */}
      <div className="flex items-center flex-1 min-w-0">
        <div className="w-8 h-8 sm:w-12 sm:h-12 relative mr-2 flex-shrink-0">
          <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-cyan-300 rounded-full top-1 left-1 animate-ping"></div>
          <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full bottom-1 right-1 animate-pulse"></div>
          <img src={Logo} alt="App Logo" className="w-full h-full object-contain relative z-10 rounded-full" />
        </div>
        <span className="text-sm sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
          Plan <span className="text-cyan-500">Tracker</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Notification */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
            <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {showNotification && (
            <div className="absolute top-full right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
              <h2 className="text-sm sm:text-md font-semibold text-gray-800 dark:text-white mb-2">
                Notifications
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                You have remaining:{" "}
                <span className={balanceRemaining >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                  {balanceRemaining.toFixed(2)} Ar
                </span>
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowNotification(false)}
                  className="px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="relative">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
          </button>
        </div>

        {/* Dark mode */}
        <div className="relative">
          <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-cyan-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
          </button>
        </div>
      </div>

      {/* Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 w-72 sm:w-80">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-sm"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;