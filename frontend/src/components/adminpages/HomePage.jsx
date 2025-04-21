import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiImage,
  FiFileText,
  FiBell,
  FiSettings,
  FiUsers,
  FiCalendar,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiMessageSquare,
  FiUser,
  FiMoon,
  FiSun
} from "react-icons/fi";
import { gettAllMedia } from "../../api/fetchData";
import UploadResult from "./UploadResult";
import UploadNews from "./AnnoucementForm.jsx";
import Notifications from './Notifications.jsx';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  // Apply dark mode class to document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("principalAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else {
      const fetchMedia = async () => {
        const media = await gettAllMedia();
        setMedia(media.media);
      };
      fetchMedia();
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sample data
  const stats = [
    {
      title: "Total Media",
      value: media.length,
      icon: <FiImage />,
      color: "text-blue-500 dark:text-blue-400",
      path: "/admin/media",
    },
    {
      title: "Announcements",
      value: 5,
      icon: <FiMessageSquare />,
      color: "text-purple-500 dark:text-purple-400",
      path: "/admin/annoucement",
    },
    {
      title: "Upcoming Events",
      value: 3,
      icon: <FiCalendar />,
      color: "text-green-500 dark:text-green-400",
      path: "",
    },
  ];

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Zarif Ahmed</h1>
          ) : (
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">ZA</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="flex-1 p-4">
          <NavItem
            icon={<FiHome />}
            title="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
          />
          <NavItem
            icon={<FiImage />}
            title="Media Gallery"
            active={activeTab === "media"}
            onClick={() => setActiveTab("media")}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
          />
          <NavItem
            icon={<FiFileText />}
            title="Results"
            active={activeTab === "results"}
            onClick={() => setActiveTab("results")}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
          />
          <NavItem
            icon={<FiMessageSquare />}
            title="Announcements"
            active={activeTab === "news"}
            onClick={() => setActiveTab("news")}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
          />
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
              darkMode ? "bg-gray-700 text-yellow-300" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">
              {darkMode ? <FiSun /> : <FiMoon />}
            </span>
            {sidebarOpen && (
              <span className="ml-3">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
          <NavItem
            icon={<FiSettings />}
            title="Settings"
            active={false}
            onClick={() => {}}
            sidebarOpen={sidebarOpen}
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
            {activeTab.replace("-", " ")}
          </h2>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab("notification")} 
              className="p-2 relative text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <FiBell className="text-xl" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                <FiUser className="text-blue-600 dark:text-blue-300" />
              </div>
              {sidebarOpen && <span className="font-medium dark:text-white">Principal</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 bg-blue-200 dark:bg-gray-700">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Link to={stat.path} key={index}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div
                          className={`text-2xl p-3 rounded-full ${stat.color} ${
                            darkMode ? "bg-opacity-20" : "bg-opacity-10"
                          }`}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold dark:text-white">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <ActionCard
                    icon={<FiImage className="text-blue-500 dark:text-blue-400" />}
                    title="Add Media"
                    onClick={() => setActiveTab("media")}
                    darkMode={darkMode}
                  />
                  <ActionCard
                    icon={<FiFileText className="text-green-500 dark:text-green-400" />}
                    title="Upload Results"
                    onClick={() => setActiveTab("results")}
                    darkMode={darkMode}
                  />
                  <ActionCard
                    icon={<FiMessageSquare className="text-purple-500 dark:text-purple-400" />}
                    title="Post Announcement"
                    onClick={() => setActiveTab("news")}
                    darkMode={darkMode}
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold dark:text-white">Recent Activity</h3>
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  <ActivityItem
                    icon={<FiImage className="text-blue-500" />}
                    title="New gallery added"
                    description="Annual Day 2023 photos"
                    time="2 hours ago"
                    darkMode={darkMode}
                  />
                  <ActivityItem
                    icon={<FiFileText className="text-green-500" />}
                    title="Results published"
                    description="Class 12 Final Exams"
                    time="1 day ago"
                    darkMode={darkMode}
                  />
                  <ActivityItem
                    icon={<FiMessageSquare className="text-purple-500" />}
                    title="New announcement"
                    description="School reopening notice"
                    time="3 days ago"
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would go here... */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold dark:text-white">Media Gallery</h3>
                  <Link
                    to={"/admin/media"}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit Media
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {media.map((item, index) => (
                    <MediaCard
                      key={index}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      date={item.uploadedAt}
                      darkMode={darkMode}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "results" && <UploadResult darkMode={darkMode} />}
          {activeTab === "news" && <UploadNews darkMode={darkMode} />}
          {activeTab === "notification" && <Notifications darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
};

// Updated reusable components with dark mode support
const NavItem = ({ icon, title, active, onClick, sidebarOpen, darkMode }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
      active 
        ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400" 
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
    }`}
  >
    <span className="text-xl">{icon}</span>
    {sidebarOpen && <span className="ml-3">{title}</span>}
  </button>
);

const ActionCard = ({ icon, title, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-xs transition-all ${
      darkMode 
        ? "bg-gray-700 border-gray-600 hover:border-blue-400" 
        : "bg-white border-gray-300 hover:border-blue-300"
    }`}
  >
    <span className="text-2xl mb-2">{icon}</span>
    <span className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
      {title}
    </span>
  </button>
);

const ActivityItem = ({ icon, title, description, time, darkMode }) => (
  <div className="flex items-start">
    <div className={`p-2 rounded-full mr-4 ${
      darkMode ? "bg-gray-700 text-blue-400" : "bg-blue-50 text-blue-500"
    }`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{title}</p>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{description}</p>
    </div>
    <div className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{time}</div>
  </div>
);

const MediaCard = ({ imageUrl, title, date, darkMode }) => (
  <div className={`border rounded-xl overflow-hidden hover:shadow-md transition-shadow ${
    darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
  }`}>
    <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h4 className={`font-medium truncate ${darkMode ? "text-white" : "text-gray-800"}`}>
        {title}
      </h4>
      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mb-3`}>
        {date}
      </p>
    </div>
  </div>
);

export default HomePage;