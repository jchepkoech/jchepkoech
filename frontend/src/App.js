import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Sidebar, VideoGrid, VideoPlayer } from "./components";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <BrowserRouter>
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
          <Header 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              sidebarOpen={sidebarOpen}
              darkMode={darkMode}
            />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<VideoGrid searchTerm={searchTerm} darkMode={darkMode} />} />
                <Route path="/watch/:videoId" element={<VideoPlayer darkMode={darkMode} />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;