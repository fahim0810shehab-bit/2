import React, { useState, useEffect, useCallback } from 'react';
import { contentService } from './services/contentService';
import { authService } from './services/authService';
import { VibeNode, SiteData, VibePage } from './types/vibe';
import LeftSidebar from './components/vibe/LeftSidebar';
import Inspector from './components/vibe/Inspector';
import TopBar from './components/vibe/TopBar';
import VibeCanvas from './components/vibe/VibeCanvas';
import { updateNode, addNode, removeNode, duplicateNode, moveNode } from './components/vibe/vibeUtils';
import { defaultRootNode } from './utils/vibeDefaults';

export default function Editor() {
  const user = authService.getCurrentUser()!;
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [historyState, setHistoryState] = useState<{ history: VibeNode[], currentIndex: number }>({ history: [], currentIndex: -1 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [viewport, setViewport] = useState<'desktop'|'tablet'|'mobile'>('desktop');
  const [scale, setScale] = useState(100);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    contentService.getSiteData(user.id).then(data => {
      let activeData = data;
      if (!activeData) activeData = contentService.createDefaultSiteData(user.id, user.name || user.email.split('@')[0]);
          if (!activeData.pages) {
            activeData.pages = [
              {
                id: 'page_home',
                name: 'Home',
                path: '/',
                rootNode: (activeData as any).rootNode || JSON.parse(JSON.stringify(defaultRootNode))
              }
            ];
          }
          setSiteData(activeData);
          setActivePageId(activeData.pages[0].id);
          setHistoryState({ history: [activeData.pages[0].rootNode], currentIndex: 0 });
      setLoading(false);
    });
  }, [user.id, user.name, user.email]);

  const commitRoot = useCallback((newRoot: VibeNode) => {
    setHistoryState(prev => {
      const newHistory = prev.history.slice(0, prev.currentIndex + 1);
      newHistory.push(newRoot);
      if (newHistory.length > 50) {
        newHistory.shift();
        return { history: newHistory, currentIndex: newHistory.length - 1 };
      }
      return { history: newHistory, currentIndex: newHistory.length - 1 };
    });
  }, []);

  const buildCurrentRoot = useCallback(() => historyState.history[historyState.currentIndex], [historyState]);

  const handleUpdateNode = useCallback((updatedNode: Partial<VibeNode> & { id: string }) => {
    const newRoot = updateNode(buildCurrentRoot(), updatedNode.id, updatedNode);
    commitRoot(newRoot);
  }, [buildCurrentRoot, commitRoot]);

  const handleAddElement = useCallback((parentId: string, newNode: VibeNode) => {
    const newRoot = addNode(buildCurrentRoot(), parentId, newNode);
    commitRoot(newRoot);
    setSelectedId(newNode.id);
  }, [buildCurrentRoot, commitRoot]);

  const handleDelete = useCallback((id: string) => {
    const newRoot = removeNode(buildCurrentRoot(), id);
    if (newRoot) commitRoot(newRoot);
    setSelectedId(null);
  }, [buildCurrentRoot, commitRoot]);

  const handleDuplicate = useCallback((id: string) => {
    const newRoot = duplicateNode(buildCurrentRoot(), id);
    commitRoot(newRoot);
  }, [buildCurrentRoot, commitRoot]);

  const handleMove = useCallback((id: string, direction: 'up' | 'down') => {
    const newRoot = moveNode(buildCurrentRoot(), id, direction);
    commitRoot(newRoot);
  }, [buildCurrentRoot, commitRoot]);

  const handleApplyTemplate = useCallback((templateRoot: VibeNode) => {
    commitRoot(templateRoot);
    setSelectedId(null);
  }, [commitRoot]);

  const handleContentChange = useCallback((id: string, content: string) => {
    handleUpdateNode({ id, content });
  }, [handleUpdateNode]);

  const handleSave = async () => {
    if (!siteData || !activePageId) return;
    setSaving(true);
    const updatedPages = siteData.pages.map(p => 
      p.id === activePageId ? { ...p, rootNode: buildCurrentRoot() } : p
    );
    const newSiteData = { ...siteData, pages: updatedPages, is_published: true };
    setSiteData(newSiteData);
    await contentService.saveSiteData(newSiteData);
    setSaving(false);
  };

  const handlePageSwitch = (pageId: string) => {
    if (!siteData) return;
    // Auto-save current page
    const updatedPages = siteData.pages.map(p => 
      p.id === activePageId ? { ...p, rootNode: buildCurrentRoot() } : p
    );
    setSiteData({ ...siteData, pages: updatedPages });
    
    // Switch to new page
    const newPage = updatedPages.find(p => p.id === pageId);
    if (newPage) {
      setActivePageId(newPage.id);
      setHistoryState({ history: [newPage.rootNode], currentIndex: 0 });
      setSelectedId(null);
    }
  };

  const handleAddPage = () => {
    if (!siteData) return;
    const newPageId = `page_${Date.now()}`;
    const newPage: VibePage = {
      id: newPageId,
      name: `Page ${siteData.pages.length + 1}`,
      path: `/page-${siteData.pages.length + 1}`,
      rootNode: JSON.parse(JSON.stringify(defaultRootNode))
    };
    const updatedPages = siteData.pages.map(p => 
      p.id === activePageId ? { ...p, rootNode: buildCurrentRoot() } : p
    );
    updatedPages.push(newPage);
    setSiteData({ ...siteData, pages: updatedPages });
    setActivePageId(newPage.id);
    setHistoryState({ history: [newPage.rootNode], currentIndex: 0 });
    setSelectedId(null);
  };

  const handleRenamePage = (id: string, newName: string) => {
    if (!siteData) return;
    const updatedPages = siteData.pages.map(p => 
      p.id === id ? { ...p, name: newName, path: `/${newName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` } : p
    );
    setSiteData({ ...siteData, pages: updatedPages });
  };

  const handleDeletePage = (id: string) => {
    if (!siteData || siteData.pages.length <= 1) return;
    
    const updatedPages = siteData.pages.filter(p => p.id !== id);
    
    // Auto-save current if it's not the one being deleted
    if (activePageId !== id) {
      const activeIdx = updatedPages.findIndex(p => p.id === activePageId);
      if (activeIdx !== -1) {
        updatedPages[activeIdx].rootNode = buildCurrentRoot();
      }
    }
    
    setSiteData({ ...siteData, pages: updatedPages });
    
    if (activePageId === id) {
      setActivePageId(updatedPages[0].id);
      setHistoryState({ history: [updatedPages[0].rootNode], currentIndex: 0 });
      setSelectedId(null);
    }
  };

  const undo = () => setHistoryState(prev => ({ ...prev, currentIndex: Math.max(0, prev.currentIndex - 1) }));
  const redo = () => setHistoryState(prev => ({ ...prev, currentIndex: Math.min(prev.history.length - 1, prev.currentIndex + 1) }));

  if (loading || !historyState.history.length) return <div className="h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 gap-4"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div><p>Loading VibeBuilder Pro...</p></div>;

  const currentRoot = buildCurrentRoot();
  
  const findNode = (root: VibeNode, id: string): VibeNode | null => {
    if (root.id === id) return root;
    if (!root.children) return null;
    for (const child of root.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  };

  const selectedNode = selectedId ? findNode(currentRoot, selectedId) : null;

  return (
    <div className="flex flex-col h-screen bg-zinc-950 font-sans overflow-hidden">
      <TopBar 
        viewport={viewport} setViewport={setViewport}
        onUndo={undo} onRedo={redo}
        canUndo={historyState.currentIndex > 0} canRedo={historyState.currentIndex < historyState.history.length - 1}
        onSave={handleSave} isSaving={saving} username={siteData?.username || "Demo User"}
        pages={siteData?.pages || []}
        activePageId={activePageId}
        onSwitchPage={handlePageSwitch}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onRenamePage={handleRenamePage}
      />

      
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar 
          rootNode={currentRoot}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAddElement={handleAddElement}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onMove={handleMove}
          onApplyTemplate={handleApplyTemplate}
        />
        
        <div className="flex-1 flex flex-col relative w-full overflow-hidden">
           <VibeCanvas 
              rootNode={currentRoot}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
              onContentChange={handleContentChange}
              onUpdateNode={handleUpdateNode}
              viewport={viewport}
              scale={scale}
           />
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl z-20 text-zinc-300">
             <button onClick={() => setScale(s => Math.max(25, s - 10))} className="hover:text-white font-bold p-1">-</button>
             <span className="text-xs font-mono font-bold w-12 text-center">{scale}%</span>
             <button onClick={() => setScale(s => Math.min(200, s + 10))} className="hover:text-white font-bold p-1">+</button>
           </div>
        </div>

        <Inspector 
          node={selectedNode}
          onChange={n => handleUpdateNode(n)}
        />
      </div>
    </div>
  );
}
