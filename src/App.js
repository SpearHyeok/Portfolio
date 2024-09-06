import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MarkdownPage from './components/MarkdownPage';

function App() {
  return (
    <Router basename="/Portfolio"> 
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/:folder/:markdownFile" element={<MarkdownPage />} />
            <Route path="/" element={<div>Select a markdown file from the sidebar</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;