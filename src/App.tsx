import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom';
import Editor from './Editor';
import Dashboard from './Dashboard';
import VibeRenderer from './components/vibe/VibeRenderer';
import { contentService } from './services/contentService';
import { SiteData, VibeNode } from './types/vibe';

const LiveSite = () => {
  const { username, '*': path } = useParams();
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      contentService.getSiteDataByUsername(username).then(data => {
        setSiteData(data);
        setLoading(false);
      });
    }
  }, [username]);

  if (loading) return <div className="h-screen flex items-center justify-center p-4">Loading Live Site...</div>;
  if (!siteData) return <div className="h-screen flex items-center justify-center p-4">Site not found.</div>;

  const currentPath = `/${path || ''}`.replace(/\/$/, '') || '/';
  
  let pageToRender = siteData.pages?.find(p => p.path === currentPath || p.path === currentPath + '/');
  
  if (!pageToRender) {
    if (currentPath === '/' && siteData.pages && siteData.pages.length > 0) {
      pageToRender = siteData.pages.find(p => p.name.toLowerCase() === 'home' || p.path === '/') || siteData.pages[0]; // fallback to first page if root is requested
    } else if (siteData.rootNode && (currentPath === '/' || currentPath === '')) {
      pageToRender = { id: 'legacy', name: 'Home', path: '/', rootNode: siteData.rootNode };
    }
  }

  if (!pageToRender) return <div className="h-screen flex items-center justify-center p-4">404 - Page not found.</div>;

  return (
    <div className="min-h-screen bg-white">
       <VibeRenderer 
          node={pageToRender.rootNode} 
          mode="preview" 
          selectedId={null} 
          hoveredId={null} 
       />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vibebuilder" replace />} />
        <Route path="/vibebuilder" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/site/:username/*" element={<LiveSite />} />
      </Routes>
    </Router>
  );
}
